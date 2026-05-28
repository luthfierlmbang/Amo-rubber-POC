# Amo Rubber PoC — Implementation Tasks

> Scope: **catalog-only**. Mengubah template Manufactt menjadi situs katalog AMO Rubber.  
> Sumber kebenaran IA: [`AMO-IA-AND-SITEMAP.md`](./AMO-IA-AND-SITEMAP.md).  
> Stack: Vite 7 + TailwindCSS 4 + Preline + Handlebars partials + LightGallery + Swiper.

Konvensi:
- `[ ]` = belum dikerjakan, `[x]` = selesai
- Setiap task ditulis lengkap: **What**, **Where**, **How**, **Acceptance**.
- Eksekusi sebaiknya berurutan per Phase. Dalam satu Phase task bisa dikerjakan paralel jika tidak saling tergantung.

---

## STRICT RULES (WAJIB DIIKUTI SEMUA TASK)

Aturan ini berlaku tanpa pengecualian. Pelanggaran = task ditolak.

### R1. Component & Style Reuse — Tidak Boleh Bikin Komponen Baru dari Nol

- **WAJIB pakai komponen yang sudah ada di template** (`src/index.html`, `src/about.html`, `src/services.html`, `src/products.html`, `src/case-studies.html`, `src/contact.html`, `src/blog*.html`, `src/faqs.html`).
- Untuk halaman atau section baru, **copy struktur HTML dari template existing** lalu tukar konten/data, jangan menulis ulang markup.
- Jika butuh PDP, Material Landing, atau Gallery yang belum ada di template, **rakit dari section template existing** (mis. PDP = hero kecil dari `case-studies.html` + spec list dari `services.html` + image gallery `[data-toggle="gallery"]` dari `products.html`).
- **DILARANG** menambah library UI baru (no Bootstrap, no Flowbite, no shadcn, dll.). Cukup Tailwind 4 + Preline + Iconify + Swiper + LightGallery yang sudah ter-install.
- **DILARANG** menambah custom CSS class baru di luar yang sudah ada di `_general.css`, `_config.css`, `_swiper.css`. Kalau butuh styling baru, **pakai utility Tailwind** atau extend `@theme` di `_config.css`.
- **DILARANG** mengubah `--font-heading`, `--font-body`, ukuran font scale, atau radius default tanpa keputusan eksplisit di Task 0.1.

### R2. Token Brand — Hanya Lewat `_config.css`

- Perubahan warna brand **HANYA** di `src/assets/css/_config.css` lewat token `--color-primary*`.
- **DILARANG** hardcode hex/rgb di markup atau di file CSS lain. Selalu pakai class Tailwind seperti `bg-primary`, `text-primary`, `border-primary`.
- Pengecualian: gradient brand bawaan template (`from-primary-1 to-primary-2`) tetap dipakai apa adanya.

### R3. Asset First — Pakai yang Sudah Ada

- **WAJIB** pakai asset existing di `src/assets/images/` lebih dulu (about/, blog/, case-studies/, client/, service/, user/, award/, dll.) sebelum minta asset baru.
- Mapping yang disarankan saat aset AMO belum tersedia:
  - Foto fasilitas → reuse `images/about/*.webp` dan `images/case-studies/*.webp`
  - Foto produk rubber → reuse `images/blog/*.png` atau `images/case-studies/*.webp` sebagai placeholder kategori
  - Logo client → tetap `images/client/*.svg` sampai logo client AMO disiapkan
  - Logo brand → sementara tetap `images/logo.svg` sampai Task 0.1 selesai
- **DILARANG** download asset dari internet (Unsplash, Pexels, dst.) tanpa persetujuan.
- **DILARANG** delete asset existing sampai konfirmasi tidak dipakai di mana pun.
- Gambar baru AMO (kalau sudah disetor) masuk ke folder spesifik: `images/brand/`, `images/facility/`, `images/product/`. Tidak menimpa folder template.

### R4. Section Pattern — Salin Section Persis

Saat membangun halaman baru, ambil section langsung dari template:

