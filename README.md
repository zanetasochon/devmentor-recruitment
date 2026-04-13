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

W repo jest gotowy workflow: `.github/workflows/deploy.yml`.

Wymagane ustawienia repo:

1. Wejdź w `Settings -> Pages`.
2. Wybierz `Build and deployment: GitHub Actions`.
3. Push na `main` uruchomi build i publikację `dist`.

## Deploy na Vercel

1. Zaloguj się na [vercel.com](https://vercel.com) i **Add New… → Project**.
2. **Import** repozytorium `devmentor-recruitment` z GitHuba (Vercel wykryje Vite).
3. Ustawienia domyślne są zwykle poprawne: **Build Command** `npm run build`, **Output** `dist` (możesz też polegać na pliku `vercel.json` w rootcie).
4. W **Environment Variables** dodaj opcjonalnie:
   - `VITE_RECRUITMENT_WEBHOOK_URL` — URL webhooka Make (formularz rekrutacyjny); bez tej zmiennej formularz nadal działa, ale wysyłka na backend się nie wykona.
5. **Deploy**. Adres produkcyjny będzie miał postać `https://<projekt>.vercel.app`; trasy to `/#/`, `/#/rekrutacja`, `/#/audyt`, `/#/privacy` (HashRouter).

## Routing i base path

- Routing działa przez `HashRouter`, więc linki mają postać `/#/privacy`.
- W `vite.config.ts` ustawione jest `base: "./"` dla zgodności z GH Pages.
- Jeśli przejdziesz na `BrowserRouter`, ustaw odpowiedni `base` pod nazwę repo i dodaj fallback dla tras.

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
