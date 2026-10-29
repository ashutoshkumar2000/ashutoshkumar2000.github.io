## Project continuity

- Read [HANDOFF.md](HANDOFF.md) before exploring or changing this project. It holds the current objective, agreed decisions, status, and next steps.
- Read linked supporting material only when needed; inspect relevant code to verify current facts. User instructions and newer repository evidence take precedence over stale handoff notes.
- Before handing work back or reaching a context limit, update HANDOFF.md with completed changes, exact validation results, unresolved issues, and the next concrete action. Keep it a compact current-state summary: replace stale entries, avoid transcripts and append-only logs, and link detailed material instead of duplicating it.
- Preserve useful user requirements and decisions when compressing. Keep stable source facts in the linked content brief; do not invent missing information or claim unrun checks passed.

## Token-efficient execution

- Treat tokens and context as expensive resources. Keep HANDOFF.md current after meaningful milestones and before context compaction so future agents can resume without rediscovering completed work. Record decisions, changed state, unresolved issues, and next actions concisely; skip no-op updates and repeated facts.
- Suppress routine command success messages, verbose logs, and full tool-result envelopes. When orchestrating tools, emit nothing for successful operations unless their output is needed for the next decision.
- For builds, tests, installs, and other noisy checks, capture logs and surface only actionable warnings or a concise failure excerpt on nonzero exit. Do not discard errors or hide failures. Retain running-session IDs when needed to follow completion.
- For reads and searches, return only relevant excerpts or fields; avoid repeated full-file dumps, unchanged context, and binary/base64 output.
- Do not narrate each successful command. Summarize meaningful validation once; keep only a short check/result record in HANDOFF.md, without raw logs. Preserve required approvals, material findings, and useful progress updates.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
