/** Small, shared SVG vocabulary. Decorative marks never carry interaction by themselves. */
export const iconPaths = {
  external: ['M14 3h7v7M21 3 11 13', 'M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5'],
  document: ['M14 3H5v18h14V8Z', 'M14 3v5h5M8 12h8M8 16h6'],
  printer: ['M7 8V3h10v5M7 17H4V8h16v9h-3', 'M7 14h10v7H7ZM16 11h1'],
  mail: ['M3 5h18v14H3Z', 'm3 6 9 7 9-7'],
  down: ['m6 9 6 6 6-6'], up: ['m6 15 6-6 6 6'], back: ['m14 6-6 6 6 6'],
  plus: ['M12 5v14M5 12h14'], close: ['m6 6 12 12M6 18 18 6'],
  copy: ['M8 8h12v12H8Z', 'M16 8V4H4v12h4'],
  conversation: ['M4 4h16v12H9l-5 4Z', 'M8 8h8M8 12h5'],
  parallel: ['M2 12h4m0 0V5h5m-5 7h5m-5 0v7h5M14 5h8M14 12h8M14 19h8'],
  verifiedMail: ['M3 5h17v9M3 5v13h8', 'm3 6 8.5 6L20 6', 'm14 18 3 3 5-6'],
  branches: ['M12 3v6M4 9h16M4 9v8M20 9v8M12 9v8', 'M2 17h4v4H2ZM10 17h4v4h-4ZM18 17h4v4h-4Z'],
  connected: ['M6 12h12', 'M6 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM22 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'],
  medal: ['m7 3 5 6 5-6M4 3h5l3 4 3-4h5l-6 8h-4Z', 'M18 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z', 'm12 13 .9 1.8 2 .3-1.5 1.4.4 2-1.8-.9-1.8.9.4-2-1.5-1.4 2-.3Z'],
} as const;
export type IconName = keyof typeof iconPaths;
