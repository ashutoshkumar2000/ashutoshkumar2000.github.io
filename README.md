# Ashutosh Kumar — Portfolio

A static Astro portfolio with an editorial paper/ink palette, scroll-linked engineering diagrams, and a custom six-piece Three.js AK monogram. Fonts are self-hosted; no external services or credentials are needed.

## Development

Requires Node.js 22.23.4 or newer.

```sh
npm install
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Use the local URL reported by Astro; the preferred port is 4321.

```sh
npm run check
npm run build
npm run preview
```

`/` is the portfolio. `/resume` is a complete, print-friendly resume with a Print / Save as PDF action.

## Content

Edit `src/data/portfolio.ts` for the profile, engineering stories, employment, skills, awards, education and projects. The resume shares that data. Current headings and metadata use `profile.role`. Employment entries can include optional `roleHistory` title/date pairs, rendered by the shared EmploymentRoles component on both pages; accomplishments remain grouped under the company.

To add a project, supply a unique `id`, title, summary, status, technologies, `featured`, numeric `order`, links, and detail sections. Up to three featured projects appear as cards. Other projects, including featured overflow, appear under More projects. Detail dialogs enhance native expandable content, so the information remains available without JavaScript.

Keep planned work labelled accurately. Kubera is in development; its intended capabilities are not presented as shipped functionality.

## Motion and accessibility

GSAP ScrollTrigger uses native scrolling. Three.js loads separately after the page becomes usable, renders only when visible/changing, and falls back to an SVG derived from the same six shape definitions when WebGL is unavailable. Reduced motion removes scroll animation and entrances. Mobile artwork occupies a separate region from text. Native dialogs support Escape, focus restoration and keyboard navigation.

Before delivery, run the build/type check and inspect desktop/mobile layouts, the navigation, dialogs, contact actions, resume printing, reduced motion, and the static fallback.

## Deployment

Production URL: https://ashutoshkumar2000.github.io/

The site is statically generated into `dist/`. The repository must be named `ashutoshkumar2000.github.io`; it is a GitHub user site served from `/`, so Astro has no `base` path. Canonical and Open Graph URLs use the `site` setting in `astro.config.mjs`.

On GitHub, rename the existing repository or create the repository above, retaining `master` as the default branch. Update your local `origin` to that repository. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.

`.github/workflows/deploy.yml` builds and deploys pushes to `master`, and supports manual runs from the Actions tab. The official Astro action detects npm from the tracked `package-lock.json`, builds the site, and uploads the Pages artifact; GitHub's deploy-pages action publishes it using the `github-pages` environment. No Cloudflare account, Worker, adapter, or deployment credentials are required. If you change the default branch, update the workflow's push filter too.

There is currently no social preview image. Image metadata remains omitted until a suitable image is provided; do not reference `/og-preview.png` until that file exists in `public/`.
