# Szybki audyt dostępności

Statyczny landing page (React + Mantine + Vite) pod lead magnet:

- formularz `URL + e-mail + zgody`,
- inline success/error bez osobnej strony `/thanks`,
- routing zgodny z GitHub Pages (`HashRouter`),
- deployment przez GitHub Actions.

## Stack

- `react`, `react-dom`
- `react-router-dom` (`HashRouter`)
- `@mantine/core`, `@mantine/form`, `@mantine/hooks`
- `vite`, `typescript`

## Konfiguracja Formspree

1. Załóż formularz w Formspree i skopiuj endpoint, np. `https://formspree.io/f/abcxyz`.
2. W pliku `src/components/audytForm.tsx` podmień:
   - `FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdarekl"`
3. Formularz wysyła pola:
   - `url`
   - `email`
   - `marketingConsent` (`true/false`)

## Uruchomienie lokalne

### npm

```bash
npm install
npm run dev
```

### pnpm

```bash
pnpm install
pnpm dev
```

### yarn

```bash
yarn
yarn dev
```

## Build

```bash
npm run build
```

Build trafia do katalogu `dist/`.

## Automatyczny check a11y

```bash
npm run a11y:axe
npm run a11y:lighthouse
npm run a11y:check
```

- `a11y:axe` uruchamia skan axe CLI dla `/#/` i `/#/privacy`.
- `a11y:lighthouse` uruchamia Lighthouse CI z progiem `accessibility >= 0.90`.
- `a11y:check` uruchamia domyślny check CI (`a11y:lighthouse`).
- Konfiguracja Lighthouse CI: `lighthouserc.json`.

## Deploy na GitHub Pages

Workflow: `.github/workflows/deploy-pages.yml` (build `dist/` i wdrożenie przez GitHub Actions).

**Ustawienia repozytorium (jednorazowo):**

1. **Settings → Pages → Build and deployment:** źródło **GitHub Actions** (nie „Deploy from a branch”).
2. Pierwszy push na `main` (albo **Actions → Deploy to GitHub Pages → Run workflow**) zbuduje projekt z `VITE_BASE_URL=/<nazwa-repo>/`, żeby zasoby z `public/` ładowały się pod adresem typu `https://<user>.github.io/<repo>/`.

**Lokalny test pod tą samą ścieżkę co Pages:**

```bash
VITE_BASE_URL=/devmentor-recruitment/ npm run build && npx vite preview
```

Podmień `devmentor-recruitment` na nazwę swojego repozytorium, jeśli jest inna.

## Deploy na Vercel

1. Zaloguj się na [vercel.com](https://vercel.com) i **Add New… → Project**.
2. **Import** repozytorium `devmentor-recruitment` z GitHuba (Vercel wykryje Vite).
3. Ustawienia domyślne są zwykle poprawne: **Build Command** `npm run build`, **Output** `dist` (możesz też polegać na pliku `vercel.json` w rootcie).
4. W **Environment Variables** możesz dodać opcjonalnie:
   - `VITE_RECRUITMENT_WEBHOOK_URL` — inny URL webhooka Make niż domyślny w kodzie (nadpisanie przy buildzie).
5. **Deploy**. Adres produkcyjny będzie miał postać `https://<projekt>.vercel.app`; trasy to `/#/`, `/#/rekrutacja`, `/#/audyt`, `/#/privacy` (HashRouter).

## Routing i base path

- Routing działa przez `HashRouter`, więc linki mają postać `/#/privacy` (na GitHub Pages: `https://…github.io/<repo>/#/privacy`).
- W `vite.config.ts` domyślnie `base: "./"` (Vercel, podgląd lokalny); workflow GitHub Pages ustawia `VITE_BASE_URL` na `/<nazwa-repo>/`. Obrazki i pliki z `public/` są łączone przez `publicAsset()` w `src/lib/publicAsset.ts`.
- Przy `BrowserRouter` trzeba by było dodać fallback SPA po stronie hosta; przy HashRouter nie jest to potrzebne.

## Analityka (placeholder)

W `src/lib/analytics.ts` są podstawowe eventy:

- `submit_attempt`
- `validation_error`
- `submit_success`
- `submit_fail`

Aktualnie eventy trafiają do `console.info`.  
W tym miejscu podłącz później GA4 / Matomo (PIWIK), pamiętając aby nie wysyłać PII (URL i e-mail użytkownika).

## QA przed mergem

Checklistę do odhaczania znajdziesz w `docs/QA_CHECKLIST.md`.
