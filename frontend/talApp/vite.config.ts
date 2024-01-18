import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://127.0.0.1:8000/api/",
      // shorthand: http://localhost:5173/api -> http://localhost:4567/api            '/api':'http://localhost:8800'
    },
  },
});
