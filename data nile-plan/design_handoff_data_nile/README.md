# Handoff: Data Nile — Landing + Admin Console

## Overview
Data Nile is a two-sided platform that connects growing companies with vetted data analysts. This handoff covers two surfaces:

1. **Public landing page** (`Data Nile.html`) — hero slider, About, Video, Services grid, Connect contact modal, footer.
2. **Admin console** (`Data Nile Admin.html`) — password-gated back-office for managing landing content, images, theme colors, inbox invites, and credentials.

The two surfaces are linked: everything editable in the admin is reflected on the landing page in real time.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look, content structure, and behavior. They are NOT production code to copy-paste.

Your job is to **recreate these designs inside the target codebase's existing environment** (React, Vue, Next.js, Laravel blade, etc.) using its established conventions, state management, routing, and styling system — or, if no environment exists yet, to choose the best-fit stack and implement there.

The HTML files use vanilla React + inline Babel only because that's what the design tool supports. Do not ship them.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate pixel-for-pixel using the codebase's existing component library and design tokens; if those don't exist, introduce the tokens listed below as the seed of a new system.

---

## Design Tokens

### Colors (OKLCH — convert to your color system)
| Token | OKLCH | Approx HEX | Use |
|---|---|---|---|
| `--nile-deep` | oklch(0.32 0.07 235) | `#1e3a5f` | Primary brand, deep water |
| `--nile-mid` | oklch(0.48 0.09 225) | `#3d6b94` | Gradient mid-tone |
| `--nile-teal` | oklch(0.62 0.08 195) | — | Gradient accent |
| `--reed` | oklch(0.55 0.10 150) | `#4a8a5f` | Success, positive data |
| `--gold` | oklch(0.76 0.12 75) | `#d4a847` | CTA accents, gold-standard |
| `--terracotta` | oklch(0.58 0.12 45) | `#c06a47` | Destructive, errors, italic emphasis |
| `--sand` | oklch(0.94 0.025 82) | `#f2ebde` | Page background |
| `--sand-2` | oklch(0.89 0.035 80) | `#e6dbc3` | Alternating section background |
| `--paper` | oklch(0.97 0.015 82) | `#f9f4ea` | Card surfaces |
| `--ink` | oklch(0.20 0.018 250) | `#1f2636` | Primary text, dark bands |
| `--ink-2` | oklch(0.38 0.018 250) | `#4e5566` | Secondary text |
| `--ink-3` | oklch(0.55 0.012 250) | `#7c8090` | Tertiary, meta, mono labels |
| `--line` | oklch(0.82 0.02 80) | `#d4ccba` | Borders |
| `--line-soft` | oklch(0.88 0.015 80) | `#e0d9c6` | Soft separators |

### Typography
- **Display**: `Fraunces` (Google Fonts) — opsz 9..144, weights 300/400/500/600. Used at weight **300** for all headings (letter-spacing -0.025em on large, -0.015em on small). Italic of display is used for accent words in headlines (e.g., *ranked by fit.*).
- **Sans**: `Geist` (Google Fonts) — weights 300/400/500/600/700. Body, buttons, inputs.
- **Mono**: `Geist Mono` — weights 400/500/600. Kickers, meta labels, data, timestamps. Always `letter-spacing: 0.1–0.18em`, `text-transform: uppercase`, sizes 10–12px.

Type scale: headings `clamp(32–88px)` (300 weight), body `15–18px`, meta `10.5–12px`.

### Spacing & Layout
- Section vertical padding: `clamp(60–120px)`
- Section horizontal padding: `clamp(24–64px)`
- Max content width: `1280px`, centered
- Card padding: `28px`
- Border radius scale: `8` (inputs), `10` (small cards), `14` (cards), `16` (modals), `var(--radius-l) = 20` (large panels)

### Shadows
- Soft lift: `0 20px 50px -20px rgba(20,30,50,0.25)`
- Modal: `0 30px 80px -20px rgba(0,0,0,0.4)`
- Hero visual: `0 30px 80px -30px rgba(20,30,50,0.35)`

### Motion
- Hover lift: `transform: translateY(-1px)`, `transition .15s`
- Page transitions: `fadeUp .7s ease`, `fadeIn .25s ease`
- Hero cards float: `floaty 8s ease-in-out infinite` (translateY 0 ↔ -8px)
- Slider auto-advance: every 6500ms

---

## Screens

### 1. Landing — `/`

#### Nav
Sticky top, `88% sand` background with `backdrop-filter: blur(10px)`. Logo (river-wave SVG) + wordmark on left, links (Home, About, Services, Contact) centered, "Connect" primary button on right.

