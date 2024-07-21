import type { Config } from "tailwindcss";
import * as Colors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textColor: {
        primary: Colors.indigo["500"],
        secondary: Colors.amber["500"],
        link: Colors.indigo["500"],
        btn: {
          onPrimary: "#fff",
          onSecondary: "#fff",
          onWarn: "#fff",
        },
      },
      backgroundColor: {
        btn: {
          primary: Colors.indigo["500"],
          secondary: Colors.amber["500"],
          warn: Colors.red["500"],
        },
      },
      borderColor: {
        input: Colors.indigo["500"],
      },
      outlineColor: {
        input: Colors.indigo["300"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
