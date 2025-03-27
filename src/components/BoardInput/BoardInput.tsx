import './BoardInput.css'

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const BoardInput: React.FC<Props> = ({ value, onChange }) => {
    return (
        <textarea className="board-input" value={value} onChange={(e) => onChange(e.target.value)} />
    );
};

export default BoardInput;