#### Hero Slider (`#home`)
Two-column layout at 1280 max width.
- Left: kicker (mono, colored per slide), display headline (clamp 44–88px, weight 300), subtitle (18px ink-2), two buttons (Connect primary, Learn more secondary), slide dots.
- Right: 3 stacked "analyst cards" floating with staggered rotation (-3°, 2°, -1°) and `floaty` animation. Each card shows avatar initial, name, title, hourly rate, 3 skill tags.
- Background: `<NileFlow>` canvas — flowing sine-wave lines in nile-deep/teal/gold, 3 layers, `opacity 0.3`.
- 3 slides, auto-advance 6.5s, manual dots. Headline 2 and 3 contain italic accent words in terracotta/reed.

#### About (`#about`)
`sand-2` background. Two-col: left sticky kicker + pull-quote in Fraunces italic (`"The river doesn't hurry, yet it arrives."`), right column with title, description paragraph, 3-stat row (2,400+ analysts, 94% retention, 3.2 days time-to-hire) with 32px display numbers.

#### Video section
`sand` background, 16:8.5 hero card with linear gradient `135deg, nile-deep → nile-mid → nile-teal`. Overlay: NileFlow, circular play button (84px, glass effect), mono meta ("Our story · 2 min"), display headline.

#### Services (`#services`)
`sand-2` background. 4-up grid of service cells inside a paper-background bordered container. Each cell: mono index (01, 02…), 24px display title, 14px description. Hover swaps cell background to `sand`.

#### Contact band (`#connect`)
Dark `--ink` background with NileFlow overlay. Two-col: left gold kicker + display headline ("Your data team is three clicks away."), right-aligned gold CTA button.

#### Footer
`sand` background, logo + wordmark + copyright on left, mono link to Admin on right.

#### Connect Modal
Triggered by any Connect button. Full-screen overlay (`rgba(20,20,30,0.55)` with blur). 540px paper card with header (mono kicker + display "Let's flow together."), form driven by the admin-editable `contactForm` schema. Success state: green check circle + "Downstream." + auto-close after 1.8s. Submission appends to invites store.

---

### 2. Admin — `/admin`

#### Password gate
Centered 420px paper card on `sand-2`. Logo + "Data Nile · Admin" wordmark, mono kicker "Password required", display prompt. Password input — demo password `datanile` (replace with real auth). On wrong password, border turns terracotta for 2s.

Session stored in `sessionStorage['datanile_auth'] = '1'`.

#### Shell layout
260px dark (`--ink`) sidebar + flex-1 content area on `sand-2`.

Sidebar items (each: icon + label; active has gold left-border, gold text, `rgba(255,255,255,0.08)` bg):
1. **Manage Home Page** — Database icon
2. **Manage Images** — Pyramid icon
3. **Manage Layout** — Sun icon
4. **Invites** — Bell icon
5. **Reset Password** — Shield icon

Sidebar footer: "Log out" button (clears auth), "view landing" external link.

#### Manage Home Page
Stack of cards for Hero / About / Our Services / Contact form fields. Each card has a sub-header with title + "Save changes" button. Fields use mono uppercase labels, sand-colored inputs. Services list supports add/remove rows. Contact-form builder supports 3 field types (input / textarea / dropdown) with comma-separated options for selects.

#### Manage Images
2-col grid of category cards (Slider, Gallery, Stored photos, Logos). Each card has a dashed drop-zone (hover → nile-tinted bg + border) and a 4-up thumbnail grid below with gradient placeholders.

#### Manage Layout
Palette picker. One row per token (`--nile-deep`, `--terracotta`, `--reed`, `--gold`, `--sand`, `--ink`). Each row shows: left label + current value (mono), right 5 swatch circles + a "custom" color picker. Active swatch has ink ring. Selections persist to `localStorage['datanile_theme']` and apply instantly via CSS custom properties on `:root`. Preview card at bottom shows nile-deep hero + 4 token tiles.

#### Invites
Two-col: inbox list + detail pane.
- List (1.3fr): live count header, items show name (bold 14.5px), email, truncated message (2 lines), role/budget tags. Click selects; selected has `sand` background.
- Detail (1fr): full invite view with all fields as label/value pairs, Reply (primary) + Delete (terracotta) actions.
- Submissions come from the landing's Connect form via the shared store.

#### Reset Password
500px card, two password inputs, validation (both required, must match, ≥6 chars). Error in terracotta mono. Success toast on submit.

#### Toast
Fixed bottom-right. Dark `--ink` pill with green-check circle for OK, terracotta for error. `slideInR .3s` entry, auto-dismiss 2.4s.

---

## State & Data

