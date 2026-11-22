# Piyush Sharma — Portfolio

A responsive, premium-dark personal portfolio built with React, Vite, Framer Motion and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production-ready static site is generated in `dist/`.

## Personalise before publishing

Update the `PROFILE` object near the top of `src/main.jsx`:
- Email, phone, location
- GitHub and LinkedIn URLs
- Resume path

The resume PDF is included in `public/`.

### Important project links

The project cards currently point to your GitHub profile because individual repository URLs and live demo URLs were not present in the supplied resume. Replace each `github` and `demo` value in the `projects` array with the exact repository/demo URL when available. Do not leave profile-level links labelled as individual project repositories.

### Content accuracy

Project descriptions are written from the supplied resume and previously discussed project context. Add verified screenshots, metrics, deployed URLs and repository links as you confirm them. Avoid publishing unverified performance claims.

## Deploy

### Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Netlify
1. Import the repository.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

## Stack

- React 18
- Vite 6
- Framer Motion
- Lucide React
- Custom responsive CSS
