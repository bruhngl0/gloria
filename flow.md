# Styled by Gloria (SBG) — Custom Frontend Build Flow
> Paste this entire document into Claude Code to scaffold the project end-to-end.

---

## PROJECT CONTEXT

You are building a custom headless frontend for **Styled by Gloria (SBG)** — a premium, body-type-intentional fashion brand. The Shopify store (Basic plan) is the backend. You will use the **Shopify Storefront API** (GraphQL) for all product/cart data and redirect to Shopify's native checkout.

**Brand rules (non-negotiable):**
- Color palette: White `#FFFFFF` / `#FAFAFA` bg · Black `#0A0A0A` text · Grey `#666666` accent · `#E0E0E0` borders
- Buttons: Primary = black fill + white text · Secondary = white fill + black border
- Fonts: One editorial display font (refined serif or geometric sans) + one clean body sans-serif. No Inter, no Arial, no system fonts.
- Tone: Warm, empowering, editorial — never generic or preachy
- Body-first language everywhere: clothing serves the body, not the reverse

---

## TECH STACK

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (with custom design tokens matching SBG palette)
- **API:** Shopify Storefront API v2024-01 (GraphQL)
- **Fonts:** Load via `next/font` — suggest `Cormorant Garamond` (display) + `DM Sans` (body)
- **Deployment target:** Vercel
- **Booking:** Calendly embed (styling services page)
- **Forms:** React Hook Form + native fetch to a `/api/contact` route

---

## ENVIRONMENT VARIABLES

Create a `.env.local` file at root with:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_public_token
```

> **How to get these:** Shopify Admin → Settings → Apps and sales channels → Develop apps → Create app → Configure Storefront API → enable: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`, `unauthenticated_read_selling_plans` → Save → copy the Storefront API access token.

---

## PHASE 1 — PROJECT SCAFFOLD

### 1.1 Init Next.js project

```bash
npx create-next-app@latest sbg-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
cd sbg-frontend
```

### 1.2 Install dependencies

```bash
npm install graphql-request @radix-ui/react-dialog @radix-ui/react-accordion \
  react-hook-form framer-motion next-themes clsx tailwind-merge lucide-react
```

### 1.3 Tailwind config — extend with SBG design tokens

In `tailwind.config.ts`, extend the theme:

```ts
theme: {
  extend: {
    colors: {
      sbg: {
        black: '#0A0A0A',
        white: '#FFFFFF',
        offwhite: '#FAFAFA',
        grey: '#666666',
        border: '#E0E0E0',
        hover: '#F5F5F5',
      }
    },
    fontFamily: {
      display: ['var(--font-cormorant)', 'serif'],
      body: ['var(--font-dm-sans)', 'sans-serif'],
    },
  }
}
```

### 1.4 Font setup in `src/app/layout.tsx`

Load `Cormorant_Garamond` (weights: 300, 400, 500, 600) and `DM_Sans` (weights: 300, 400, 500) via `next/font/google`. Apply CSS variables `--font-cormorant` and `--font-dm-sans`. Set `font-family: var(--font-dm-sans)` as default body font on `<html>`.

---

## PHASE 2 — SHOPIFY STOREFRONT API CLIENT

### 2.1 Create `src/lib/shopify.ts`

Build a typed GraphQL fetch wrapper:

```ts
const SHOPIFY_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: revalidate product data every 60s
  })
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}
```

### 2.2 Create `src/lib/queries.ts` — all GraphQL queries

**Product query (SBG-D001 — The One for All Dress):**
```graphql
query GetProduct($handle: String!) {
  product(handle: $handle) {
    id
    title
    descriptionHtml
    variants(first: 30) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          selectedOptions { name value }
          image { url altText }
        }
      }
    }
    images(first: 10) {
      edges { node { url altText width height } }
    }
    metafield(namespace: "sbg", key: "body_types") {
      value
    }
    options { name values }
  }
}
```

**Cart create mutation:**
```graphql
mutation CartCreate($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      checkoutUrl
      totalQuantity
      cost { totalAmount { amount currencyCode } }
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                product { title }
                image { url altText }
              }
            }
          }
        }
      }
    }
  }
}
```

**Cart update (add line) mutation:**
```graphql
mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { id checkoutUrl totalQuantity }
  }
}
```

---

## PHASE 3 — GLOBAL LAYOUT & NAVIGATION

### 3.1 `src/app/layout.tsx` — Root layout

