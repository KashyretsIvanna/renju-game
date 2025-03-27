import './GameOptionsSelector.css'

interface Props {
    onSelect: (value: string) => void;
    options: Record<string, string>;
}

const GameOptionsSelector: React.FC<Props> = ({ onSelect, options }) => {
    return (
        <div className="preset-selector">
            <label htmlFor="preset-select">Game options:</label>
            <select id="preset-select" onChange={(e) => onSelect(options[e.target.value])}>
                {Object.keys(options).map((label) => (
                    <option key={label} value={label}>{label}</option>
                ))}
            </select>
        </div>
    );
};

export default GameOptionsSelector;