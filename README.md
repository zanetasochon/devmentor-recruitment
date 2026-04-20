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

Po **`git pull`**, jeśli zmienił się `package.json` / `package-lock.json`, zrób ponownie **`npm install`** — bez tego Vite potrafi nie wystartować (np. brak `@vitejs/plugin-react-swc` po migracji z Babela).

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

Otwórz w przeglądarce **dokładnie** adres z terminala (np. `http://localhost:5173/` — **http**, nie https). Trasy aplikacji to hash: `/#/`, `/#/audyt`.

**`Failed to load resource: net::ERR_CONNECTION_REFUSED`:** serwer dev nie działa na tym hoście/porcie co wpisujesz w pasku adresu — uruchom `npm run dev` i użyj portu z komunikatu (jeśli 5173 jest zajęty, Vite wybierze np. 5174). Upewnij się, że nie masz zakładki z **starym** portem po restarcie. Dostęp z innego urządzenia w sieci: `npm run dev -- --host`.

**`500 (Internal Server Error)` / `[plugin:vite:react-babel] ECANCELED`:** to błąd **serwera Vite** przy odczycie pliku (często `main.tsx`), nie logiki strony. W projekcie używamy **`@vitejs/plugin-react-swc`** zamiast Babel (`react-babel`), żeby ten scenariusz występował rzadziej. Dalej pomaga: **Ctrl+C**, `npm run dev`, bez spamowania `r` w konsoli; `rm -rf node_modules/.vite`. Projekt w **iCloud / OneDrive** — przenieś repo poza synchronizowany folder albo uruchom: `VITE_WATCH_POLL=1 npm run dev` (wolniejsze, ale stabilniejsze obserwowanie plików).

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

0. **Prywatne repo na darmowym koncie:** GitHub Pages z Actions nie włączy się — trzeba **zmienić widoczność repozytorium na Public** albo mieć płatny plan (np. GitHub Pro), który pozwala na Pages z prywatnego repozytorium. Alternatywa przy prywatnym repo: **Vercel** (import z GitHuba działa bez publikowania kodu).
1. **Settings → Pages → Build and deployment:** źródło **GitHub Actions** (nie „Deploy from a branch”).
2. Pierwszy push na `main` (albo **Actions → Deploy to GitHub Pages → Run workflow**) uruchomi build z domyślnym `base: "./"` (działa pod `https://<user>.github.io/<repo>/` i pod własną domeną w katalogu głównym).

**Na ekranie Pages widać tylko „Suggested workflows” / „Workflow details will appear…”?**  
To oczekiwanie przed **pierwszym udanym** wdrożeniem. Nasz workflow to własny plik `.github/workflows/deploy-pages.yml` (nie trzeba klikać szablonów Jekyll/HTML). Wejdź w zakładkę **Actions**, wybierz **Deploy to GitHub Pages** i sprawdź ostatni run (albo **Run workflow**). Jeśli job **deploy** czeka na zatwierdzenie środowiska **github-pages**, zatwierdź go raz w interfejsie runu. Po zielonym deployu sekcja Pages uzupełni się o link.  
**Adres strony projektu** (bez własnej domeny): `https://zanetasochon.github.io/devmentor-recruitment/` (HashRouter: `…/#/`, `…/#/audyt`).

**Własna domena `rekrutacja.devmentor.pl`**

1. **GitHub:** **Settings → Pages → Custom domain** — wpisz dokładnie: `rekrutacja.devmentor.pl` (bez `https://`, **bez ukośnika na końcu** — `rekrutacja.devmentor.pl/` GitHub odrzuci jako „not properly formatted”). Zapisz i poczekaj na weryfikację DNS.
2. **DNS** (tam gdzie obsługujesz strefę `devmentor.pl`, np. OVH / Cloudflare / home.pl): dodaj rekord **CNAME**:
   - **nazwa / host:** `rekrutacja` (czasem wpisuje się pełną `rekrutacja.devmentor.pl` — zależy od panelu),
   - **wartość / cel:** `zanetasochon.github.io` (bez `https://`, bez ścieżki `/devmentor-recruitment`).
3. Po propagacji DNS (od kilku minut do 48 h) GitHub włączy certyfikat; wtedy zaznacz **Enforce HTTPS** w Pages, jeśli nie jest już aktywne.
4. W repozytorium jest `public/CNAME` z tą domeną — trafia do `dist/` przy buildzie i jest zgodny z [dokumentacją GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

**Lokalny test (jak na GitHub Actions, base `./`):**

```bash
npm run build && npx vite preview
```

Opcjonalnie test ze sztywnym prefiksem repo: `VITE_BASE_URL=/devmentor-recruitment/ npm run build` (nieużywane w domyślnym workflow).

## Deploy na Vercel

1. Zaloguj się na [vercel.com](https://vercel.com) i **Add New… → Project**.
2. **Import** repozytorium `devmentor-recruitment` z GitHuba (Vercel wykryje Vite).
3. Ustawienia domyślne są zwykle poprawne: **Build Command** `npm run build`, **Output** `dist` (możesz też polegać na pliku `vercel.json` w rootcie).
4. W **Environment Variables** możesz dodać opcjonalnie:
   - `VITE_RECRUITMENT_WEBHOOK_URL` — inny URL webhooka Make niż domyślny w kodzie (nadpisanie przy buildzie).
5. **Deploy**. Adres produkcyjny będzie miał postać `https://<projekt>.vercel.app`; trasy to `/#/`, `/#/rekrutacja`, `/#/audyt`, `/#/privacy` (HashRouter).

## Routing i base path

- Routing działa przez `HashRouter`, więc linki mają postać `/#/privacy` (na GitHub Pages: `https://…github.io/<repo>/#/privacy`).
- W `vite.config.ts` domyślnie `base: "./"` (Vercel, GitHub Pages, własna domena). Opcjonalnie `VITE_BASE_URL` przy buildzie. Obrazki z `public/` — `publicAsset()` w `src/lib/publicAsset.ts`.
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
