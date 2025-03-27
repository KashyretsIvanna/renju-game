import { useState } from "react";
import clsx from "clsx";
import { BOARD_SIZE, examples, WIN_STREAK } from "../constants";
import "./RenjuGame.css";

export enum Stone {
    Empty = 0,
    Black = 1,
    White = 2,
}

export type Board = Stone[][];

interface GameResult {
    winner: Stone;
    startPosition?: { row: number; col: number };
}

const DIRECTIONS = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: -1, dc: 1 },
];

const checkWinner = (board: Board): GameResult => {
    const isInBounds = (r: number, c: number) => r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;

    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const stone = board[r][c];
            if (stone === Stone.Empty) continue;

            for (const { dr, dc } of DIRECTIONS) {
                let count = 1;
                let nr = r + dr;
                let nc = c + dc;

                while (isInBounds(nr, nc) && board[nr][nc] === stone) {
                    count++;
                    nr += dr;
                    nc += dc;
                }

                if (count === WIN_STREAK) {
                    return { winner: stone, startPosition: { row: r, col: c } };
                }
            }
        }
    }

    return { winner: 0 };
};

const parseBoardInput = (input: string): Board => {
    const lines = input.trim().split(/\n|\r/);
    return lines.map((line) => line.trim().split(/\s+/).map(Number) as Stone[]);
};

const data: Record<string, string> = examples;

const RenjuGame = () => {
    const [input, setInput] = useState(data["Horizontal Win (Black)"]);
    const board = parseBoardInput(input);
    const result = checkWinner(board);

    const renderResult = () => {
        if (result.winner === Stone.Empty) return "0";
        const { row, col } = result.startPosition!;
        return `${result.winner === Stone.Black ? "black" : "white"}\n${row + 1} ${col + 1}`;
    };

    return (
        <div className="renju-container">
            <h2 className="title">Renju Static Evaluator</h2>

            <div className="preset-selector">
                <label htmlFor="preset-select">Preset:</label>
                <select id="preset-select" onChange={(e) => setInput(examples[e.target.value])}>
                    {Object.keys(examples).map((label) => (
                        <option key={label} value={label}>{label}</option>
                    ))}
                </select>
            </div>

            <textarea className="board-input" value={input} onChange={(e) => setInput(e.target.value)} />

            <div className="board-container">
                <div className="board-grid">
                    {board.map((row, rowIndex) =>
                        row.map((stone, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={clsx("cell", {
                                    "black-stone": stone === Stone.Black,
                                    "white-stone": stone === Stone.White,
                                    "winning-cell":
                                        result?.startPosition?.row === rowIndex &&
                                        result?.startPosition?.col === colIndex,
                                })}
                            >
                                {stone === Stone.Black ? "⚫" : stone === Stone.White ? "⚪" : ""}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="result-box">
                <p>RESULT: {renderResult()}</p>
            </div>
        </div>
    );
};

export default RenjuGame;