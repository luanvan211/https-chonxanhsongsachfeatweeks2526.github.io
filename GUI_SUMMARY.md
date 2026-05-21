# GUI Summary: Chọn Xanh Sống Sạch / ReBottle / AquaLink

This document provides a summary of the Graphical User Interface (GUI) across different branches of the project. It is intended to help a frontend developer recreate the interfaces.

---

## 1. Primary Design (Branch: `main` / `consolidate-feature-branches-...`)
**Branding:** "Chọn xanh sống sạch" (Official Brand)

### Visual Identity
- **Primary Color:** Blue (`#2563eb` / `blue-600`)
- **Secondary Colors:** Slate for text/borders, Green/Purple/Amber for accents.
- **Typography:** Inter/Sans-serif. Heavy use of `font-black`, `uppercase`, and `tracking-widest` for UI labels.
- **Border Radius:** Large, soft corners (`rounded-3xl` to `rounded-[2.5rem]`).
- **Animations:** Framer Motion for entrance animations (`opacity`, `y-offset`) and hover states (`scale`, `translate`).

### Global Components
- **Navbar:**
  - Sticky with `backdrop-blur-md`.
  - Left: Droplet icon in blue box + Brand Name.
  - Center (Desktop): Links (Home, Customize, Map, Shop, Profile, Admin) with blue underline on active state.
  - Right: Language Toggle (VI/EN), Shopping Cart icon (with red/blue notification badge), User Profile button (with initials/avatar), Settings icon.
- **Footer:**
  - Minimalist. Left: Copyright text. Right: Privacy/Terms links. High tracking uppercase text.

### Key Pages
- **Home:**
  - Hero text with large, bold heading.
  - Stats Grid: 4 cards (Refills, Plastic Saved, Status, Balance). Each has a colored icon background, large value, and small uppercase label.
  - CTA Cards: Two large, colored boxes (Dark Slate for "Customize", Blue for "Map") with large text and arrow icons.
- **Customize (Bottle Customizer):**
  - **Preview Panel:** A large card showing a vertical bottle.
    - Bottle changes color based on selection.
    - Supports two materials: Metal (shows laser engraving text) and Tritan (shows floating charms/emojis).
    - Toggle at the bottom to switch materials.
  - **Controls Panel:**
    - Color Picker: Circular color swatches with active borders.
    - Text Input: For laser engraving (Metal).
    - Charm Grid: Selection of emojis/icons (Tritan).
    - Image Upload: Drag-and-drop style area for custom graphics.
    - Add to Cart: Large, full-width blue button.
- **Shop:**
  - Browse View: Product cards with large images (placeholder icons), prices, and "Add to Cart" buttons.
  - Checkout View: Two-column layout. Cart items and Shipping form on the left; Order Summary with a dark "Complete Order" card on the right.
- **Map:**
  - Full-width Leaflet map.
  - Custom Markers: Standard pins that open popups with shop details and a "Get Directions" button.

---

## 2. Enterprise / Dual-Interface Design (Branch: `feature/dual-interface-admin-portal-...`)
**Branding:** "ReBottle"

### Visual Identity
- **User Primary:** Green (`green-600`)
- **Admin Primary:** Indigo (`indigo-600`)
- **Themes:** Light/Clean for users; Dark/Professional (`slate-900`) for admins.

### Layouts
- **User Interface (UserLayout):**
  - **Sidebar (Desktop):** White background, left-aligned. Green logo. Nav items with icons (Dashboard, Map, Scan, Shop, Vouchers, Messages, Alerts, Profile, Settings).
  - **Bottom Nav (Mobile):** Quick access icons for the first 5 nav items.
  - **Header (Mobile):** Simple white bar with logo and logout icon.
- **Admin Interface (AdminLayout):**
  - **Sidebar:** Dark slate (`bg-slate-800`). Indigo accents for active states. Links: Analytics, User Management, Partner Shops, Support Desk.
  - **Header:** Dark slate. Management Console label and notification bell.
  - **Content Area:** High-contrast text on dark background.

### Key Pages
- **Login:**
  - Centered card. Includes a toggle/buttons to select "User" or "Admin" role before logging in.
  - Gradient background (`from-green-50 to-emerald-100`).
- **Dashboard (User):**
  - Welcome greeting.
  - Stats Row: Simple cards with colored icon backgrounds (Tokens, Bottles, Refills).
  - Activity List: Chronological list of events (e.g., "Bottle Registered") with small status icons.
- **Admin Dashboard:**
  - Data-heavy analytics view (Analytics cards, user lists).

---

## 3. AquaLink Version (Branch: `feat/aqua-link-app-v2-...`)
**Branding:** "AquaLink"

- Identical in layout and functionality to the **Primary Design (main)** but uses "AquaLink" as the brand name in the Navbar and Footer.
- Uses `UserContext` for managing stats like `refills`, `plasticSaved`, and `tier` directly.

---

## Implementation Details for Developers
- **Framework:** Vite + React + TypeScript.
- **Styling:** Tailwind CSS (Note: `main` uses Tailwind 4 with `@import "tailwindcss"` in `index.css`).
- **Icons:** `lucide-react`.
- **Navigation:** `react-router-dom`.
- **Map:** `react-leaflet` + `leaflet`.
- **Components:** Functional components with Hooks. Layouts are used as wrappers for routes in the dual-interface version.

---

## Recreation Guide for Frontend Developers

### 1. Project Initialization
- Start with a Vite + React + TypeScript template.
- Install dependencies: `npm install tailwindcss @tailwindcss/vite lucide-react react-router-dom framer-motion react-leaflet leaflet`.
- Setup Tailwind 4 by importing it in your main CSS file.

### 2. Styling Strategy
- **Base:** Use `bg-slate-50` for the page background and `text-slate-900` for primary text.
- **Components:** Use `bg-white` with `shadow-sm` and large border-radius (e.g., `rounded-3xl`) for cards.
- **Typography:** Use `Inter` font. For headers and badges, use `font-black uppercase tracking-widest`.
- **Interactivity:** Wrap main page transitions in `motion.div` from Framer Motion. Use `layoutId="underline"` for active navbar links to create smooth transitions.

### 3. State Management Patterns
- **Context API:** Use separate contexts for `Language`, `Auth`, `Cart`, and `Data/User`.
- **Language:** Implement a simple i18n system using a `t()` function that maps keys to a translation object (VI/EN).
- **Cart:** Store an array of product objects, supporting a `customization` property for the bottle config.

### 4. Component Recreation
- **Bottle Preview:** Create a composite component with a background color from the state. Use absolute positioning for the cap and centered flex for engraving/charms.
- **Admin Portal (Dual-Interface):** Implement a `ProtectedRoute` component that checks `user.role`. Create `UserLayout` and `AdminLayout` components that wrap the `<Outlet />` or `{children}` with the respective sidebars.
- **Responsive Design:** Ensure sidebars hide on mobile, replaced by a bottom navigation bar or a top hamburger menu. Use `hidden md:flex` and `md:hidden` classes extensively.
