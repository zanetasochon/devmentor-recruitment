import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

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
    /**
     * Czeka aż zapis pliku się „ustabilizuje” — mniej błędów ECANCELED przy odczycie przez Vite
     * (wtedy w przeglądarce często widać 500 na module / @vite/client).
     */
    watch: {
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100,
      },
      /** `VITE_WATCH_POLL=1 npm run dev` — polling zamiast eventów FS (iCloud / problemy z ECANCELED). */
      ...(process.env.VITE_WATCH_POLL === "1"
        ? { usePolling: true, interval: 1000 }
        : {}),
    },
  },
});
