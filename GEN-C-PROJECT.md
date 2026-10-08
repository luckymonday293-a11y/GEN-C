# GEN C — Project Documentation
**Internal source of truth. Read this first before making any changes.**

---

## Product Summary

**GEN C** is a fintech product built around: **Hold → Receive → Send → Exchange → Save**

The brand communicates **trust, simplicity, control, modern banking, professionalism**.

---

## Current Phase

**Phase 1 — CORE** (In Progress)

---

## Completed Pages

| Page | File | Status |
|------|------|--------|
| Landing Page | `index.html` | ✅ Complete |
| Login | `login.html` | ✅ Complete |
| Sign Up | `signup.html` | ✅ Complete |
| OTP Verification | `otp.html` | ✅ Complete |
| Account Created | `account-created.html` | ✅ Complete |
| Dashboard | `dashboard.html` | ✅ Complete |
| Accounts | `accounts.html` | ✅ Complete |
| Transactions | `transactions.html` | ✅ Complete |
| Forgot Password | `forgot-password.html` | ✅ Complete |

---

## Phase Roadmap

### Phase 1 — CORE ✅
1. Landing Page
2. Login
3. Sign Up
4. OTP Verification
5. Account Created
6. Dashboard
7. Accounts
8. Transactions

### Phase 2 — MONEY (Next)
9. Send / Transfer
10. Receive
11. Exchange
12. Savings

### Phase 3 — ACCOUNT (Future)
13. Profile
14. Security / Settings
15. Notifications
16. Cards

---

## Design System

### File Location
`assets/css/design-system.css`

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#2563EB` | Primary actions, active nav, links |
| `--color-primary-dark` | `#1D4ED8` | Hover states |
| `--color-primary-light` | `#EFF6FF` | Icon backgrounds, active nav bg |
| `--color-dark-navy` | `#0F172A` | Brand panel, balance card bg |
| `--color-bg` | `#F8FAFC` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, panels |
| `--color-text` | `#0F172A` | Primary text |
| `--color-text-muted` | `#64748B` | Secondary text |
| `--color-text-subtle` | `#94A3B8` | Placeholder, very secondary |
| `--color-border` | `#E2E8F0` | Borders, dividers |
| `--color-success` | `#16A34A` | Success states |
| `--color-error` | `#DC2626` | Error states |
| `--color-warning` | `#F59E0B` | Warning/pending states |

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: 48-64px hero → 32px page heading → 24px section → 18px card → 15-16px body → 13-14px supporting
- **Financial numbers**: 24-36px depending on context

### Icons
- **Library**: Lucide Icons (`https://unpkg.com/lucide@latest`)
- **Standard usage**: `lucide.createIcons()` after DOMContentLoaded
- Key mappings:
  - Accounts → `Wallet`
  - Transfers → `ArrowLeftRight`
  - Exchange → `RefreshCw`
  - Transactions → `Receipt`
  - Cards → `CreditCard`
  - Notifications → `Bell`
  - Profile → `User`
  - Security → `ShieldCheck`
  - Logout → `LogOut`
  - Fund → `ArrowDownToLine`
  - Withdraw → `ArrowUpFromLine`

---

## Demo User Data

| Field | Value |
|-------|-------|
| Name | Lucky Weng |
| Email | lucky@genc.app |
| Account Number | `1029 ••• 4756` |
| Status | Active |
| NGN Balance | ₦250,000.00 |
| USD Balance | $500.00 |
| Savings Balance | ₦75,000.00 |
| Savings Goal | ₦125,000.00 |
| Interest Earned | ₦892.50 |

---

## Architecture Decisions

### Tech Stack
- **Pure HTML/CSS/JS** — no build tools, no frameworks, no dependencies beyond:
  - Google Fonts (Inter)
  - Lucide Icons (CDN)
- Reasoning: Maximum portability, no Node.js required, works by opening files directly

### File Structure
```
FINTECH/
├── index.html              (Landing Page)
├── login.html              (Login)
├── signup.html             (Sign Up)
├── otp.html                (OTP Verification)
├── account-created.html    (Account Created)
├── forgot-password.html    (Forgot Password)
├── dashboard.html          (Dashboard)
├── accounts.html           (Accounts)
├── transactions.html       (Transactions)
├── assets/
│   └── css/
│       └── design-system.css  (Core Design System)
└── GEN-C-PROJECT.md        (This file)
```

### App Shell Layout
- **Desktop (768px+)**: Fixed 256px left sidebar + main content area
- **Mobile (<768px)**: Hidden sidebar, sticky top header, fixed bottom tab nav
- Bottom nav max 5 tabs on mobile