### Shared store (maps to backend resources)
```ts
{
  heroTitle: string
  heroSub: string
  about: { title: string; description: string }
  services: { title: string; items: { t: string; d: string }[] }
  contactForm: FormField[]       // field schema for the Connect modal
  invites: Invite[]              // submissions from Connect form
}

type FormField =
  | { id: string; type: 'input' | 'textarea'; label: string; value: [''] }
  | { id: string; type: 'select'; label: string; value: string[] /* options */ }

type Invite = {
  id: string
  at: string                     // relative time
  name?: string
  email?: string
  role?: string                  // from dropdown
  budget?: string                // from dropdown
  msg?: string
  [customFieldId: string]: any   // any additional admin-configured field
}
```

In the prototype this lives in `localStorage['datanile_content_v1']` under key `STORE_KEY`. **In production, replace with your ORM/API**:
- `GET /api/site-content` → `{ heroTitle, heroSub, about, services, contactForm }`
- `PATCH /api/site-content` (admin only)
- `POST /api/invites` (public, from Connect form)
- `GET /api/invites` (admin only)
- `DELETE /api/invites/:id` (admin only)
- Theme is admin-only: `PATCH /api/theme` with `Record<token, oklchString>`

### Auth
Prototype uses a hardcoded `datanile` password + sessionStorage flag. Replace with real auth (JWT / session cookie / Clerk / NextAuth / Laravel session). Reset-Password screen should hit `POST /api/admin/password`.

### Real-time sync
Prototype uses `window.dispatchEvent('datanile:content')` + `storage` event across tabs. Production options: SWR/React Query auto-revalidation, WebSocket, or server-sent events.

---

## Interactions checklist

- [ ] Nav sticky with blur-backdrop; smooth-scroll anchors work (html { scroll-behavior: smooth })
- [ ] Hero slider: auto-advances every 6.5s, dots clickable, headline fades up on change
- [ ] Hero floating cards: `floaty` animation with staggered delays
- [ ] Connect button anywhere → opens modal
- [ ] Connect form: renders from `contactForm` schema, submit appends to invites with `at: 'just now'`, shows success state, closes after 1.8s
- [ ] Services cells: hover swaps background
- [ ] Video play button: hover scales 1.08, background lightens
- [ ] Admin password gate: wrong PW flashes terracotta border, correct PW sets sessionStorage
- [ ] Sidebar: active state has gold left-border; persist active section in localStorage
- [ ] Manage Home: each sub-section has independent Save; toast confirmation
- [ ] Manage Layout: swatch click updates CSS custom property on `:root` AND landing page
- [ ] Invites: click row → detail; Delete removes; empty state copy present
- [ ] Reset Password: inline validation errors, toast on success
- [ ] Toast: slides in from right, auto-dismisses 2.4s

---

## NileFlow background
Canvas-based animated SVG/HTML used in hero, video gradient, contact band. Draws 3 sine-wave paths at different phases/speeds in nile-deep / nile-teal / gold. See `app/components.jsx` in the design files for the exact implementation — recreate it as a reusable component with `speed` and `opacity` props.

---

## Icons
Custom inline SVG icons at 10–22px stroke-width ~1.5px. Never emoji. Set: Arrow, Check, Close, Plus, Wave, External, Dot, Search, Filter, Database, Pyramid, Sun, Bell, Shield. If the codebase uses Lucide / Phosphor / Heroicons, swap to those but keep the 1.5px stroke aesthetic.

---

## Assets needed from the client

The design uses **zero stock imagery** by default — all cards and visuals are composed in CSS/SVG. When the client has assets, feed these slots:
- Hero slider: up to 3 full-bleed background images (fallback: gradient + NileFlow)
- About: optional inset image next to stats
- Video: poster frame for the play card
- Services cells: optional 64px icons per service
- Gallery: any number of 4:3 project shots

---

## Files in this bundle

| File | Role |
|---|---|
| `Data Nile.html` | Landing page entry |
| `Data Nile Admin.html` | Admin console entry |
| `app/main.jsx` | Landing page root / global styles |
| `app/admin.jsx` | Full admin console (all sections) |
| `app/landing.jsx` | Landing sections (Nav, Hero, About, Video, Services, ContactModal, ContactBand, Footer) |
| `app/components.jsx` | Shared: Btn, Tag, Avatar, NileFlow, small primitives |
| `app/icons.jsx` | SVG icon set |
| `app/data.jsx` | Seed data (ANALYSTS, industries, etc.) |
| `app/store.jsx` | Shared content store + React hook |

Open the two `.html` files to see the designs running. The `.jsx` files are the source and document the exact component structure.

---

## A note on brand tone

Data Nile leans into its name — flowing water, pyramid geometry, sand/ink/gold palette — without being literal or kitschy. Keep that discipline: italic accent words in headlines, mono kickers with short horizontal dashes, display numerals for stats. Avoid emoji. Avoid AI-gradient tropes (rainbow meshes, purple-pink-orange blobs). The Nile deep-blue + terracotta + reed-green + gold four-note palette is the whole song.
