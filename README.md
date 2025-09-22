# Roxy Dry Cleaners – Web Booking Experience

Modern single-page experience for Roxy Dry Cleaners built with Next.js and Tailwind. It welcomes customers with animated visuals, highlights signature services, captures pickup bookings, and keeps communication just a tap away.

## Highlights
- Tailored hero animation and loader that set the brand tone from the first pixel
- Service spotlight cards, rotating testimonials, and trust badges to build confidence
- Full booking workflow with validation, success state, and WhatsApp escalation
- Call-to-action ribbons for callback requests, location map embed, and quick contact blocks
- Fully responsive layout designed for mobile-first browsing

## Tech Stack
- Next.js 13 + React 18 (TypeScript)
- Tailwind CSS for utility-first styling
- Framer Motion for micro-interactions and loader animation
- Lucide React icons for lightweight, consistent iconography

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ (ships with Node 18)

### Installation
```bash
npm install
```

### Run the development server
```bash
npm run dev
# visit http://localhost:3000
```

### Production build
```bash
npm run build
npm start
```

## Project Structure
```
src/
  components/ui/        # Reusable UI primitives (buttons, cards, etc.)
  lib/                  # Utility helpers
  pages/                # Next.js pages (index, booking API route, app shell)
public/                 # Static assets (favicons, images)
styles/                 # Global Tailwind entrypoint
```

## Customization Notes
- Update copy, phone numbers, and WhatsApp links in `src/pages/index.tsx`.
- Tailwind tokens can be tweaked through `tailwind.config.js`.
- Animations and loader behavior live alongside the landing page to streamline edits.

## Contributing & Maintenance
1. Branch off `main` for any feature or fix.
2. Run `npx tsc --noEmit` and `npm run build` before opening a PR.
3. Document customer-facing changes in commit messages or PR descriptions.

## Deployment
The app works out of the box on any Next.js-friendly platform (Vercel, Netlify, Render, etc.). Point the deploy target at the repo, set the build command to `npm run build`, and serve `npm start` (or the platform default).

---
Need help extending the experience? Reach out to the Roxy team or open an issue so we can iterate together.
