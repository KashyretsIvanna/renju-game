import { useState } from "react";
import { examples } from "../../constants";
import { Grid, Stone } from "../../types";
import { determineWinner } from "../../utils";
import GameResultComponent from "../../components/GameResult/GameResult";
import BoardInput from "../../components/BoardInput/BoardInput";
import BoardGrid from "../../components/BoardGrid/BoardGrid";
import "./RenjuGame.css";

const recognizeInput = (input: string): Grid => {
    const lines = input.trim().split(/\n|\r/);
    return lines.map((line) => line.trim().split(/\s+/).map(Number) as Stone[]);
};

const data: Record<string, string> = examples;

const RenjuGame = () => {
    const [input, setInput] = useState(data["Horizontal (Black)"]);
    const board = recognizeInput(input);
    const result = determineWinner(board);

    return (
        <div className="renju-container">
            <div className="renju-left-container">
                <BoardInput value={input} onChange={setInput} />
                <div>
                    <GameResultComponent result={result} />
                </div>
            </div>
            <div>
                <BoardGrid board={board} result={result} />
            </div>
        </div>
    );
};

export default RenjuGame;

