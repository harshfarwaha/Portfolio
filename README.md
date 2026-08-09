# Harsh Farwaha — Portfolio

A React + Tailwind CSS portfolio site, built with Vite.

## Run locally

```bash
npm install
npm run dev
```

## Before deploying

Your component links to `/canvaresume.pdf` for the resume download. Create a
`public/` folder in this project and drop your resume PDF in there, named
`canvaresume.pdf`, so the download buttons work.

```bash
mkdir public
# copy your resume into public/canvaresume.pdf
```

## Build for production

```bash
npm run build
```

This outputs a `dist/` folder you can deploy anywhere (Vercel, Netlify,
GitHub Pages, Render, etc.).

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/harshfarwaha/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_REPO_NAME` with whatever you named the repo on GitHub (create
it first at github.com/new, without a README/gitignore so it stays empty).

## Deploy

The easiest options for a Vite React site:
- **Vercel** — import the GitHub repo, it auto-detects Vite, deploy in one click.
- **Netlify** — same idea; build command `npm run build`, publish dir `dist`.
- **GitHub Pages** — needs a small `vite.config.js` tweak (`base: '/YOUR_REPO_NAME/'`)
  plus a deploy workflow or the `gh-pages` package.
