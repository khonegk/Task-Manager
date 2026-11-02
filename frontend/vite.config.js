import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // подключаем React
  server: { port: 5173 }, // порт клиента
});
