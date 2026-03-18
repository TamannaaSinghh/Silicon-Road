# 🚀 Silicon Road VC Clone (Exact Light Theme - Full Guide)

---

# 📌 Project Overview

This project is a **pixel-perfect clone** of
👉 https://www.siliconroad.vc/

Built using:

* Next.js (App Router)
* React.js
* Tailwind CSS
* Framer Motion

---

## 🎯 Custom Requirements

* Show ONLY these team members:

  * Sid Mookerji
  * Ajay Mahajan
  * Gaurav Thakkar
  * Deeksha Narendra Kumar

* Portfolio:

  * Only ONE company → https://www.onestack.in/
  * Visible ONLY on homepage

* Redirect:

  * `/blog` → original site
  * `/newsletter` → original site

* Theme:

  * ❗ STRICTLY LIGHT THEME (no dark mode)

---

# ⚙️ Installation

```bash
npx create-next-app@latest siliconroad-clone
cd siliconroad-clone

npm install
npm install tailwindcss postcss autoprefixer framer-motion
npx tailwindcss init -p
```

---

# ⚙️ Tailwind Config

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

# 🎨 Global Styles (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #ffffff;
  color: #0a0a0a;
  font-family: Inter, sans-serif;
}
```

---

# 📁 Folder Structure

```
/app
  layout.tsx
  page.tsx

  /blog
    page.tsx

  /newsletter
    page.tsx

/components
  Navbar.tsx
  Footer.tsx

/sections
  Hero.tsx
  About.tsx
  Portfolio.tsx
  Team.tsx

/data
  team.js
  portfolio.js

/public
  /images
  /vids
```

---

# 🧠 Design System (LIGHT ONLY)

## Colors

```
Background: #FFFFFF
Text: #0A0A0A
Secondary Text: #555555
Accent: #C9A96E
Border: #EAEAEA
```

## Typography

```
Heading:
text-[64px] font-semibold tracking-[-1px]

Paragraph:
text-[16px] leading-[26px]
```

---

# 🧩 DATA FILES

## `/data/team.js`

```js
export const team = [
  { name: "Sid Mookerji", role: "Founder" },
  { name: "Ajay Mahajan", role: "Partner" },
  { name: "Gaurav Thakkar", role: "Partner" },
  { name: "Deeksha Narendra Kumar", role: "Partner" }
];
```

---

## `/data/portfolio.js`

```js
export const portfolio = [
  {
    name: "OneStack",
    link: "https://www.onestack.in/",
    description: "Unified fintech infrastructure platform"
  }
];
```

---

# 🧱 COMPONENTS

---

## 🧭 Navbar

```jsx
"use client";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 bg-white/80 backdrop-blur-md border-b border-[#EAEAEA] z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-[80px] flex items-center justify-between">
        
        <div className="text-xl font-semibold">
          Silicon Road
        </div>

        <nav className="flex gap-8 text-sm">
          <a href="#about">About</a>
          <a href="#team">Team</a>

          <a href="/blog">Blog</a>
          <a href="/newsletter">Newsletter</a>
        </nav>
      </div>
    </header>
  );
}
```

---

## 🦸 Hero Section

```jsx
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[64px] font-semibold tracking-[-1px]">
          Backing the next generation of founders
        </h1>

        <p className="mt-6 text-[#555] text-[16px]">
          Early-stage venture capital firm
        </p>
      </motion.div>
    </section>
  );
}
```

---

## 📄 About Section

```jsx
export default function About() {
  return (
    <section id="about" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 gap-12">
        
        <div>
          <h2 className="text-[40px] font-semibold">
            About Us
          </h2>

          <p className="mt-6 text-[#555]">
            We invest in early-stage founders building impactful companies.
          </p>
        </div>

        <div></div>
      </div>
    </section>
  );
}
```

---

## 💼 Portfolio Section

```jsx
import { portfolio } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">

        <h2 className="text-[40px] font-semibold mb-10">
          Portfolio
        </h2>

        <div className="grid grid-cols-1">
          {portfolio.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              className="border border-[#EAEAEA] p-8 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">
                {item.name}
              </h3>

              <p className="text-[#555] mt-2">
                {item.description}
              </p>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
```

---

## 👥 Team Section

```jsx
import { team } from "@/data/team";

export default function Team() {
  return (
    <section id="team" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">

        <h2 className="text-[40px] font-semibold mb-10">
          Team
        </h2>

        <div className="grid grid-cols-2 gap-10">
          {team.map((member, i) => (
            <div key={i} className="border border-[#EAEAEA] p-6">
              <h3 className="font-semibold text-lg">
                {member.name}
              </h3>
              <p className="text-[#555] text-sm">
                {member.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

---

## 📌 Footer

```jsx
export default function Footer() {
  return (
    <footer className="py-10 border-t border-[#EAEAEA] text-center text-sm text-[#555]">
      © 2026 Silicon Road Clone
    </footer>
  );
}
```

---

# 🏠 MAIN PAGE (`page.tsx`)

```jsx
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Portfolio from "@/sections/Portfolio";
import Team from "@/sections/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Team />
      <Footer />
    </>
  );
}
```

---

# 🔁 REDIRECT PAGES

## `/app/blog/page.tsx`

```jsx
import { redirect } from "next/navigation";

export default function Blog() {
  redirect("https://www.siliconroad.vc/blog");
}
```

---

## `/app/newsletter/page.tsx`

```jsx
import { redirect } from "next/navigation";

export default function Newsletter() {
  redirect("https://www.siliconroad.vc/newsletter");
}
```

---

# 🎥 MEDIA USAGE

```jsx
<video autoPlay loop muted>
  <source src="/vids/hero.mp4" type="video/mp4" />
</video>
```

```jsx
import Image from "next/image";

<Image src="/images/img1.png" width={1200} height={800} />
```

---

# 🎯 EXACT CLONE RULES

* Match spacing EXACTLY
* Use inspect tool (Chrome DevTools)
* Copy:

  * font sizes
  * margins
  * paddings
  * grid layout

---

## 🔍 Recommended Tailwind Values

```
Container:
max-w-[1200px] mx-auto px-6

Section spacing:
py-[120px]

Heading:
text-[64px]

Subheading:
text-[40px]
```

---

# ⚠️ DO NOT

* ❌ Add dark mode
* ❌ Change layout
* ❌ Add extra sections
* ❌ Modify UI

---

# ✅ FINAL RESULT

* Pixel-perfect UI clone
* Light theme only
* Clean Next.js architecture
* Portfolio-ready project

---

# 💡 PRO TIP

Keep original website open side-by-side
→ Adjust until it looks IDENTICAL

---

🚀 DONE — You now have everything to build an exact clone.