- Sticky header (position: sticky, top: 0, z-50, bg-white/95 backdrop-blur)
- Height: 64px on desktop, 56px mobile
- Left: SBG wordmark in display font, uppercase tracking-widest
- Center (desktop): Nav links — Shop · Styling Services · About · Contact
- Right: Cart icon with item count badge (pull from cart context)
- Mobile: hamburger → full-screen slide-in menu
- No color, no logo image — pure typography

### 3.2 Navigation links
```
/          → Home
/shop      → All Products (collections page)
/services  → Styling Services
/about     → About
/contact   → Contact
```

### 3.3 Cart context `src/context/CartContext.tsx`

- Store `cartId` and `checkoutUrl` in `localStorage`
- Expose: `cart`, `addToCart(variantId, quantity)`, `cartCount`, `checkoutUrl`
- On mount: fetch existing cart by ID if one exists in localStorage
- Wrap root layout in `<CartProvider>`

### 3.4 Footer `src/components/Footer.tsx`

Full-width, black background, white text. Four columns:
1. SBG wordmark + mission tagline (1–2 lines)
2. Shop links: The One for All Dress · Coming Soon
3. Services links: Book a Consultation · Styling Services
4. Legal + social: Privacy Policy · Returns · Shipping · @styledbygloria_g icons (TikTok, Instagram, YouTube)

Bottom bar: `© 2024 Styled by Gloria. All rights reserved.` — small, grey, centered.

---

## PHASE 4 — HOMEPAGE (`src/app/page.tsx`)

Build each section as a standalone component in `src/components/home/`.

### Section 1 — Hero (`HeroSection.tsx`)
- Full viewport height (`min-h-screen`), full-width
- Background: full-bleed editorial image (client supplies — use placeholder for now: `/images/hero.jpg`)
- Overlay: subtle black gradient from bottom (0% to 40% opacity)
- Text overlay (bottom-left, white):
  - Small uppercase label: `STYLED BY GLORIA`
  - H1 display font: brand mission line (1 sentence — client supplies copy)
  - CTA button: "Shop The Dress" → `/shop` — white fill, black text (inverted for hero)
- No carousel. One image. Full impact.
- On mobile: text shifts to center-bottom

### Section 2 — Mission Statement (`MissionSection.tsx`)
- White background, full width, generous vertical padding (120px desktop / 80px mobile)
- Pure typography — no images
- Single centered paragraph in display font, large (clamp 2rem → 3.5rem)
- Client supplies copy. Use placeholder: *"We believe clothing should work for your body — not the other way around."*
- Thin horizontal rule (`#E0E0E0`) above and below

### Section 3 — Featured Product (`FeaturedProductSection.tsx`)
- Two-column layout: large image left (60%), content right (40%)
- Mobile: stacked, image first
- Image: full-bleed editorial shot of "The One for All Dress"
- Right column content:
  - Small label: `THE ONE FOR ALL DRESS — SBG-D001`
  - H2 in display font: product name
  - 2–3 sentence editorial description (client supplies)
  - "Body Types" callout: pill tags for each body type (from metafield)
  - CTA: "View the Dress" → `/shop/one-for-all-dress` — primary black button
- Fetch product data server-side using `shopifyFetch`

### Section 4 — The SBG Difference (`DifferenceSection.tsx`)
- Light grey background (`#FAFAFA`), full width
- Centered heading: "The SBG Difference" — display font
- 3-column grid (mobile: 1 col) of value cards:
  - Icon (minimal SVG line icon) + short heading + 1–2 sentence description
  - Client supplies copy for 2–3 value points. Placeholders:
    1. "Body-Type Intentional" — Every piece is designed around how it serves specific shapes.
    2. "Styled, Not Sold" — We're not here to move product. We're here to make you look like yourself.
    3. "With You, Not For You" — Personal styling that treats you as the expert on your own body.
- No borders on cards — whitespace creates the separation

### Section 5 — Styling Services Teaser (`ServicesTeaserSection.tsx`)
- White background
- Left: headline + 1–2 sentence intro (client supplies) + CTA "Book a Consultation" → `/services`
- Right: clean list of service names only (no prices, no descriptions — just surface the offering):
  - Initial Consultation · Body Type Education · Personal Shopping · Closet Audit · Full Styling Experience
- CTA button: primary black

### Section 6 — Footer
- Rendered from global layout

---

## PHASE 5 — SHOP / COLLECTIONS PAGE (`src/app/shop/page.tsx`)

Since launch has **one product only**, this page is simple but must be built to scale.

