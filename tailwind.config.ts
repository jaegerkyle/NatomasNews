import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        muted: "#5a5a5a",
        line: "#e8e8e8",
        accent: "#1d4ed8",
        lane: "#f3f4f6"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      boxShadow: {
        subtle: "0 8px 24px rgba(0, 0, 0, 0.04)"
      }
    }
  },
  plugins: []
};

export default config;
