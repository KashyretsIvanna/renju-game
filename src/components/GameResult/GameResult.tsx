import { GameResult, Stone } from "../../types";
import './GameResult.css'

interface Props {
    result: GameResult;
}

const GameResultComponent: React.FC<Props> = ({ result: { winner, startPosition } }) => {
    const showWinner = () => {
        if (winner === Stone.Empty) return;
        return `${winner === Stone.Black ? "black" : "white"}`;
    };

    return (
        <div className="result-box">
            Winner: {showWinner()}
        </div>
    );
};

export default GameResultComponent;