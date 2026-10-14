# Lemon — Café · Restaurant · Pool (Vadodara)
### Award-Level Cinematic Showcase Website (MERN Architecture)

> **"Where Citrus Meets Calm."**  
> Sprawling across 30,000 square feet on Sevasi Canal Road in Vadodara, Lemon is an architectural sanctuary merging sun-drenched European conservatories, emerald poolside cabanas, and pure vegetarian global gastronomy.

---

## 🏛️ Project Architecture Overview

This is a **high-end DISPLAY showcase website** designed to evoke desire and drive physical visits to the venue:
- **No cart, no checkout, no online ordering, no customer login**.
- Pure focus on editorial luxury aesthetics, fluid typography, smooth Lenis scrolling, GSAP parallax, and high-performance WebP media delivery.

```
cafe/
├── client/                     # Vite + React 19 + Tailwind CSS + GSAP + Lenis
│   ├── public/
│   │   ├── assets/optimized/   # WebP conversions, responsive sets & compressed hero video
│   │   ├── favicon.svg         # Handcrafted lemon icon
│   │   ├── sitemap.xml         # Search engine sitemap
│   │   └── robots.txt          # SEO crawl policy
│   ├── src/
│   │   ├── components/         # Reusable luxury UI primitives (Navbar, Footer, Logo, Slices)
│   │   ├── config/             # Business single-source-of-truth, assets, menuData
│   │   ├── pages/              # Home, Menu, Experience, Gallery, About, Visit, Admin, NotFound
│   │   └── index.css           # Custom design tokens, fluid clamp typography & luxury shadows
│   └── package.json
│
├── server/                     # Node.js + Express + MongoDB (MVC Pattern)
│   ├── src/
│   │   ├── config/             # Database connection, business info, seed data
│   │   ├── controllers/        # Menu & Category controllers with memory fallbacks
│   │   ├── middleware/         # Auth JWT, rate-limit, error handlers
│   │   ├── models/             # MenuItem, Category, GalleryItem, Review, Special, Enquiry, AdminUser
│   │   ├── routes/             # Public API + Protected Admin Routes
│   │   └── seeder.js           # Database population script (30 real poster dishes & categories)
│   └── package.json
└── README.md
```

---

## 🎨 Luxury Design System

- **Palette**:
  - Cream: `#FBF6E9` (Background canvas)
  - Lemon Gold: `#E8B923` (Accents, highlights, buttons)
  - Deep Olive: `#2F3A1F` (Headlines, badges, footer, cards)
  - Poolside Teal: `#1F6F6B` (Water reflections & ambient gradients)
  - Charcoal: `#1A1A1A` (Body text & contrast)
  - Warm White: `#FFFDF8` (Card surfaces & border frames)
- **Typography**:
  - Display: *Fraunces* & *Playfair Display* (Editorial serifs with high-contrast italics)
  - Body: *Plus Jakarta Sans* (Clean, legible modern sans-serif)
  - Monospace: *JetBrains Mono / Courier* (Timings, prices, coordinates, tags)
- **Details**:
  - Subtle film grain texture overlay
  - Custom hand-drawn lemon slice SVG icons
  - 24px and 32px rounded corners with layered luxury box shadows (`shadow-luxury`)
  - Smooth 60fps Lenis inertial scrolling synced with GSAP ScrollTrigger

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas URI)

### 1. Server Setup
```bash
cd server
npm install
npm run seed     # Populates MongoDB with the 30 menu items & 6 categories
npm run dev      # Starts server on http://localhost:5000
```

### 2. Client Setup
```bash
cd client
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🔐 Admin Portal Access

The venue administration suite is accessible directly at:
- **URL**: `http://localhost:5173/admin`
- **Default Email**: `admin@lemonhousecafe.com`
- **Default Password**: `lemon123`

### Admin Features:
1. **Menu Management**: Add new items, edit prices in ₹, toggle pure-veg, chef's pick, and must-try badges, or delete dishes.
2. **Tomorrow's Special**: Update the daily featured banner, dish titles, and schedule.
3. **Guest Enquiries**: View table and private event inquiries received from the Visit page with one-click direct WhatsApp chat.
4. **Operating Hours & Contacts**: Update live operating hours, phone numbers, and addresses.

---

## 🌐 Public REST API Endpoints

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Public | Service health & timestamp |
| `/api/business` | `GET` | Public | Verified single-source-of-truth business profile |
| `/api/categories` | `GET` | Public | All 6 menu categories with ordering |
| `/api/menu` | `GET` | Public | All menu items with search (`?search=`), category filter (`?category=`), and badges |
| `/api/specials` | `GET` | Public | Current Tomorrow's Special menu items |
| `/api/enquiries` | `POST` | Public | Submit visit, cabana, or celebration inquiry |
| `/api/admin/login` | `POST` | Public | Authenticate concierge administrator and set cookie/JWT |
| `/api/admin/menu` | `POST/PUT/DELETE` | Protected | Full CRUD for menu items |
| `/api/admin/specials`| `PUT` | Protected | Update Tomorrow's Special banner |
| `/api/admin/business`| `PUT` | Protected | Update operational hours and contact |

---

## 📦 Deployment Guide

### Client on Vercel
1. Set the root directory to `client`.
2. Framework preset: `Vite`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Environment variable: `VITE_API_URL=https://your-server.onrender.com`.

### Server on Render
1. Create a Web Service with root directory `server`.
2. Build command: `npm install`.
3. Start command: `npm start`.
4. Environment variables:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/lemon_cafe`
   - `JWT_SECRET=your_super_secret_jwt_key`
   - `CLIENT_URL=https://your-vercel-domain.vercel.app`

### MongoDB on Atlas
1. Create a free shared M0 cluster on MongoDB Atlas.
2. Create database user and whitelist `0.0.0.0/0` (or Render's outbound IPs).
3. Copy connection string into `MONGODB_URI`.
4. Run `node src/seeder.js` once to populate initial data.

---

## 📄 License & Credits
Designed and engineered for **Lemon — Café · Restaurant · Pool**, Sevasi Canal Road, Vadodara, Gujarat.

Powered by [Techofay Global Ventures](https://techofay-global-ventures.vercel.app/).
