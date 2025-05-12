import { useState, useEffect } from "react";
import { examples } from "../../constants";
import { Grid, Stone } from "../../types";
import { determineWinner } from "../../utils";
import GameResultComponent from "../../components/GameResult/GameResult";
import BoardInput from "../../components/BoardInput/BoardInput";
import BoardGrid from "../../components/BoardGrid/BoardGrid";
import "./RenjuGame.css";

const recognizeInput = (input: string): Grid => {
    const lines = input.trim().split(/\n|\r/);
    return lines.map((line) =>
        line
            .trim()
            .split(/\s+/)
            .map((value) => {
                const num = Number(value);
                return num === 0 || num === 1 || num === 2 ? num : 0;
            }) as Stone[]
    );
};

const isValidInput = (input: string): boolean => {
    return input
        .trim()
        .split(/\s+/)
        .every((value) => ["0", "1", "2"].includes(value));
};

const data: Record<string, string> = examples;

const RenjuGame = () => {
    const [input, setInput] = useState(data["Initial"]);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(isValidInput(input));
    }, [input]);

    const board = recognizeInput(input);
    const result = determineWinner(board);

    return (
        <div className="renju-container">
            <div className="renju-left-container">
                <BoardInput value={input} onChange={setInput} />
                {!isValid && (
                    <div style={{ color: "red", marginTop: "8px" }}>
                        ⚠️ Input must only contain numbers: 0 (empty), 1 (black), or 2 (white). Invalid values are treated as 0.
                    </div>
                )}
                <GameResultComponent result={result} />
            </div>
            <div>
                <BoardGrid board={board} result={result} />
            </div>
        </div>
    );
};

export default RenjuGame;
