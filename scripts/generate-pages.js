import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const company = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/company.json'), 'utf-8'));
const categories = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/categories.json'), 'utf-8'));
const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/products.json'), 'utf-8'));

// Register Handlebars helpers
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('limit', (arr, max) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, max);
});
Handlebars.registerHelper('related_products', (prods, category, currentSku) => {
    if (!Array.isArray(prods)) return [];
    return prods.filter(p => p.category === category && p.id !== currentSku).slice(0, 4);
});
Handlebars.registerHelper('contains', (arr, val) => {
    return Array.isArray(arr) && arr.includes(val);
});
Handlebars.registerHelper('wa_link', (sku) => {
    const text = encodeURIComponent(`Hi AMO Rubber, I would like to inquire about product SKU: ${sku}`);
    return `https://wa.me/${company.phones.wa_raw}?text=${text}`;
});
Handlebars.registerHelper('slugify', (str) => {
    if (typeof str !== "string") return "";
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
});
Handlebars.registerHelper('filter_by_category', (prods, categorySlug) => {
    if (!Array.isArray(prods)) return [];
    return prods.filter(p => p.category === categorySlug);
});
Handlebars.registerHelper('json', (context) => JSON.stringify(context));

// Register Partials
const partialsDir = path.resolve(__dirname, '../src/partials');
fs.readdirSync(partialsDir).forEach(file => {
    if (file.endsWith('.html')) {
        const partialName = path.basename(file, '.html');
        const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
        Handlebars.registerPartial(partialName, partialContent);
    }
});

// Outputs setup
const productsOutDir = path.resolve(__dirname, '../src/products');
const productOutDir = path.resolve(__dirname, '../src/product');

fs.mkdirSync(productsOutDir, { recursive: true });
fs.mkdirSync(productOutDir, { recursive: true });

// Clean old compiled html files
fs.readdirSync(productsOutDir).forEach(file => {
    if (file.endsWith('.html')) {
        fs.unlinkSync(path.join(productsOutDir, file));
    }
});
fs.readdirSync(productOutDir).forEach(file => {
    if (file.endsWith('.html')) {
        fs.unlinkSync(path.join(productOutDir, file));
    }
});

// Load Templates
const categoryTemplateSource = fs.readFileSync(path.resolve(__dirname, '../src/templates/category-template.html'), 'utf-8');
const pdpTemplateSource = fs.readFileSync(path.resolve(__dirname, '../src/templates/pdp-template.html'), 'utf-8');

const categoryTemplate = Handlebars.compile(categoryTemplateSource);
const pdpTemplate = Handlebars.compile(pdpTemplateSource);

// Generate Category Pages
categories.forEach(category => {
    const matchingProducts = products.filter(p => p.category === category.slug);
    const relatedCategories = categories.filter(c => c.slug !== category.slug);

    const context = {
        company,
        categories,
        category,
        products: matchingProducts,
        relatedCategories
    };

    const html = categoryTemplate(context);
    const outFile = path.join(productsOutDir, `${category.slug}.html`);
    fs.writeFileSync(outFile, html, 'utf-8');
    console.log(`Generated category page: /products/${category.slug}.html`);
});

// Generate Product Detail Pages
products.forEach(product => {
    const category = categories.find(c => c.slug === product.category) || { name: 'Unknown', slug: 'unknown' };
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const context = {
        company,
        categories,
        product,
        category,
        relatedProducts
    };

    const html = pdpTemplate(context);
    const outFile = path.join(productOutDir, `${product.id}.html`);
    fs.writeFileSync(outFile, html, 'utf-8');
    console.log(`Generated product page: /product/${product.id}.html`);
});

console.log('Static pages generated successfully!');
