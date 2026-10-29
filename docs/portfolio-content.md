# Portfolio content source

User-supplied facts, 2026-10-29. Read on demand; keep detailed content here rather than enlarging HANDOFF.md. Preserve factual distinctions and dates; do not fabricate additional projects, hobbies, portrait, LinkedIn URL, customer endorsements, or availability.

## Profile

Privacy requirement: do not publish a phone number anywhere, including the resume, metadata, or downloadable artifacts. Contact uses email, GitHub and LinkedIn.

- Ashutosh Kumar; Lead Software Engineer (since August 2026); Bengaluru, Karnataka, India.
- Email: `ashutoshkumar.2001@gmail.com`.
- GitHub (user-confirmed): `https://github.com/ashutoshkumar2000`.
- LinkedIn (user-confirmed): `https://www.linkedin.com/in/ashutosh-kumar-58197a153`. No resume PDF supplied; generate a printable resume page from these facts.

## Employment

### UptimeAI

May 2023–Present; Bengaluru, KA.

Role history (user-confirmed):
- Lead Software Engineer: August 2026–Present.
- Senior Software Engineer: May 2023–July 2026.

Present this as a factual title change, without a promotional badge or invented leadership duties. The accomplishments below belong to the overall UptimeAI tenure.

- End-to-end delivery on B2B multi-tenant SaaS: analysis, system design, backend, frontend.
- Folder sync: ~30s → ~3s API response (90% reduction). Replaced synchronous blocking execution with parallel database-driven pipeline; Node.js worker threads and batch folder creation.
- Separate workflow: 2min → 5sec response through backend refactoring, denormalised schemas and heavy batch work moved to async workers. Do not conflate this with folder-sync result.
- Security: Istio service mesh/mTLS in private AWS VPCs via Terraform; public S3 assets moved to private buckets behind CloudFront, removing direct public exposure across client environments.
- Inbound email replies: Cloudflare Worker + Email Routing + Workers KV; HMAC-signed VERP-style reply tokens verified at edge. MongoDB durable store/work queue using atomic claims; four-layer parsing cascade; $0 extra infrastructure cost.
- Hierarchy redesign: rigid Facility → Unit → System → Asset replaced by configurable Nodes / Levels / HierarchyDefinition. Node moves maintain ancestor paths, depth, descendants; account for historical alerts.
- Alert workflows: split/merge with locks against conflicting concurrent operations; workflow refactor; exceedance cases; widget/alert export into analysis.
- Migration tooling moves systems between units/facilities without manual data fixes.
- Plotly.js/ECharts visualisation: ~2M data points with drill-downs and lazy loading.
- Observability: Fluent Bit → Grafana Loki logs, Grafana dashboards, Tempo tracing, OpenTelemetry Collector via OTLP/HTTP.
- Resolved 100+ critical SonarQube issues; quality gates across codebase; SQL injection fixes; removed magic strings.
- Terraform cloud provisioning; resilient PostgreSQL cluster with read replicas for availability/performance.

### eMids (erstwhile Quovantis) — Software Engineer

September 2021–April 2023; Noida, UP.

- Secure role-based patient messaging in Angular/NestJS for 10,000+ users, supporting healthcare data protection requirements (resume cites HIPAA; do not invent independent certification).
- Analytics: dynamic widget filters/tagging; improved exploration, usability and performance for large healthcare datasets.
- Jest suites: 85% coverage of critical modules; fewer regression issues.
- Resolved 50+ critical legacy production bugs; reduced downtime and stabilised high-impact healthcare workflows.

## Education and recognition

- Amity University, Greater Noida, UP; B.Tech Computer Science, May 2021; GPA 9.04/10, Bronze Medallist.
- UptimeAI High-Impact Contributor, 2025–2026.
- Sprint Champion, 15×: ownership/additional tasks preventing delivery delays.
- Extra Miler Award, two consecutive financial years.
- Performance bonus for excellent performance/contributions; no amount/date supplied.
- Undergraduate bronze medal is the same award as education; avoid duplicate presentation.

## Skills

- Languages: JavaScript, TypeScript.
- Applications: Angular/RxJS, Node.js, Express.js, NestJS.
- Data: MongoDB/Mongoose, PostgreSQL, TimescaleDB.
- Cloud/platform: AWS EKS/S3/CloudFront/IAM, Terraform, Istio, Docker, Cloudflare Workers.
- Visualisation: Plotly.js, ECharts.
- Observability/quality: Grafana, Loki, Tempo, Fluent Bit, OpenTelemetry, SonarQube, Jest.
- Tools: VS Code, Codex, Antigravity, Cursor, Postman, Jira, Git, MongoDB Compass, Chrome Developer Tools. Curate for homepage; full list can live on resume.

## Kubera — independent project, in development

Repository: `https://github.com/ashutoshkumar2000/kubera`.

Full concept: **Agentic Financial Reality & Recovery Engine**. Inspired by Kubera, Hindu deity associated with wealth/treasures. Guiding phrase: “Think ahead. Detect divergence. Recover intelligently.” Keep product-pitch language inside optional project detail, not the portfolio hero.

Problem: businesses reconcile balances, expected funds, supplier payments, deadlines and minimum reserves. Delayed deposits or uncertain transfers affect obligations and create duplicate-payment risk during recovery.

Planned capabilities:

1. **Financial Reality Monitor:** compare expected activity against actual balances/transfer states; detect discrepancies, quantify obligations at risk and explain changes.
2. **Impact-Aware Treasury Replanner:** reconsider affected payments, deferrals and escalations against deadlines, liquidity and reserve constraints; preserve still-valid decisions.
3. **Safe Payment Recovery:** investigate failed/uncertain transfers before replacement; check transaction state, use idempotency where supported, apply approval policy and audit decisions/outcomes.
4. **Financial Chaos Simulator:** controlled delayed deposits, unexpected expenses, failed transfers; original/revised plans, affected obligations, decision explanations and safety verification. Connect changing reality to action/recovery rather than a standalone what-if calculator.

Illustrative scenario: $20,000 balance, $5,000 minimum reserve, supplier obligations $9,000 + $8,000. Paying both breaches reserve by $2,000. Recommend safer priorities, replan after delayed deposit, verify uncertain transfer before replacing it. Clearly mark this as synthetic illustration if shown.

Planned stack: Angular, Node.js, TypeScript, PostgreSQL, Airwallex APIs/sandbox, LLM with tool calling. LLM explains evidence/formulates recommendations; deterministic backend enforces calculations, reserves, transaction validation and authorisation. Distinguish sandbox data from synthetic events. Repository implementation was not verified during planning; do not present plans as shipped capabilities.

Future projects are expected but none were supplied. Keep featured gallery and secondary list data-driven; do not invent entries to fill space.
