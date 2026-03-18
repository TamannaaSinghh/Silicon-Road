# Silicon Road VC Clone

A pixel-perfect clone of https://www.siliconroad.vc/ built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- ✅ Light theme only (no dark mode)
- ✅ Responsive design with exact spacing
- ✅ Smooth animations with Framer Motion
- ✅ Portfolio showing only OneStack
- ✅ Team members: Sid Mookerji, Ajay Mahajan, Gaurav Thakkar, Deeksha Narendra Kumar
- ✅ Blog and Newsletter redirects to original site
- ✅ Clean Next.js architecture

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  layout.tsx      - Root layout
  page.tsx        - Homepage
  /blog          - Blog redirect
  /newsletter    - Newsletter redirect

/components
  Navbar.tsx
  Footer.tsx

/sections
  Hero.tsx
  About.tsx
  Portfolio.tsx
  Team.tsx

/data
  team.ts
  portfolio.ts

/public
  /images
  /vids
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **TypeScript** - Type safety

## Design System

### Colors
- Background: `#FFFFFF`
- Text: `#0A0A0A`
- Secondary Text: `#555555`
- Border: `#EAEAEA`

### Typography
- Heading: `text-[64px] font-semibold tracking-[-1px]`
- Subheading: `text-[40px] font-semibold`
- Body: `text-[16px] leading-[26px]`

## License

MIT
