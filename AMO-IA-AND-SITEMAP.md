# Amo Rubber — Information Architecture & Proposal Sitemap

> **Scope: catalog-only website.**  
> Tidak ada quotation form khusus, tidak ada blog, tidak ada industry landing, tidak ada brochure page terpisah. Fokus = company profile singkat + katalog produk yang mudah di-browse + jalur kontak untuk inquiry.  
>
> Sumber analisis: `amo-rubber.com/`, `/who-we-are/`, `/contact-us/`, `/shop/` dan inventarisasi section di `src/*.html` template Manufactt.

---

## 1. Ringkasan IA Situs Lama

### 1.1 Identitas

- **Brand**: AMO Rubber — Abadi Makmur Optimal
- **HQ**: Jababeka II, Cikarang Selatan, Bekasi, Jawa Barat
- **Manufaktur**: Chonburi, Thailand (Jingdong CS Rubber + AEP Venture Bangkok)
- **Tahun**: berdiri 2017
- **Kapasitas**: 2 unit Calendaring, 4 unit Rotocure, 1 unit Compress Vulcanised
- **Industri target (untuk konten copy)**: Automotive, Aerospace, Petroleum, Heavy Industry, Chemical
- **Compliance**: SGS, FDA, PAK, REACH, RoHS
- **Kontak**: telp `+62 21-5032-7388`, WA `+62 811-817-7388`, email `digital_marketing@amo-rubber.com`, `group@amo-rubber.com`
- **Stack lama**: WordPress + WooCommerce, Tawk.to chat, Google Translate (10 bahasa), GA UA legacy

### 1.2 Top-level Navigation Lama

```
HOME
├── ABOUT US      → Who We Are, Brochure
├── OUR PRODUCTS  → 8 kategori material + shop (16 kategori real)
├── PHOTO ALBUMS
├── REQUEST QUOTATION
├── CONTACT US
└── BLOG
```

### 1.3 Pola SKU

Format konsisten dan informatif untuk B2B:

```
{prefix}{hardness}{thickness}{width}{length}{variant?}
ASI60060125    → AMO Silicone, 60 sh, 6mm, 60", ...
THNR60060150   → Thailand NR, 60 sh, 6mm, 60", 1.5m
ANE65050150W   → AMO Neoprene, 65 sh, 5mm, ..., White
```

Pertahankan pola ini di PDP.

---

## 2. Proposal Sitemap (Catalog-Only)

```
HOME
├── ABOUT                (single page — company + facility + compliance)
├── PRODUCTS
│   ├── All Catalogue
│   ├── By Material      (15 kategori — landing per material)
│   └── Product Detail   (PDP per SKU)
├── GALLERY              (foto fasilitas, mesin, produk)
├── CONTACT              (alamat, telp, WA, email, map, form inquiry)
└── (Utility)
    ├── FAQs             (opsional, simpan jika ada konten)
    ├── Privacy Policy
    └── 404
```

### 2.1 URL Map

| URL | Halaman | Asal Template |
|---|---|---|
| `/` | Home | `index.html` (adaptasi) |
| `/about.html` | About (gabungan) | `about.html` (adaptasi) |
| `/products.html` | Catalogue | `products.html` (adaptasi) |
| `/products/{material-slug}.html` | Material Category Landing | varian dari `products.html` |
| `/product/{sku}.html` | Product Detail Page | **template baru** |
| `/gallery.html` | Photo Album | **template baru** (pakai LightGallery yg sudah ada) |
| `/contact.html` | Contact | `contact.html` (adaptasi) |
| `/faqs.html` | FAQs | `faqs.html` (opsional) |
| `/privacy-policy.html` | Privacy | `privacy-policy.html` |
| `/error-404.html` | 404 | `error-404.html` |

### 2.2 Halaman yang Dihapus dari Cakupan PoC

- `quotation.html` / Request Quotation form — diganti tombol WA dan form inquiry singkat di Contact
- `industries.html` + 5 sub-landing — industri hanya jadi konten copy di Home/About
- `blog.html`, `blog-detail.html` — di luar scope PoC
- `brochure.html` — kalau ada PDF, cukup tombol download di Footer atau About
- Kategori material di-list semua di mega-menu (tanpa "By Industry" pivot)

---

## 3. Daftar Kategori Material

15 kategori dari shop existing (yang akan jadi landing per-material):

1. Silicone Rubber Sheet
2. Silicone Sponge Sheet
3. EPDM Rubber Sheet
4. NBR Rubber Sheet
5. Neoprene / CR Rubber Sheet
6. Viton (FKM) Rubber Sheet
7. NR / Pure Gum Sheet
8. SBR Rubber Sheet
9. Butyl Rubber Sheet
10. Hypalon Rubber Sheet
11. PTFE Sheet
12. ESD Rubber Sheet
13. FDA Grade Rubber Sheet
14. Insulation Rubber Sheet (IEC61111)
15. Rubber Gasket

> Mega-menu akan menampilkan 8 kategori utama + tautan **"View All Materials →"** ke `/products.html`.

---