### Authentication Flow
```
Landing Page
  ↓ Get Started
Sign Up → OTP Verification → Account Created → Dashboard
  ↓ Log In
Login → Dashboard
  ↓ Forgot Password
Forgot Password → Reset → Login
```

> ⚠️ Phone number ≠ Account number. Backend generates account numbers.

### Financial Number Display
- Always show exact currency with its own symbol
- USD equivalent is a REFERENCE — label it clearly as "≈ X USD equivalent"
- Never mix actual balances with conversions
- Format: `₦250,000.00` / `$500.00`

### Transaction References
- Format: `GC-YYYYMMDD-NNNNNN` (e.g., `GC-20261008-829374`)

### KYC
- Status: `not_started | pending | approved | rejected`
- Demo shows `pending`
- KYC does not block initial signup

---

## Component Library (in design-system.css)

| Component | Class(es) |
|-----------|-----------|
| Button | `.btn .btn--primary .btn--secondary .btn--ghost .btn--danger .btn--sm .btn--lg .btn--full .btn--icon` |
| Form | `.form-group .form-label .form-input .form-select .form-error .form-help` |
| Card | `.card .card--elevated .card--flat` |
| Badge | `.badge .badge--success .badge--error .badge--warning .badge--info .badge--neutral` |
| Alert | `.alert .alert--success .alert--error .alert--warning .alert--info` |
| OTP | `.otp-group .otp-input` |
| App Shell | `.app-shell .app-nav .app-main` |
| Nav | `.nav-logo .nav-section .nav-item .nav-item.active .nav-bottom` |
| Mobile Nav | `.mobile-header .mobile-bottom-nav .mobile-nav-tab` |
| Page | `.page-header .page-content` |
| Transaction | `.transaction-item .transaction-icon .transaction-info .transaction-amount` |
| Auth Layout | `.auth-layout .auth-panel .auth-panel--brand .auth-form-container` |
| Balance | `.balance-amount .balance-label` |
| Quick Action | `.quick-action .quick-action__icon .quick-action__label` |

---

## Approved Design Decisions

1. **No glassmorphism** — banned from the GEN C design language
2. **No fake statistics** — no invented user counts, transaction volumes, or interest rates
3. **No stock photography** — the product UI is the visual identity
4. **No excessive gradients** — solid colors preferred
5. **No crypto, loans, investments, insurance** on the dashboard
6. **Balance card**: Dark navy background on main balance card (feels premium, high contrast)
7. **OTP inputs**: Individual character inputs, 6 digits, not a single text field
8. **Pending transactions**: Always shown with color + icon + text (not color alone)
9. **USD equivalent**: Always labeled with "≈" and "equivalent" — never presented as actual balance
10. **Typography**: Inter exclusively — no serif, no display fonts
11. **Animations**: Subtle transitions only (150-300ms) — no entrance animations on cards

---

## Known Issues / Future Work

- [ ] Phase 2 pages (Send, Receive, Exchange, Savings) not yet built
- [ ] Phase 3 pages (Profile, Security, Notifications, Cards) not yet built
- [ ] No real backend — all data is hardcoded prototype data
- [ ] Mobile nav drawer needs gesture/swipe support (future enhancement)
- [ ] Filter functionality on Transactions page is client-side only

---

## Things That Must NOT Change

- The GEN C color palette (do not add new primary colors without clear reason)
- The Inter font — do not substitute
- The Lucide icon library — do not mix icon libraries
- The demo user: **Lucky Weng**, account `1029 •••• 4756`
- The brand name: **GEN C** (not "GenC", not "gen-c", not "Gentle + Steeze" as UI label)
- The `design-system.css` design tokens — extend only, do not redefine
- The app shell layout structure (sidebar + main)
- Financial number formatting standards

---

## For Future AI Models

If you are a new AI model working on this project:

1. **Read this file first** — it is the source of truth
2. **Inspect existing files** before making any changes
3. **Do not rebuild from scratch** — extend the existing system
4. **Do not introduce a new design system** — use `design-system.css`
5. **Do not change brand identity** — colors, font, icon library are locked
6. **Reuse existing components** from `design-system.css`
7. **Link the design system** in every HTML page: `<link rel='stylesheet' href='assets/css/design-system.css'>`
8. **Check the current phase** and only build what is requested
9. **Match the sidebar nav** in every app page (see dashboard.html as reference)
10. **Do not invent fake data** — use the demo user data defined in this file

---

*Last updated: October 8, 2026 — Phase 1 completed*
