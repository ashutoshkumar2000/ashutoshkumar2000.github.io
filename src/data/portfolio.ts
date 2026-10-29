export const profile = {
  name: 'Ashutosh Kumar', role: 'Lead Software Engineer', location: 'Bengaluru, India',
  email: 'ashutoshkumar.2001@gmail.com', github: 'https://github.com/ashutoshkumar2000',
  linkedin: 'https://www.linkedin.com/in/ashutosh-kumar-58197a153',
};
export const workStories = [
  { id: 'sync', number: '01', category: 'PERFORMANCE / BACKEND', title: 'Thirty seconds.\nThen three.',
    intro: 'Folder sync was making people wait. The request did all the work synchronously, so every folder added to the delay.',
    decision: 'I rebuilt the flow around a database-driven pipeline, parallel Node.js worker threads and batch folder creation. The API could respond without blocking on the entire job.',
    result: '90%', resultLabel: 'lower API latency', note: '~30s → ~3s response time', tags: ['Node.js', 'Worker threads', 'Database-driven pipeline'] },
  { id: 'email', number: '02', category: 'SYSTEM DESIGN / EDGE', title: 'Replies that find\ntheir way back.',
    intro: 'An email reply needs to reach the right conversation, survive messy formats and be processed reliably.',
    decision: 'I built an edge-verified reply pipeline with HMAC-signed tokens, Cloudflare Email Routing and Workers KV. MongoDB provides a durable queue with atomic claims, followed by a four-layer parsing cascade.',
    result: '$0', resultLabel: 'extra infrastructure cost', note: 'Edge verification. Durable processing.', tags: ['Cloudflare Workers', 'HMAC / VERP', 'MongoDB'] },
  { id: 'hierarchy', number: '03', category: 'DATA MODELLING / ARCHITECTURE', title: 'A hierarchy with\nroom to change.',
    intro: 'A fixed Facility → Unit → System → Asset structure could not fit every client’s organisation.',
    decision: 'I replaced it with configurable Nodes, Levels and HierarchyDefinitions. Moving a node updates ancestor paths, depth and descendants while accounting for historical alerts.',
    result: 'Fixed → flexible', resultLabel: 'a model built around the organisation', note: 'Configurable structure. Historical context intact.', tags: ['Data modelling', 'Multi-tenant SaaS', 'Migration tooling'] },
];
export interface RoleHistoryEntry { title: string; period: string }
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  roleHistory?: RoleHistoryEntry[];
}
export const experience: Experience[] = [
  { company: 'UptimeAI', role: profile.role, period: 'May 2023 — Present', location: 'Bengaluru, KA',
    roleHistory: [
      { title: profile.role, period: 'Aug 2026 — Present' },
      { title: 'Senior Software Engineer', period: 'May 2023 — Jul 2026' },
    ],
    summary: 'Building a B2B, multi-tenant SaaS platform end to end: from analysis and system design to backend services, frontend experiences and infrastructure.',
    highlights: [
      'Reduced folder-sync API latency by 90% (~30s → ~3s) with a parallel, database-driven pipeline, Node.js worker threads and batch folder creation.',
      'Reduced a separate workflow’s response time from 2 minutes to 5 seconds through backend refactoring, denormalised schemas and asynchronous batch workers.',
      'Deployed Istio mTLS on private AWS VPCs using Terraform; moved public S3 assets to private buckets behind CloudFront across client environments.',
      'Built an inbound email reply platform with Cloudflare Workers, Email Routing, KV, HMAC-signed VERP-style tokens, a MongoDB atomic-claim queue and four-layer parsing at $0 extra infrastructure cost.',
      'Redesigned rigid asset hierarchies as configurable Nodes / Levels / HierarchyDefinitions, maintaining ancestor paths, depth, descendants and historical alerts during moves.',
      'Implemented alert split/merge with concurrency locks, exceedance-case features, and widget/alert exports into analysis.',
      'Automated system migration between units and facilities without manual data fixes.',
      'Optimised Plotly.js / ECharts dashboards for approximately 2M data points using drill-downs and lazy loading.',
      'Set up Fluent Bit → Grafana Loki log collection, Grafana dashboards, Tempo tracing and OpenTelemetry Collector integration over OTLP/HTTP.',
      'Resolved 100+ critical SonarQube issues, introduced codebase-wide quality gates, patched SQL injection vulnerabilities and removed magic strings.',
      'Automated cloud provisioning with Terraform, including a resilient PostgreSQL cluster with read replicas.',
    ] },
  { company: 'eMids / Quovantis', role: 'Software Engineer', period: 'Sep 2021 — Apr 2023', location: 'Noida, UP',
    summary: 'Built healthcare product features, from secure patient messaging to analytics, and made critical workflows more dependable.',
    highlights: [
      'Designed a secure, role-based patient messaging module in Angular and NestJS for 10,000+ users, supporting healthcare data protection requirements, including HIPAA.',
      'Added dynamic filtering and tagging within analytics widgets, improving exploration, usability and performance for large healthcare datasets.',
      'Built Jest suites achieving 85% coverage across critical modules, reducing regression issues.',
      'Resolved 50+ critical legacy production bugs, reducing downtime and stabilising key healthcare workflows.',
    ] },
];
export interface Project {
  id: string; title: string; summary: string; status: string; technologies: string[]; featured: boolean; order: number;
  links: { label: string; url: string }[]; details: { heading: string; text: string }[];
}
export const projects: Project[] = [
  { id: 'kubera', title: 'Kubera', status: 'In development', featured: true, order: 1,
    summary: 'An agentic financial operations project exploring how to detect changing financial reality, replan treasury decisions and recover payments safely.',
    technologies: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL'],
    links: [{ label: 'View Kubera on GitHub', url: 'https://github.com/ashutoshkumar2000/kubera' }],
    details: [
      { heading: 'The idea', text: 'Kubera is an Agentic Financial Reality & Recovery Engine, inspired by the Hindu deity associated with wealth and treasures. Businesses need to connect changing balances, delayed deposits and uncertain transfers to the commitments those changes affect.' },
      { heading: 'Financial reality monitor', text: 'Planned: compare expected financial activity with actual balances and transfer states, detect discrepancies, quantify obligations at risk and explain what changed.' },
      { heading: 'Impact-aware replanning', text: 'Planned: reconsider payment, deferral and escalation decisions against deadlines, liquidity and minimum reserves, while preserving decisions that remain valid.' },
      { heading: 'Safe payment recovery', text: 'Planned: investigate failed or uncertain transfers before proposing replacements; verify transaction state, use idempotency where supported, apply approval policies and record an audit trail.' },
      { heading: 'Financial chaos simulator', text: 'Planned: introduce controlled delayed deposits, unexpected expenses and failed transfers; compare original and revised plans, explain the affected obligations and verify whether recovery remains safe.' },
      { heading: 'An illustrative scenario', text: 'With $20,000 available, a $5,000 reserve and supplier obligations of $9,000 and $8,000, paying both would breach the reserve by $2,000. The intended workflow reprioritises payments, adapts to a delayed deposit and verifies an uncertain transfer before retrying. This is a synthetic example, not live financial data.' },
      { heading: 'Planned implementation', text: 'Angular, Node.js, TypeScript, PostgreSQL, Airwallex APIs and sandbox capabilities, and an LLM with tool calling. The LLM explains evidence and recommends actions; deterministic services enforce calculations, reserve constraints, transaction validation and authorisation. Sandbox data and synthetic events will be clearly distinguished.' },
    ] },
];
/** Featured overflow belongs in the archive; a project is never silently lost. */
export function partitionProjects(items: Project[]) {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const featured = sorted.filter(item => item.featured).slice(0, 3);
  const selected = new Set(featured.map(item => item.id));
  return { featured, more: sorted.filter(item => !selected.has(item.id)) };
}
export const skills = [
  { label: 'The everyday', items: 'TypeScript, JavaScript, Node.js, Angular / RxJS, NestJS, Express.js' },
  { label: 'Under the surface', items: 'PostgreSQL, MongoDB / Mongoose, TimescaleDB, worker threads' },
  { label: 'Into production', items: 'AWS · EKS / S3 / CloudFront / IAM, Terraform, Istio, Docker, Cloudflare Workers' },
  { label: 'Keep it observable', items: 'OpenTelemetry, Grafana, Loki, Tempo, Fluent Bit, SonarQube, Jest' },
  { label: 'Make it visible', items: 'Plotly.js, ECharts, performance profiling' },
];
export const tools = 'VS Code, Codex, Antigravity, Cursor, Postman, Jira, Git, MongoDB Compass, Chrome Developer Tools';
export const recognition = [
  { value: '15×', title: 'Sprint Champion', context: 'Ownership that keeps delivery moving.' },
  { value: '2025–26', title: 'High-Impact Contributor', context: 'UptimeAI' },
  { value: '2 years', title: 'Extra Miler Award', context: 'Two consecutive financial years.' },
  { value: 'Recognition', title: 'Performance bonus', context: 'For excellent performance and contributions.' },
];
export const education = { school: 'Amity University', degree: 'B.Tech, Computer Science', period: 'May 2021', location: 'Greater Noida, UP', gpa: '9.04 / 10', distinction: 'Bronze Medallist' };
