/** @format */

import {
  BOARD_SIZE,
  DIRECTIONS,
  WIN_STREAK,
} from './constants';
import {
    Grid,
  GameResult,
  Stone,
} from './types';

export const determineWinner = (
  grid: Grid,
): GameResult => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const current = grid[row][col];
      if (current === Stone.Empty) continue;

      for (const { dr, dc } of DIRECTIONS) {
        let streak = 1;
        let nextRow = row + dr;
        let nextCol = col + dc;

        while (
          withinRange(nextRow, nextCol) &&
          grid[nextRow][nextCol] === current
        ) {
          streak++;
          nextRow += dr;
          nextCol += dc;
        }

        if (streak === WIN_STREAK) {
          const beforeRow = row - dr;
          const beforeCol = col - dc;
          const afterRow = row + dr * WIN_STREAK;
          const afterCol = col + dc * WIN_STREAK;

          const hasBefore =
            withinRange(beforeRow, beforeCol) &&
            grid[beforeRow][beforeCol] ===
              current;
          const hasAfter =
            withinRange(afterRow, afterCol) &&
            grid[afterRow][afterCol] === current;

          if (!hasBefore && !hasAfter) {
            return {
              winner: current,
              startPosition: { row, col },
            };
          }
        }
      }
    }
  }

  return { winner: 0 };
};

const withinRange = (row: number, col: number) =>
  row >= 0 &&
  row < BOARD_SIZE &&
  col >= 0 &&
  col < BOARD_SIZE;
