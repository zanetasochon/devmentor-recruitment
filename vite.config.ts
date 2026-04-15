import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Domyślnie `./` (Vercel, GitHub Pages z własną domeną i pod `/user/repo/`). Opcjonalnie: `VITE_BASE_URL=/<repo>/`. */
function resolveBase(): string {
  const raw = process.env.VITE_BASE_URL?.trim();
  if (!raw) return "./";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    /** Tylko localhost — stabilniejsze niż `host: true` przy VPN / firewallu. Z sieci LAN: `npm run dev -- --host`. */
    host: "localhost",
  },
});