| Kebutuhan AMO | Section donor | Lokasi |
|---|---|---|
| Hero halaman dalam | Hero About | `src/about.html` (atas) |
| Hero homepage | Hero Home | `src/index.html` (atas) |
| Capabilities (Calendering/Rotocure/Compress) | "Services Features Section" sticky cards | `src/index.html` lines ±245–713 |
| Compliance badges (SGS/FDA/PAK/REACH/RoHS) | Service cards 6-grid | `src/services.html` |
| Material category card grid | Product card grid | `src/products.html` |
| Featured products di home | "Products / What We Manufacture Section" | `src/index.html` lines ±714–1116 |
| Stats counter | Stat circles | `src/index.html` "About / Who We Are Section" |
| FAQ accordion | hs-accordion blocks | `src/faqs.html` |
| Gallery grid | `[data-toggle="gallery"]` blocks | `src/products.html` |
| Contact form & info | Contact layout | `src/contact.html` |
| CTA banner | CTA banner gradient | `src/services.html` (bottom) |

Saat menyalin: **jangan mengubah struktur kelas dan markup**, hanya isi konten (text, src, href, data-attribute).

### R5. Animasi & Interaksi — Pakai Pattern Bawaan

- CTA tombol harus pakai pattern animated text + icon (`group`, `group-hover:-translate-y-7`, `duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]`) yang sudah ada di template. Jangan bikin tombol gaya lain.
- Pill badge (`inline-flex items-center gap-1.5 rounded-2xl py-1.25 px-3.5 bg-white border border-default-300`) dipakai di tiap section untuk eyebrow.
- Dropdown navbar = Preline `hs-dropdown`. Mobile menu = Preline `hs-overlay` + `hs-accordion` (sudah di template).
- Modal/lightbox = LightGallery (`data-toggle="gallery"`/`data-toggle="video"`).
- Slider = Swiper class `.project-swiper` (sudah ada init di `swiper.js`). Kalau perlu slider lain, tambah class baru dan extend init di file yang sama.

### R6. JS Discipline

- **DILARANG** menulis script inline di `.html`. Semua JS masuk ke `src/assets/js/components/*.js` lalu di-import dari `app.js`.
- Komponen baru pakai pola IIFE/default-export yang sudah ada (lihat `gallary.js`, `swiper.js`).
- **DILARANG** tambah library JS tanpa entri di `package.json` dan tanpa rationale tertulis di commit message/PR.

### R7. Konsistensi Spacing & Container

- Semua section pakai class container yang ada: `container` atau `container-full` (didefinisikan di `_general.css`). Jangan bikin container custom.
- Vertical padding section ikuti pola template: `lg:py-50 md:py-25 py-20`.
- Grid gap ikuti pola: `lg:gap-25 gap-12` atau `xl:gap-20 gap-12.5` sesuai konteks.

### R8. Dark Background Section

Section dengan latar gelap (mis. footer, CTA banner) harus pakai gradient dan dashed dividers yang sudah ada di template (lihat pattern footer `bg-linear-to-br from-black via-black to-[#8c3b2a]` + 5 garis vertikal dashed).

### R9. Decision Log

Kalau ada keputusan deviasi dari template (misal: butuh komponen yang benar-benar tidak bisa dirakit dari section donor), **tulis di section "Catatan Implementasi" di bawah TASKS.md** sebelum implementasi, sertakan:
- Apa yang dibutuhkan
- Section donor mana yang sudah dicoba
- Kenapa tidak bisa pakai section donor
- Pendekatan baru yang diusulkan

Tanpa entri di Decision Log, deviasi = pelanggaran R1.

### R10. Verifikasi Sebelum Mark Done

Setiap task hanya boleh dicentang `[x]` jika:
- `bun run dev` menampilkan halaman yang dimaksud tanpa error console
- Markup dan class konsisten dengan section donor (bandingkan side-by-side)
- Tidak ada placeholder Manufactt/Unifato/San Francisco di halaman terkait
- Tidak ada hex color hardcoded yang bukan dari `_config.css`

---

