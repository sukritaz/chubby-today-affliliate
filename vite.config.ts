import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves a project repo under /<repo>/, so the production build
// needs that base. Dev server stays at "/".
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/chubby-today-affliliate/" : "/",
  plugins: [react(), tailwindcss()],
}));
