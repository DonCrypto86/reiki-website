import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem"
      }
    },
    extend: {
      /**
       * Farbschema laut Vorgabe (5 Töne): #fffcf8, #1e180d, #dfbd9c,
       * #bd8274, #fbf4e0. Daraus abgeleitete Zwischen-/Randtöne (z. B.
       * beige.dark, sage-Skala, forest.dark) sind Abstufungen derselben
       * Grundfarben, damit Karten, Rahmen und Icon-Akzente sich weiterhin
       * konsistent absetzen. Klassennamen bleiben unverändert.
       */
      colors: {
        cream: {
          DEFAULT: "#FBF4E0",
          light: "#FFFCF8"
        },
        beige: {
          DEFAULT: "#DFBD9C",
          dark: "#CBA37A"
        },
        /** Icon-/Text-Akzente: Abstufungen des Terracottatons #bd8274. */
        sage: {
          50: "#F7ECE7",
          100: "#EED9D1",
          200: "#DCB6A9",
          300: "#C99A89",
          400: "#BD8274",
          500: "#9A6858",
          600: "#6E473D",
          700: "#54362E",
          800: "#3B2620",
          900: "#241713"
        },
        /** Überschriften & Hauptfarbe: exakt #1e180d aus der Vorgabe. */
        forest: {
          DEFAULT: "#1E180D",
          dark: "#120D07"
        },
        /** Hauptakzent: exakt #bd8274 aus der Vorgabe. */
        terracotta: {
          DEFAULT: "#BD8274",
          light: "#D3A79C",
          dark: "#9C5F52"
        },
        /** Fließtext: exakt #1e180d, hellere Abstufung für Sekundärtext. */
        ink: {
          DEFAULT: "#1E180D",
          light: "#6B5C48"
        }
      },
      fontFamily: {
        serif: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      maxWidth: {
        prose: "68ch"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      boxShadow: {
        soft: "0 4px 24px rgba(30, 24, 13, 0.10)"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