## 4. Pemetaan ke Template Manufactt

### 4.1 Section Inventory yang Dipakai

| File template | Komponen siap pakai yang relevan |
|---|---|
| `index.html` | Hero, About teaser, Capabilities sticky cards, Products grid, Stats circles |
| `about.html` | Hero, About content blocks, Stats |
| `services.html` | Service cards 6-grid → bisa jadi compliance badges |
| `products.html` | Product card grid + LightGallery toggle |
| `contact.html` | Contact form + info card |
| `faqs.html` | Preline accordion |
| `error-404.html` | 404 |
| `privacy-policy.html` | Privacy |
| Partials (`src/partials/`) | navbar, footer, head-css, title-meta |

### 4.2 Komponen Reusable

- **Pill badge** ("Trusted partner" pattern)
- **Animated CTA button** (hover slide text + icon)
- **Stat circles** (3 lingkaran besar di home about section)
- **Sticky service cards** (`index.html` lines 247–713) — cocok untuk material highlight
- **LightGallery toggle** (`[data-toggle="gallery"]`, `[data-toggle="video"]`)
- **Preline accordion** (`hs-accordion`) — FAQ + spec collapse di PDP
- **Preline dropdown** (`hs-dropdown`) — siap untuk mega-menu Products
- **Iconify** (`tabler--*`, `lucide--*`)

### 4.3 Komponen Baru yang Wajib Dibuat

1. **Product Detail Page (PDP)** — belum ada. Layout:
   - Breadcrumb (Home > Products > Material > SKU)
   - Image gallery (LightGallery + thumbnail strip)
   - Spec table (SKU, Material, Hardness sh, Thickness, Width, Length, Color, Compliance)
   - Description
   - Compliance badge row
   - **CTA**: "Inquiry via WhatsApp" (deeplink dengan SKU prefilled di message) + "Email Us"
   - Related products (4-grid)
2. **Mega-menu Products** — Preline dropdown 1 kolom diganti 2 kolom: kategori material + thumbnail unggulan/CTA "View All".
3. **Material Category Landing** — varian `products.html` dengan hero kecil + chips filter material.
4. **Gallery page** — grid foto pakai `data-toggle="gallery"`.
5. **Floating WhatsApp button** — sticky di kanan bawah (deeplink `wa.me/628118177388`).

### 4.4 Komponen yang Dibuang

- Newsletter form di footer (tidak relevan PoC katalog)
- Testimonials section di home (kalau testimonial belum tersedia, hapus dulu)
- Blog teaser di home
- Hero video manual play/pause (`video-play.js`) — opsional, kalau pakai foto/loop muted, hapus tombol

---

## 5. Skema Data Konten

```yaml
Product:
  id: string             # SKU, contoh ASI60060125
  name: string
  slug: string
  category: enum         # 15 material
  grade: enum            # Basic | Premium | FDA | High Grade | Standard
  specs:
    hardness_sh: number
    thickness_mm: number
    width_m: number
    length_m: number
    color: string
  compliance: enum[]     # SGS, FDA, PAK, REACH, RoHS, IEC61111
  images: string[]
  description: string
  related_skus: string[]

Category:
  slug: string
  name: string
  short_desc: string
  hero_image: string
  use_cases: string[]    # untuk copy di landing

CompanyInfo:
  address_hq: string
  address_factory: string
  phones: { main, wa }
  emails: { sales, marketing, group }
  social: { facebook }
  hours: string
```

Storage: untuk PoC, simpan sebagai data JS/JSON di `src/data/` lalu render Handlebars partial. Tidak perlu CMS.

---

## 6. Navigation Final

```
[ HOME ]  [ ABOUT ]  [ PRODUCTS ▼ ]  [ GALLERY ]  [ CONTACT ]    [ Inquiry via WA ⇾ ]

PRODUCTS ▼  (mega-menu)
  ├── Silicone Rubber Sheet
  ├── EPDM Rubber Sheet
  ├── NBR Rubber Sheet
  ├── Neoprene / CR Rubber Sheet
  ├── Viton (FKM) Rubber Sheet
  ├── NR / Pure Gum Sheet
  ├── ESD Rubber Sheet
  ├── FDA Grade Rubber Sheet
  ──────────────────────────────
  └── View All Materials  →  /products.html
```

---

## 7. Pertanyaan Terbuka

Hal yang perlu konfirmasi sebelum eksekusi:

1. **Brand color & logo final** — apakah ada brand guideline?
2. **Bahasa default** — ID atau EN? Multi-bahasa di luar scope PoC?
3. **Daftar produk lengkap** — perlu data dump untuk seed katalog (CSV/JSON)
4. **Foto produk & fasilitas** — tersedia dalam resolusi tinggi?
5. **Compliance certificates** — file PDF tersedia untuk download di About?
6. **Sumber kontak final** — situs lama inkonsisten (footer vs Who We Are), pakai yang mana?
7. **Apakah PoC ini akan dipakai sebagai static demo atau staging untuk replacement live site?**

Setelah pertanyaan di atas dijawab, eksekusi mengikuti `TASKS.md`.
