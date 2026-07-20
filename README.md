# AMO Rubber PoC — B2B Catalogue Website

This repository contains the catalog-only B2B website for **AMO Rubber (Abadi Makmur Optimal)**, converted from the Manufactt template.

The website features 15 dynamic material category pages and 15 product details pages generated from structured data layers, with a clean corporate design, dynamic filters, and a floating WhatsApp widget.

---

## ⚡ Development & Build Setup

This project uses **Vite 7** + **TailwindCSS 4** + **Handlebars** for templating and build automation.

### 🛠 Prerequisites

Make sure you have **Node.js** (v18 or higher) installed on your system.

### 📦 Commands

Run these commands from the project root directory:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
# (This automatically triggers page generation)
npm run dev

# 3. Compile static site for production
# (Outputs optimized files inside the dist/ folder)
npm run build

# 4. Preview the compiled production build locally
npm run preview
```

---

## 📂 Project Structure

```
├── scripts/
│   └── generate-pages.js      # Compilation script for categories and products HTML
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── _config.css    # Color tokens and theme styling variables
│   │   │   └── style.css      # Main CSS combining Tailwind & plugins
│   │   ├── js/
│   │   │   ├── app.js         # Main Javascript file
│   │   │   └── components/    # Independent JS components (gallery, filter, swiper)
│   ├── data/
│   │   ├── company.json       # General company metadata & contacts
│   │   ├── categories.json    # List of 15 material categories
│   │   └── products.json      # Database of mock products
│   ├── partials/
│   │   ├── title-meta.html    # Head meta title & SEO tags
│   │   ├── navbar.html        # Header navigation header
│   │   └── footer.html        # Footer with links and WhatsApp floating widget
│   ├── templates/
│   │   ├── category-template.html  # Handlebars blueprint for category pages
│   │   └── pdp-template.html       # Handlebars blueprint for product detail pages (PDP)
│   ├── index.html             # Homepage
│   ├── about.html             # About Us
│   ├── products.html          # Main B2B Catalogue index page
│   ├── gallery.html           # Facility and Product Photo Album
│   ├── contact.html           # Contact form & HQ google map
│   ├── faqs.html              # Accordion FAQ page
│   └── privacy-policy.html    # Privacy agreement page
└── dist/                      # Target production build directory (generated)
```

---

## ⚙️ Content Management & Updating Data

The website is fully data-driven. You don't need to write manual HTML to add products or categories.

### 1. Adding/Editing Products
Open `src/data/products.json` and edit or append new objects.
Each product requires the following structure:
```json
{
  "id": "SKU_CODE",
  "name": "Product Display Name",
  "slug": "product-slug-url-friendly",
  "category": "category-slug-matching-categories-json",
  "grade": "Standard | Premium | FDA",
  "specs": {
    "hardness_sh": 60,
    "thickness_mm": 3,
    "width_m": 1.2,
    "length_m": 10,
    "color": "Red"
  },
  "compliance": ["FDA", "SGS", "REACH", "RoHS"],
  "images": [
    "assets/images/products/product-1.png"
  ],
  "description": "Short and clear product description.",
  "related_skus": ["SKU_1", "SKU_2"]
}
```

### 2. Updating Contact Information
Edit `src/data/company.json` to change the corporate phone numbers, addresses, emails, and WhatsApp contacts. This will automatically update the info in the Navbar, Footer, Contact, and WhatsApp floating button widget across all compiled pages.

### 3. Dynamic Page Generation
* When running `npm run dev` or `npm run build`, the generator script `scripts/generate-pages.js` is automatically triggered.
* It reads the categories and products JSON files, compiles them using Handlebars templates, and writes the output HTML files to `src/products/{category-slug}.html` and `src/product/{sku}.html`.

---

## 🚀 Deployment Plan

This website compiles to completely static assets (`dist/`), making it highly performant, secure, and compatible with any static hosting platform.

### Hosting Options:
1. **Netlify / Vercel** (Recommended):
   - Connect this repository.
   - Set the build command to: `npm run build`
   - Set the publish/output directory to: `dist`
2. **Standard Apache / Nginx Server**:
   - Run `npm run build` locally or inside a CI pipeline.
   - Upload the contents of the `dist/` directory directly to the web root (`public_html` or `/var/www/html/`).

### Routing Note:
Make sure your web server is configured to serve resources relative to the domain root (`/`), as all links and asset paths are generated as root-relative (`/assets/...`, `/product/...`) to ensure compatibility.