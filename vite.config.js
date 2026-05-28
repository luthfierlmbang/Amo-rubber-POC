import { sync } from "glob";
import { defineConfig } from "vite";
import path, { resolve } from "path";
import tailwindcss from '@tailwindcss/vite';
import handlebars from "vite-plugin-handlebars";
import fs from "fs";

export default defineConfig(({ mode }) => {
    const list = [];

    if (mode === "production") {
        sync("src/*.html").forEach((file) => { list.push(file); });
        sync("src/products/*.html").forEach((file) => { list.push(file); });
        sync("src/product/*.html").forEach((file) => { list.push(file); });
    }

    // Load data layer
    const company = JSON.parse(fs.readFileSync(resolve("./src/data/company.json"), "utf-8"));
    const categories = JSON.parse(fs.readFileSync(resolve("./src/data/categories.json"), "utf-8"));
    const products = JSON.parse(fs.readFileSync(resolve("./src/data/products.json"), "utf-8"));

    return {
        root: "src",
        base: "/",
        // publicDir: "../public",
        server: { open: true, },
        plugins: [
            tailwindcss(),
            handlebars({
                partialDirectory: resolve("./src/partials"),
                context: {
                    company,
                    categories,
                    products
                },
                helpers: {
                    eq: (a, b) => a === b,
                    limit: (arr, max) => {
                        if (!Array.isArray(arr)) return [];
                        return arr.slice(0, max);
                    },
                    related_products: (prods, category, currentSku) => {
                        if (!Array.isArray(prods)) return [];
                        return prods.filter(p => p.category === category && p.id !== currentSku).slice(0, 4);
                    },
                    contains: (arr, val) => {
                        return Array.isArray(arr) && arr.includes(val);
                    },
                    wa_link: (sku) => {
                        const text = encodeURIComponent(`Hi AMO Rubber, I would like to inquire about product SKU: ${sku}`);
                        return `https://wa.me/${company.phones.wa_raw}?text=${text}`;
                    },
                    slugify: (str) => {
                        if (typeof str !== "string") return "";
                        return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                    },
                    filter_by_category: (prods, categorySlug) => {
                        if (!Array.isArray(prods)) return [];
                        return prods.filter(p => p.category === categorySlug);
                    },
                    json: (context) => JSON.stringify(context)
                }
            }),
        ],
        resolve: {
            alias: {
                "@/*": path.resolve("./*"),
                "@css": path.resolve("./src/assets/css/"),
            },
        },
        build: {
            outDir: "../dist",
            emptyOutDir: true,
            rollupOptions: {
                input: [...list],
            }
        },
    };
});