### Layout
- Page header: `SHOP` — display font, large, centered, with thin rule below
- Filter bar (top): Body Type · Size · Color · Price — render as horizontal pill filters
  - For launch: Body Type filter should still render (pulls from product metafields)
  - Filters are client-side state — no URL params needed for MVP
- Product grid: 2 columns mobile · 3 columns desktop · 4 columns widescreen
- Each product tile (`ProductCard.tsx`):
  - Image: 3:4 aspect ratio, object-cover
  - On hover: reveal second image (CSS transition, opacity swap)
  - Below image: product name · price
  - "Sold Out" badge (grey overlay) if `!availableForSale`
  - "New" badge (black top-left pill) if product has tag `new`
  - No "Add to Cart" on tile — click goes to PDP

### Data
- Fetch all products from Shopify collections via Storefront API
- For now: single product query by handle is sufficient
- Build the collection query structure ready for future products:
```graphql
query GetCollection($handle: String!) {
  collection(handle: $handle) {
    products(first: 20) {
      edges {
        node {
          id
          handle
          title
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 2) { edges { node { url altText } } }
          tags
          metafield(namespace: "sbg", key: "body_types") { value }
          variants(first: 1) { edges { node { availableForSale } } }
        }
      }
    }
  }
}
```

---

## PHASE 6 — PRODUCT DETAIL PAGE (`src/app/shop/[handle]/page.tsx`)

### Layout — Desktop
- Left 55%: image gallery
  - Main large image (top)
  - Thumbnail strip below (4 images min: front, back, detail, full-body model)
  - Click thumbnail → swap main image
  - Hover on main image: zoom (CSS `transform: scale(1.05)`)
- Right 45%: sticky product info panel

### Right Panel — top to bottom
1. Small label: style code `SBG-D001`
2. Product title — display font, H1
3. Price — body font, medium weight. Format: `$XXX CAD`
4. Body Type callout:
   ```
   Works beautifully for: [Pear] [Hourglass] [All Body Types]
   ```
   Rendered as soft pill tags in `#F5F5F5` with `#666` text. Pull from `metafield(namespace: "sbg", key: "body_types")`. Parse as JSON array.
5. Color selector — visual swatches (not dropdown):
   - Black swatch · Red swatch · Baby Blue swatch
   - Selected state: swatch gets black ring `ring-2 ring-offset-2 ring-black`
   - Selecting color variant swaps the main product image to that colorway
6. Size selector — button group (not dropdown):
   - XS · S · M · L · XL
   - Unavailable sizes: greyed out + strikethrough, not clickable
   - Size Guide link → opens `<SizeGuideModal />` (Radix Dialog)
7. Add to Cart button — full width, black, primary. Text: "Add to Cart"
   - On click: call `addToCart(selectedVariantId, 1)` from CartContext
   - Loading state: show spinner inside button
   - Success state: brief "Added ✓" then revert
   - On mobile: this button is sticky at bottom of viewport
8. Short editorial description — 2–4 sentences. Client supplies.

### Accordion sections (below main panel)
Use Radix Accordion. Three items:
- **Fabric & Care** — `Stretch crepe (ponte crepe, 250–280 g/m², 58% spandex)` + care instructions (client supplies)
- **Shipping & Returns** — link to policy pages (client supplies copy)
- **Size Guide** — repeat size guide link

### "You May Also Like" section
- Render conditionally: only show if there are 2+ products in the store
- For launch (1 SKU): **do not render this section** — add a `SHOW_RECOMMENDATIONS=false` env flag or a simple product count check

### Mobile layout
- Images: horizontal swipeable carousel (use CSS `scroll-snap-x`)
- Info panel: full width below images
- Add to Cart: sticky bottom bar (fixed, full width, z-50)

---

## PHASE 7 — STYLING SERVICES PAGE (`src/app/services/page.tsx`)

### Section 1 — Page Header
- Centered: `STYLING SERVICES` in display font
- 1–2 sentence intro below. Client supplies copy.

### Section 2 — Consultation CTA (prominent, above the fold)
- Highlighted callout box (thin black border, generous padding)
- Content:
  - Label: `START HERE`
  - Heading: `30-Minute Initial Consultation`
  - Body: "New to SBG? Every full styling experience begins here. Book your intro session and meet your stylist."
  - Price: `$25`
  - CTA: "Book Your Consultation" → Calendly link (client supplies)
- This must appear **before** the service cards

### Section 3 — Service Cards
One card per service. Card layout: clean, no box shadows — thin `1px #E0E0E0` border, generous padding.

