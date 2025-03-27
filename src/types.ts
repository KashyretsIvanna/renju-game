/** @format */

export enum Stone {
  Empty = 0,
  Black = 1,
  White = 2,
}

export type Grid = Stone[][];

export interface GameResult {
  winner: Stone;
  startPosition?: { row: number; col: number };
}
