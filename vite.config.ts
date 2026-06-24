import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const appRoot = path.resolve(__dirname, 'app')

// https://vite.dev/config/
export default defineConfig({
  root: appRoot,
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(appRoot, "./src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(appRoot, 'index.html'),
        admin: path.resolve(appRoot, 'admin.html'),
      },
    },
  },
});