Build 5 cards:

| Service | Type | Key detail |
|---|---|---|
| Body Type Education Session | Virtual · 45 min | Standalone booking |
| Personal Shopping | Virtual or In-Person · Hourly | Rate per hour |
| Closet Audit | Virtual or In-Person · Hourly | Rate per hour |
| Full Styling Experience | Virtual or In-Person · Bundle | Full transformation bundle |

Each card contains:
- Service name (display font, H3)
- Type badge: `Virtual` or `In-Person` or both — small grey pill
- Duration/format: small grey label
- Bullet list of what's included (pull from Section 7.2 of requirements doc)
- **No prices shown** — intentional per client brief
- CTA: "Enquire About This Service" → `/contact` (no direct booking for these — contact only)

> Note: Initial Consultation is the only service with a direct book button. All others route to contact.

### Section 4 — Styling Team
- Grid of stylist bios (client supplies photos + bios)
- Placeholder: one card with photo placeholder + "Gloria — Founder & Lead Stylist"

### Section 5 — Footer note
- Centered, italic, grey: *"Don't see what you're looking for? Ask me about it."*
- Link to `/contact`

---

## PHASE 8 — ABOUT PAGE (`src/app/about/page.tsx`)

### Layout
- Full-width editorial image at top (founder photo — client supplies)
- Text content below: two-column on desktop (image left, text right) — or full-width with generous padding
- Content sections:
  1. Heading: `The Story Behind SBG` — display font
  2. Brand origin story — client supplies copy
  3. Mission restatement: `"Help people love their bodies more."`
  4. Founder bio section
  5. Social proof / brand handle callout: `@styledbygloria_g`
- CTA at bottom: "Shop the Collection" + "Book a Session"

---

## PHASE 9 — CONTACT PAGE (`src/app/contact/page.tsx`)

### Layout
- Left: heading + intro text
- Right: contact form

### Form fields
- Name (required)
- Email (required)
- Subject — dropdown: `General Inquiry · Styling Services · Order Question · Press`
- Message (required, textarea)
- Submit button: "Send Message" — primary black

### API Route `src/app/api/contact/route.ts`
- Accepts POST with form data
- Send email via Resend (recommended: `npm install resend`) or Nodemailer
- Return `{ success: true }` or `{ error: 'message' }`
- Add `RESEND_API_KEY` to `.env.local`

### Also include
- Instagram / TikTok / YouTube links with icons (Lucide or SVG)
- Email address (client supplies)

---

## PHASE 10 — SUPPORTING PAGES

### 404 Page (`src/app/not-found.tsx`)
- Branded — not default Shopify/Next.js
- Large `404` in display font
- Short line: "This page doesn't exist — but your perfect outfit does."
- CTA: "Back to Shop" → `/shop`

### Policy Pages
Create three static pages with consistent styling. Client supplies copy.
- `src/app/privacy/page.tsx`
- `src/app/returns/page.tsx`
- `src/app/shipping/page.tsx`

Layout: simple single-column, max-width 720px centered, generous line-height, display font headings.

---

## PHASE 11 — CART & CHECKOUT FLOW

### Mini Cart Drawer (`src/components/CartDrawer.tsx`)
- Slides in from right (Framer Motion `x: '100%'` → `x: 0`)
- Triggered by cart icon in header
- Shows:
  - Cart items (image · name · variant · qty · price)
  - Subtotal
  - CTA: "Proceed to Checkout" → redirects to `cart.checkoutUrl` (Shopify hosted checkout)
  - Secondary: "Continue Shopping" → closes drawer
- Empty state: "Your cart is empty" + "Shop the Collection" link
- Do not build a custom checkout page — Shopify handles this

### Checkout
- User is redirected to `checkoutUrl` from the cart object
- Shopify's hosted checkout handles payment, address, confirmation
- Style is limited on Basic plan — client can customize via Shopify Admin → Checkout branding

---

## PHASE 12 — METAFIELD SETUP (do this in Shopify Admin)

Before the frontend can display body type data, set this up:

1. Shopify Admin → **Settings → Custom data → Products → Add definition**
2. Name: `Body Types`
3. Namespace & key: `sbg.body_types`
4. Type: `List of single-line text`
5. Go to the product "One for All Dress" → scroll to Metafields → add values: `All Body Types`, `Pear`, `Hourglass`, `Rectangle`, `Inverted Triangle`, `Apple`

The frontend reads this as:
```ts
const bodyTypes: string[] = JSON.parse(product.metafield?.value ?? '[]')
```

