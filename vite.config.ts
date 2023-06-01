import { defineConfig } from "vite";
import url from "url";
import react from "@vitejs/plugin-react-swc";
import ssr from "vite-plugin-ssr/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      "#root": url.fileURLToPath(new URL(".", import.meta.url)),
    },
  },
});
