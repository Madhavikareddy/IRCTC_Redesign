import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          light: "#818CF8",
          dark: "#3730A3",
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#4F46E5",
          600: "#4338CA",
          700: "#3730A3",
          900: "#1E1B4B",
        },
        accent: {
          DEFAULT: "#06B6D4",
          light: "#ECFEFF",
          dark: "#0891B2",
        },
        orange: {
          DEFAULT: "#F97316",
          light: "#FFF7ED",
          dark: "#EA580C",
        },
        emerald: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
          dark: "#059669",
        },
        rose: {
          DEFAULT: "#F43F5E",
          light: "#FFF1F2",
          dark: "#E11D48",
        },
        amber: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
          dark: "#D97706",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          raised: "#FFFFFF",
          overlay: "rgba(15, 23, 42, 0.6)",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          tertiary: "#94A3B8",
          inverse: "#FFFFFF",
        },
        border: {
          DEFAULT: "#E2E8F0",
          light: "#F1F5F9",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FEF2F2",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FFFBEB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        "card-hover": "0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
        "card-colored": "0 4px 14px rgba(79,70,229,0.15)",
        glow: "0 0 20px rgba(79,70,229,0.2)",
        "glow-accent": "0 0 20px rgba(6,182,212,0.2)",
        sheet: "0 -4px 30px rgba(0,0,0,0.15)",
        xl: "0 20px 50px rgba(0,0,0,0.12)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        "gradient-accent": "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
        "gradient-warm": "linear-gradient(135deg, #F97316 0%, #F43F5E 100%)",
        "gradient-success": "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
        "gradient-hero": "linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #7C3AED 100%)",
        "gradient-card": "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
        "gradient-subtle": "linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