---

## PHASE 13 — PERFORMANCE & SEO

### Image optimization
- All product images through `next/image` with `priority` on hero and first product image
- Set `sizes` prop correctly per breakpoint
- Use Shopify CDN URLs directly (they support query param resizing: `?width=800`)

### Metadata (`src/app/[page]/page.tsx`)
Each page exports a `generateMetadata` function:
```ts
export const metadata: Metadata = {
  title: 'The One for All Dress | Styled by Gloria',
  description: 'A dress designed for every body type. Shop SBG-D001 in black, red, and baby blue.',
  openGraph: {
    images: [{ url: '/og-image.jpg' }]
  }
}
```

### ISR (Incremental Static Regeneration)
- Product pages: `revalidate: 60` (refresh every 60 seconds from Shopify)
- Static pages (About, Contact, Services): `revalidate: 3600`

---

## PHASE 14 — DEPLOYMENT

### Vercel setup
```bash
npm install -g vercel
vercel login
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
- `RESEND_API_KEY`

### Custom domain
- In Vercel: Project → Settings → Domains → add `styledbygloria.com`
- In Shopify Admin: Online Store → Domains → set primary domain to your custom domain (if using Shopify for anything) OR point DNS to Vercel

---

## FILE STRUCTURE (final)

```
sbg-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, nav, footer, CartProvider
│   │   ├── page.tsx                # Homepage
│   │   ├── shop/
│   │   │   ├── page.tsx            # Collections / All Products
│   │   │   └── [handle]/
│   │   │       └── page.tsx        # Product Detail Page
│   │   ├── services/
│   │   │   └── page.tsx            # Styling Services
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── returns/page.tsx
│   │   ├── shipping/page.tsx
│   │   ├── not-found.tsx
│   │   └── api/
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MissionSection.tsx
│   │   │   ├── FeaturedProductSection.tsx
│   │   │   ├── DifferenceSection.tsx
│   │   │   └── ServicesTeaserSection.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ImageGallery.tsx
│   │   │   ├── VariantSelector.tsx
│   │   │   ├── SizeSelector.tsx
│   │   │   ├── SizeGuideModal.tsx
│   │   │   ├── BodyTypeTags.tsx
│   │   │   └── AddToCartButton.tsx
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Accordion.tsx
│   │       └── Badge.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── lib/
│   │   ├── shopify.ts              # API client + fetch wrapper
│   │   ├── queries.ts              # All GraphQL queries/mutations
│   │   └── utils.ts                # formatPrice, cn(), etc.
│   └── types/
│       └── shopify.ts              # TypeScript types for Shopify API responses
├── public/
│   └── images/                     # placeholder images
├── .env.local
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## BUILD ORDER (follow this sequence)

1. ✅ Phase 1 — Scaffold + Tailwind config + fonts
2. ✅ Phase 2 — Shopify API client + all queries/mutations
3. ✅ Phase 3 — Header, Footer, CartContext, root layout
4. ✅ Phase 13 — Metadata + ISR setup (do this early, not last)
5. ✅ Phase 6 — Product Detail Page (core commerce experience)
6. ✅ Phase 11 — Cart drawer + checkout redirect
7. ✅ Phase 4 — Homepage (all 5 sections)
8. ✅ Phase 5 — Shop / Collections page
9. ✅ Phase 7 — Styling Services page
10. ✅ Phase 8 — About page
11. ✅ Phase 9 — Contact page + API route
12. ✅ Phase 10 — 404 + policy pages
13. ✅ Phase 12 — Metafield setup in Shopify Admin (do alongside PDP)
14. ✅ Phase 14 — Deploy to Vercel

---

## NOTES FOR CLAUDE CODE

- Build one phase at a time. Complete and verify each phase before moving to the next.
- All copy marked "client supplies" should use clearly labeled placeholder text — wrap in `{/* CLIENT COPY */}` comments.
- Do not hardcode prices on the services page — prices are intentionally hidden per client brief.
- The "You May Also Like" section on PDP must be conditionally rendered — skip if product count ≤ 1.
- Never use Inter, Arial, Roboto, or system-ui as the font choice.
- All Shopify checkout happens at Shopify's hosted URL — do not attempt to build a custom `/checkout` page.
- Mobile-first CSS: write Tailwind base classes for mobile, use `md:` and `lg:` prefixes for desktop.
- Every interactive element (buttons, swatches, filters) must have a clear hover + focus state.
- Run `npm run build` and fix all TypeScript errors before considering a phase complete.