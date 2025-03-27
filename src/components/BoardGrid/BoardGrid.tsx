import clsx from "clsx";
import { Grid, Stone, GameResult } from "../../types";
import './BoardGrid.css'

interface Props {
    board: Grid;
    result: GameResult;
}

const BoardGrid: React.FC<Props> = ({ board, result }) => {
    return (
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
                        />

                    ))
                )}
            </div>
        </div>
    );
};

export default BoardGrid;