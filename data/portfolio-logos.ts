export type PortfolioItem = {
  name: string;
  tagline: string;
  logo: string;
  category: string;
};

export const categories = [
  "all",
  "Multi-Channel Commerce",
  "Supply Chain & Logistics",
  "Retail Tech",
  "Foundational",
  "FinTech & Payments",
  "AI-powered insights for enterprise",
  "Automated personalized email management",
];

export const portfolioLogos: PortfolioItem[] = [
  // ===== Multi-Channel Commerce =====
  {
    name: "Daash",
    tagline: "Predictive commerce intelligence.",
    logo: "/images/portfolio-logos/daash.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Qortex",
    tagline: "High-impact ads at the perfect moment.",
    logo: "/images/portfolio-logos/qortex.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Digiphy",
    tagline: "Contextual CPG marketing.",
    logo: "/images/portfolio-logos/digiphy.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Pivot",
    tagline: "Independent brand marketplace.",
    logo: "/images/portfolio-logos/pivot.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Makeswift",
    tagline: "Visually editable next.js sites.",
    logo: "/images/portfolio-logos/makeswift.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Westock",
    tagline: "1st party CPG sales data.",
    logo: "/images/portfolio-logos/westock.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Toucan AI",
    tagline: "AI-powered sales bot.",
    logo: "/images/portfolio-logos/toucan-ai.png",
    category: "Multi-Channel Commerce",
  },
  {
    name: "Rep",
    tagline: "Agentic customer service",
    logo: "/images/portfolio-logos/rep.png",
    category: "Multi-Channel Commerce",
  },

  // ===== Supply Chain & Logistics =====
  {
    name: "Tradeverifyd",
    tagline: "AI-powered supply chain traceability.",
    logo: "/images/portfolio-logos/tradeverifyd.png",
    category: "Supply Chain & Logistics",
  },
  {
    name: "Davinci",
    tagline: "Micro fulfillment as a service.",
    logo: "/images/portfolio-logos/davinci.png",
    category: "Supply Chain & Logistics",
  },
  {
    name: "LimeLoop",
    tagline: "Sustainable shipping.",
    logo: "/images/portfolio-logos/limeloop.png",
    category: "Supply Chain & Logistics",
  },
  {
    name: "Hammoq",
    tagline: "Making recommerce easy.",
    logo: "/images/portfolio-logos/hammoq.png",
    category: "Supply Chain & Logistics",
  },
  {
    name: "Pull Logic",
    tagline: "Retail inventory insights.",
    logo: "/images/portfolio-logos/pull-logic.png",
    category: "Supply Chain & Logistics",
  },
  {
    name: "SoftWear Automation",
    tagline: "Machine vision robotics.",
    logo: "/images/portfolio-logos/softwear-automation.png",
    category: "Supply Chain & Logistics",
  },

  // ===== Retail Tech =====
  {
    name: "Harmonya",
    tagline: "Product data, supercharged.",
    logo: "/images/portfolio-logos/harmonya.png",
    category: "Retail Tech",
  },
  {
    name: "Patron",
    tagline: "In-store customer intelligence.",
    logo: "/images/portfolio-logos/patron.png",
    category: "Retail Tech",
  },
  {
    name: "Perch",
    tagline: "Retail's shopper marketing platform.",
    logo: "/images/portfolio-logos/perch.png",
    category: "Retail Tech",
  },

  // ===== Foundational =====
  {
    name: "reef.ai",
    tagline: "AI-powered customer retention engine",
    logo: "/images/portfolio-logos/reef.png",
    category: "Foundational",
  },
  {
    name: "Pitchit",
    tagline: "AI-powered sales automation.",
    logo: "/images/portfolio-logos/pitchit.png",
    category: "Foundational",
  },
  {
    name: "Stridekick",
    tagline: "Integrated fitness intelligence.",
    logo: "/images/portfolio-logos/stride-kick.png",
    category: "Foundational",
  },
  {
    name: "MuukTest",
    tagline: "Effortless software testing.",
    logo: "/images/portfolio-logos/muuk-test.png",
    category: "Foundational",
  },
  {
    name: "SquarePeg",
    tagline: "Smart recruitment platform.",
    logo: "/images/portfolio-logos/square-peg.png",
    category: "Foundational",
  },
  {
    name: "knit",
    tagline: "AI-powered consumer insights.",
    logo: "/images/portfolio-logos/knit.png",
    category: "Foundational",
  },
  {
    name: "Wripple",
    tagline: "Creative talent marketplace.",
    logo: "/images/portfolio-logos/wripple.png",
    category: "Foundational",
  },
  {
    name: "Symtrain",
    tagline: "AI-powered employee coaching.",
    logo: "/images/portfolio-logos/symtrain.png",
    category: "Foundational",
  },
  {
    name: "Turn",
    tagline: "Autonomous talent acquisition.",
    logo: "/images/portfolio-logos/turn.png",
    category: "Foundational",
  },

  // ===== FinTech & Payments =====
  {
    name: "Harness",
    tagline: "Flexible credit card rewards.",
    logo: "/images/portfolio-logos/harness.png",
    category: "FinTech & Payments",
  },
  {
    name: "Everyware",
    tagline: "Text message payment platform.",
    logo: "/images/portfolio-logos/everyware.png",
    category: "FinTech & Payments",
  },

  // ===== AI-powered insights =====
  {
    name: "iGenie",
    tagline: "AI-powered insights for enterprise.",
    logo: "/images/portfolio-logos/i-cenie.png",
    category: "AI-powered insights for enterprise",
  },

  // ===== Email automation =====
  {
    name: "Grid & Pixel",
    tagline: "Automated personalized email marketing",
    logo: "/images/portfolio-logos/grid&pixel.png",
    category: "Automated personalized email management",
  },
];

// ===== Helper for "ALL" =====
export const getPortfolioByCategory = (category: string) => {
  if (category === "all") return portfolioLogos;
  return portfolioLogos.filter((item) => item.category === category);
};
