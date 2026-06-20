# Repository Guidelines

## Project Structure & Module Organization
The primary application lives in `my-portfolio/`. Put source code in `my-portfolio/src/`: `main.tsx` boots the app, `App.tsx` contains the portfolio UI, `index.css` and `App.css` hold styles, and `src/assets/` stores bundled images and PDFs. Use `my-portfolio/public/` for static files served as-is. Treat `my-portfolio/dist/` as generated output; do not edit it by hand. Although the repo root also has a `package.json`, contributors should work against `my-portfolio/`, where the Vite, Tailwind, and ESLint configs live.

## Build, Test, and Development Commands
Run commands from the repo root with the app prefix:

- `npm --prefix my-portfolio install` installs dependencies.
- `npm --prefix my-portfolio run dev` starts the local Vite dev server.
- `npm --prefix my-portfolio run build` creates the production bundle in `my-portfolio/dist/`.
- `npm --prefix my-portfolio run preview` serves the built bundle locally.
- `npm --prefix my-portfolio run lint` runs ESLint for `ts` and `tsx` files.

`build` currently succeeds. `lint` currently fails on an unused `eslint-disable` comment in `my-portfolio/src/App.tsx`; fix that before treating lint as green.

## Coding Style & Naming Conventions
Use React function components with TypeScript. Follow the current naming pattern: PascalCase for components and interfaces (`Header`, `Project`), camelCase for state and helpers (`isMenuOpen`, `scrollToSection`), and descriptive asset filenames in `src/assets/`. No Prettier config is checked in, so keep formatting consistent with the surrounding file and make ESLint your baseline. Prefer utility-first styling in JSX with Tailwind classes, and keep shared global CSS in `index.css`.

## Testing Guidelines
There is no automated test suite in the repository yet. For now, validate every change with `npm --prefix my-portfolio run build` and `npm --prefix my-portfolio run lint`. If you add tests, use `*.test.ts` or `*.test.tsx` naming and colocate them with the code they cover or place them under `src/__tests__/`.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects such as `Update Sections` and `Add Ordira project and refresh AI narrative across portfolio`. Follow the same pattern: start with a verb, keep the subject focused, and avoid unrelated edits. Pull requests should include a brief summary, screenshots or a short GIF for UI changes, linked issues when applicable, and the validation commands you ran.

## Security & Configuration Tips
Do not commit secrets, tokens, or private API endpoints. This project ships public-facing assets, resume files, and contact links, so verify filenames and external URLs before merging or deploying to GitHub Pages.