## Phase 0 — Pre-flight (Discovery & Decisions)

Sebelum coding, kunci jawaban dari [Pertanyaan Terbuka](./AMO-IA-AND-SITEMAP.md#7-pertanyaan-terbuka).

- [x] **0.1 Konfirmasi brand**
  - **What**: Dapatkan logo final (SVG/PNG) light & dark, brand color (hex), font preference (lanjut Mona Sans + Geist atau ganti?).
  - **Where**: simpan asset ke `src/assets/images/brand/` ketika sudah ada.
  - **Sementara**: pakai `src/assets/images/logo.svg` dan `logo-light.svg` existing. Warna primary saat ini `#c8370b` (oranye Manufactt) tetap dipakai sampai brand AMO disetor.
  - **Acceptance**: jika ada brand baru, tertulis di top dokumen + token `--color-primary*` di-update di `_config.css` (R2). Jika belum, tetap pakai default existing.
- [x] **0.2 Bahasa default**
  - **What**: Pilih ID atau EN untuk PoC. Multi-bahasa = out of scope.
  - **Acceptance**: keputusan tertulis di top dokumen.
- [x] **0.3 Konfirmasi kontak final**
  - **What**: Pilih alamat & nomor telepon canonical (footer lama vs Who We Are lama berbeda).
  - **Acceptance**: tertulis di `src/data/company.json` (akan dibuat di Task 1.5).
- [x] **0.4 Seed data produk**
  - **What**: Dapatkan minimal 12–24 produk untuk demo (campuran kategori) dalam bentuk CSV/JSON. Per produk butuh: SKU, name, category, grade, hardness, thickness, width, length, color, compliance[], description, images[].
  - **Sementara**: jika data belum ada, buat 12 mock products yang **menggunakan asset existing** (`src/assets/images/blog/blog-*.png`, `src/assets/images/case-studies/*.webp`) sebagai field `images[]`. Jangan download asset baru (R3).
  - **Acceptance**: file `src/data/products.json` minimal 12 entri, semua `images[]` merujuk ke file yang sudah ada di repo.
- [x] **0.5 Aset gambar fasilitas**
  - **What**: Foto Calendering, Rotocure, Compress, Warehouse minimal 6 file resolusi ≥ 1600px.
  - **Where**: `src/assets/images/facility/` (kalau aset baru disetor).
  - **Sementara**: pakai `src/assets/images/about/about-image.webp`, `images/about/hero.webp`, `images/case-studies/1.webp` … `4.webp`, `images/other/about-video-bg.jpg` sebagai placeholder fasilitas. Tidak boleh download asset baru (R3).
  - **Acceptance**: tiap section yang butuh foto fasilitas merujuk ke asset existing dengan path yang valid.

---

## Phase 1 — Foundation (Shell, Config, Branding)

- [x] **1.1 Bersihkan dependencies tidak terpakai**
  - **What**: Hapus dari `package.json` dependency yang tidak diimport: `path`, `isotope-layout`, `jarallax`, `gumshoejs`. AOS dipertahankan tapi diaktifkan (Task 4.4) atau dihapus jika diputuskan tidak dipakai.
  - **Where**: `package.json`.
  - **How**: hapus entries di `devDependencies`/`dependencies`, lalu jalankan `bun install` atau `yarn install`.
  - **Acceptance**: `bun install` sukses, `bun run build` tetap sukses.
- [x] **1.2 Pilih satu package manager**
  - **What**: Repo punya `bun.lock` tapi README pakai yarn. Pilih satu.
  - **Acceptance**: hanya 1 lockfile, README di-update ke pilihan tersebut.
- [x] **1.3 Update `vite.config.js`**
  - **What**:
    - `base` ganti dari `"/manufactt/"` ke `"/"` (atau path subdir produksi yang disepakati).
    - Tambah glob input untuk halaman katalog dinamis (`src/products/*.html`, `src/product/*.html`) di bagian production input.
  - **Where**: `vite.config.js`.
  - **Acceptance**: `bun run dev` membuka homepage tanpa 404 asset, `bun run build` menghasilkan semua HTML di `dist/`.
- [x] **1.4 Update theme color & font**
  - **What**: Ganti `--color-primary*` di `src/assets/css/_config.css` ke warna brand AMO yang dikonfirmasi di Task 0.1. Konfirmasi font.
  - **Where**: `src/assets/css/_config.css`.
  - **Acceptance**: tampilan token color konsisten di seluruh halaman.
- [x] **1.5 Buat data layer ringan**
  - **What**: Buat `src/data/company.json`, `src/data/products.json`, `src/data/categories.json`. Schema lihat [§5 di IA doc](./AMO-IA-AND-SITEMAP.md#5-skema-data-konten).
  - **Where**: `src/data/*.json`.
  - **How**: Inject ke Handlebars via `vite-plugin-handlebars` `context` option:
    ```js
    handlebars({
      partialDirectory: resolve("./src/partials"),
      context: {
        company: require("./src/data/company.json"),
        categories: require("./src/data/categories.json"),
        products: require("./src/data/products.json"),
      }
    })
    ```
  - **Acceptance**: partial bisa render `{{company.phones.wa}}` dan list produk.
- [x] **1.6 Update `partials/title-meta.html`**
  - **What**: Ganti title default, meta description, keywords, author, OG tags ke AMO Rubber.
  - **Acceptance**: lihat di view-source semua halaman, meta tag konsisten.
- [x] **1.7 Update `partials/navbar.html`**
  - **What**:
    - Ganti logo path ke `assets/images/brand/logo.svg`.
    - Restructure menu: Home, About, Products (dropdown), Gallery, Contact.
    - Mega-menu Products dengan 8 kategori utama + "View All Materials".
    - Ganti tombol "Get A Quote" → "Inquiry via WhatsApp" (link `https://wa.me/628118177388?text=...`).
    - Mobile accordion menu mengikuti struktur baru.
  - **Acceptance**: di tiap halaman muncul navbar baru, dropdown Preline berfungsi, mobile menu buka/tutup.
- [x] **1.8 Update `partials/footer.html`**
  - **What**:
    - Hapus newsletter form (out of scope catalog PoC).
    - Kolom: Quick Links (Home, About, Products, Gallery, Contact), Materials (8 kategori), Contact Info, Business Hours.
    - Sosmed: hanya Facebook.
    - Copyright: tahun dinamis atau update ke 2025.
    - Big background text "AMO RUBBER®".
  - **Acceptance**: footer tampil rapi di semua halaman.
- [x] **1.9 Bersihkan `app.js`**
  - **What**: Perbaiki active-link logic supaya tidak salah-match (`endsWith` problem). Pakai pencocokan basename eksak.
  - **Where**: `src/assets/js/app.js`.
  - **How**:
    ```js
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("#navbar a[href]").forEach((a) => {
      const target = a.getAttribute("href").split("/").pop();
      if (target === current) a.classList.add("active");
    });
    ```
  - **Acceptance**: link active hanya muncul di halaman yang sesuai.

---

## Phase 2 — Static Pages

- [x] **2.1 Home (`src/index.html`)**
  - **What**: Adaptasi homepage existing menjadi katalog-only AMO. Section yang dipertahankan:
    1. Hero (headline + subhead + CTA "Browse Catalogue" + CTA "Inquiry via WA")
    2. About teaser (logo + 1 paragraf + tombol Learn More)
    3. Capabilities (3 mesin: Calendering, Rotocure, Compress)
    4. Featured Products (8–12 produk dari `products.json`)
    5. Materials grid (15 kategori chip, klik → material landing)
    6. Stats circles (Since 2017, 15+ R&D years, 1M+ sheets, 5 industri)
    7. Photo Album teaser (4 foto fasilitas → Gallery)
    8. CTA banner Inquiry
  - **What dihapus**: testimonials, blog teaser, video manual play/pause, newsletter teaser.
  - **Acceptance**: scroll homepage lancar, semua link valid, hero CTA arahkan ke `/products.html` dan `wa.me`.
- [x] **2.2 About (`src/about.html`)**
  - **What**: Single page gabungan (Company Overview + Manufacturing Facility + Quality & Compliance).
  - **Section**:
    1. Hero "About AMO Rubber"
    2. Company story (sejak 2017, partner Thailand)
    3. Manufacturing facility (3 mesin + foto)
    4. Quality & Compliance (5 badge: SGS, FDA, PAK, REACH, RoHS) — pakai pola service cards.
    5. Stats counter
    6. Industries served (Auto, Aero, Petro, Heavy, Chem) — sebagai chip/list, bukan halaman terpisah.
    7. CTA "See our Catalogue"
  - **Acceptance**: konten sesuai brief, tidak ada placeholder Manufactt.
- [x] **2.3 Contact (`src/contact.html`)**
  - **What**:
    - Hero kecil
    - Info card (alamat HQ, alamat pabrik, telp, WA, email, jam kerja, FB)
    - Embed Google Map alamat HQ
    - Form inquiry sederhana (Name, Company, Email, Phone, Subject, Message). Action sementara `mailto:` atau placeholder endpoint.
    - Tombol besar "Chat via WhatsApp"
  - **Acceptance**: form valid di Tailwind Forms, map embed muncul, semua tautan kontak benar.
- [x] **2.4 FAQs (`src/faqs.html`) — opsional**
  - **What**: Konten FAQ rubber sheet (size availability, MOQ, lead time, shipping, custom compound).
  - **Acceptance**: 6–10 FAQ accordion berfungsi.
- [x] **2.5 Privacy Policy (`src/privacy-policy.html`)**
  - **What**: Copy generik privacy untuk situs katalog (data form inquiry).
  - **Acceptance**: ada minimal 6 section (data collected, cookies, dll.).
- [x] **2.6 404 (`src/error-404.html`)**
  - **What**: Update copy + CTA balik ke Home/Products.
  - **Acceptance**: build OK, link kembali jalan.

---

## Phase 3 — Catalog System

Inti dari PoC. Harus solid.

- [x] **3.1 Data layer produk**
  - **What**: Finalkan `src/data/products.json` dan `src/data/categories.json`. Tiap produk minimal punya 1 image.
  - **Acceptance**: schema sesuai IA doc §5.
- [x] **3.2 Helper Handlebars**
  - **What**: Tambah helper di `vite.config.js` untuk:
    - `eq` (equality)
    - `slugify`
    - `wa_link` (build `wa.me/...?text=Inquiry%20${sku}`)
    - `filter_by_category` (loop products by category slug)
  - **Where**: `vite.config.js` di bagian `handlebars({ helpers: {...} })`.
  - **Acceptance**: helper bisa dipakai di `.html`.
- [x] **3.3 Catalogue page (`src/products.html`)**
  - **What**: Listing semua produk.
  - **Layout**:
    - Hero kecil + judul "Our Catalogue"
    - Filter chips kategori (15) dengan client-side filter (vanilla JS — show/hide kartu berdasarkan `data-category`)
    - Grid kartu produk (4 kolom desktop, 2 tablet, 1 mobile)
    - Tiap kartu: image, name, SKU, hardness (sh), tombol "View Details"
    - Empty state untuk filter tanpa hasil
  - **Acceptance**: filter chip mengubah visibility kartu tanpa reload, klik kartu masuk ke PDP.
- [x] **3.4 Material Category Landing (`src/products/{material}.html`)**
  - **What**: 15 file landing per material. Pendekatan termudah: 1 template generated saat build via plugin handlebars partial atau buat manual 15 file.
  - **Section**:
    - Hero kecil dengan nama material + short desc
    - Use cases / aplikasi
    - Spec range (hardness, thickness range)
    - Grid produk yang masuk kategori itu
    - Related materials (chip ke kategori lain)
  - **Acceptance**: 15 URL valid, semuanya menampilkan produk yang relevan.
  - **Note**: jika 15 file manual terlalu repetitif, generate via script `scripts/build-categories.js` yang membaca `categories.json` dan menulis HTML dari template. Catat pendekatan yang dipakai.
- [x] **3.5 Product Detail Page template (`src/product/{sku}.html`)**
  - **What**: Template baru. Sama seperti category landing, sebaiknya digenerate via script dari `products.json`.
  - **Layout**:
    - Breadcrumb: Home > Products > {Category} > {SKU}
    - 2 kolom desktop:
      - Kiri: gallery image (LightGallery `data-toggle="gallery"`) + thumbnail strip
      - Kanan: name, SKU badge, kategori, deskripsi pendek, **Spec table** (Material, Hardness, Thickness, Width, Length, Color), **Compliance row** (badge per standard), **CTA** "Inquiry via WhatsApp" (link prefilled SKU) + "Email Inquiry"
    - Bawah: Description panjang (Tailwind Typography prose)
    - Related products (4 kartu — same category, exclude current)
  - **Acceptance**: minimal 12 PDP ter-build, semua image, spec, compliance, related, dan tombol WA berfungsi (deeplink mengandung SKU).
- [x] **3.6 Build script untuk halaman dinamis (rekomendasi)**
  - **What**: Buat `scripts/generate-pages.js` yang dijalankan via `prebuild` script di `package.json`. Script membaca JSON, render dengan handlebars compile, tulis HTML ke `src/products/` dan `src/product/`.
  - **Where**: `scripts/generate-pages.js`, `package.json` (script `"prebuild": "node scripts/generate-pages.js"`, `"predev": "node scripts/generate-pages.js"`).
  - **Acceptance**: jalankan `bun run dev` otomatis generate halaman, setiap kali update `products.json` cukup re-run dev.
- [x] **3.7 Mega-menu Products terisi data nyata**
  - **What**: Pastikan menu di navbar nge-link ke `/products/{slug}.html` yang valid (Task 3.4 harus sudah selesai).
  - **Acceptance**: tiap link membuka landing kategori benar.

---

## Phase 4 — Gallery & Polish

- [x] **4.1 Gallery page (`src/gallery.html`)**
  - **What**: Halaman foto fasilitas + produk highlight.
  - **Layout**: Grid masonry/3 kolom dengan `[data-toggle="gallery"]`.
  - **Acceptance**: klik foto buka LightGallery overlay, swipe mobile work.
- [x] **4.2 Floating WhatsApp button**
  - **What**: Sticky di kanan-bawah, muncul setelah scroll 100px.
  - **Where**: tambahkan di `partials/footer.html` atau partial baru `partials/wa-float.html` yang dipanggil di tiap halaman.
  - **How**:
    ```html
    <a href="https://wa.me/628118177388?text=Hi%20AMO%20Rubber"
       target="_blank"
       class="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg">
      <i class="iconify tabler--brand-whatsapp size-7 text-white"></i>
    </a>
    ```
  - **Acceptance**: muncul di semua halaman, klik buka WA web/app dengan text prefilled.
- [x] **4.3 SEO basics per page**
  - **What**: Tiap `.html` punya `{{> title-meta title="…" description="…"}}` yang unik.
  - **Acceptance**: view-source tiap halaman: title & meta description berbeda.
- [x] **4.4 Animasi (AOS)**
  - **What**: Putuskan: aktifkan AOS atau buang.
  - **Jika aktif**: di `app.js` tambah `import AOS from 'aos'; AOS.init({ once: true, duration: 700 });`. Tambahkan `data-aos="fade-up"` di section utama.
  - **Jika buang**: hapus dependency dan import CSS-nya di `style.css`.
  - **Acceptance**: konsisten — AOS aktif berfungsi di semua section, atau dependency benar-benar bersih.
- [x] **4.5 Bersihkan komponen JS yang tidak terpakai**
  - **What**: `video-play.js` masih merefer ID `myVideo` yang dihapus dari home. Hapus file atau pastikan elemen video tetap ada.
  - **Acceptance**: tidak ada error JS di console.
- [x] **4.6 Rename `gallary.js` → `gallery.js`**
  - **What**: typo file. Update import di `app.js`.
  - **Acceptance**: build sukses.

---

## Phase 5 — QA & Delivery

- [x] **5.1 Build production**
  - **What**: `npm run build`.
  - **Acceptance**: tidak ada warning broken asset, semua HTML present di `dist/`.
- [x] **5.2 Lighthouse / quick audit**
  - **What**: Buka `npm run preview`, jalankan Lighthouse di Chrome devtools untuk Home, Products, dan satu PDP.
  - **Acceptance**: catat skor; perbaiki low-hanging issue (alt text, image lazy-load, viewport meta).
- [x] **5.3 Cross-browser smoke test**
  - **What**: Cek di Chrome, Safari, Firefox latest. Cek mobile viewport (Chrome devtools 360, 768, 1280).
  - **Acceptance**: layout tidak rusak, dropdown navbar & filter chips berfungsi.
- [x] **5.4 Cek semua tautan internal**
  - **What**: Klik manual atau jalankan link checker (`npx linkinator dist`).
  - **Acceptance**: zero 404 internal.
- [x] **5.5 Validasi data konten**
  - **What**: Pastikan tidak ada placeholder Manufactt tertinggal (cari "Manufactt", "Unifato", "san francisco", "manufacturing template").
  - **How**: `grep -r "Manufactt\|Unifato\|san francisco" src/`
  - **Acceptance**: zero match selain di komentar template asli yang sudah ditandai untuk dihapus.
- [x] **5.6 README update**
  - **What**: Ganti `README.md` ke konteks AMO PoC: cara setup, struktur folder, cara update data produk, cara generate halaman dinamis.
  - **Acceptance**: dev baru bisa run lokal hanya dari README.
- [x] **5.7 Deployment plan note**
  - **What**: Tulis catatan singkat di README: target hosting (Netlify/Vercel/static server), env, cara update content.
  - **Acceptance**: ada section "Deployment" di README.

---

## Definition of Done (PoC)

- [x] Semua halaman di [§2.1 URL Map](./AMO-IA-AND-SITEMAP.md#21-url-map) ter-build dan dapat diakses
- [x] 15 Material Category Landing terisi minimal 1 produk per kategori (atau placeholder copy untuk kategori yang belum punya produk)
- [x] Minimal 12 Product Detail Page terisi penuh (image, spec, compliance, CTA WA)
- [x] Floating WA button muncul di semua halaman
- [x] Tidak ada placeholder branding Manufactt yang tersisa
- [x] Lighthouse Performance ≥ 80, Accessibility ≥ 90 di home & PDP
- [x] README mendokumentasikan cara setup, build, dan update data produk

---

## Catatan Implementasi

- **Generated pages vs manual**: untuk 15 kategori + ≥12 PDP = 27+ halaman. Jangan tulis manual — pakai script generator (Task 3.6). Lebih cepat, konsisten, dan mudah dikembangkan.
- **Performance image**: gunakan `.webp` untuk semua foto produk dan fasilitas. Ukuran maks ~250KB per file.
- **Tipografi heading**: kalau brand AMO butuh feel industrial, pertimbangkan font tegas (Inter Tight, Sora) menggantikan Mona Sans — diputuskan di Task 0.1. Sampai diputuskan, **pakai Mona Sans + Geist existing** (R1).
- **State management filter** di catalogue: cukup pakai vanilla JS dengan attribute selector (`[data-category="silicone"]`). Jangan import library tambahan.
- **WhatsApp deeplink**: gunakan format `https://wa.me/628118177388?text=` dan encodeURIComponent pesan default. Format mengandung SKU saat dari PDP.
- **Cache busting**: Vite handle otomatis di production build (hash di filename).

### Decision Log (deviasi dari template)

Tiap deviasi dari section donor di R4 wajib dicatat di sini sebelum implementasi:

| Tanggal | Halaman | Kebutuhan | Section donor yang dicoba | Alasan deviasi | Pendekatan baru | Approved by |
|---|---|---|---|---|---|---|
| _(belum ada)_ | | | | | | |
