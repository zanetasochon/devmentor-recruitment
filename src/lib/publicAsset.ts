/** Ścieżki do plików z `public/` z uwzględnieniem `import.meta.env.BASE_URL` (GitHub Pages pod `/repo/`). */
export function publicAsset(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
