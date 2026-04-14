import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Lokalnie / Vercel: `./`; GitHub Actions ustawia `VITE_BASE_URL=/<nazwa-repo>/`. */
function resolveBase(): string {
  const raw = process.env.VITE_BASE_URL?.trim();
  if (!raw) return "./";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
});
