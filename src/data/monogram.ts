/** One design source for the solid geometry and the server-rendered SVG fallback.
 * Coordinates are centred around the mark, with positive Y pointing upward.
 * Intentional joint gaps leave space for the bevels on neighbouring pieces.
 */
export interface MonogramPiece {
  id: string;
  points: [number, number][];
  offset: [number, number, number];
  turn: number;
}
export const monogramPieces: MonogramPiece[] = [
  { id: 'a-left', points: [[-2.65,-1.65],[-1.55,1.65],[-1.30,1.65],[-1.98,-1.65]], offset: [-.7,.25,.15], turn: -.13 },
  { id: 'a-right', points: [[-1.20,1.65],[-.95,1.65],[.15,-1.65],[-.52,-1.65]], offset: [.05,.65,-.15], turn: .1 },
  { id: 'a-crossbar', points: [[-1.58,-.18],[-.92,-.18],[-.82,-.68],[-1.68,-.68]], offset: [-.25,-.55,.8], turn: -.08 },
  { id: 'k-stem', points: [[.50,-1.65],[1.06,-1.65],[1.06,1.65],[.50,1.65]], offset: [.1,-.45,-.1], turn: .06 },
  { id: 'k-upper', points: [[1.20,.12],[1.20,.78],[2.12,1.65],[2.88,1.65]], offset: [.7,.55,.45], turn: -.12 },
  { id: 'k-lower', points: [[1.20,-.08],[1.64,.35],[2.93,-1.65],[2.18,-1.65]], offset: [.65,-.55,.25], turn: .12 },
];
export const monogramCenterX = .14;
export const monogramDepth = .42;
