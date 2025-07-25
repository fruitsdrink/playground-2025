import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import AppLoading from "vite-plugin-app-loading";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), AppLoading("loading.html")],
});
