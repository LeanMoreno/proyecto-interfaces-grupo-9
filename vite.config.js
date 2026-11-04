import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/proyecto-interfaces-grupo-9/",
  server: {
    host: true,
  },
});
