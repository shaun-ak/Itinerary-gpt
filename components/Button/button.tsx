import { MouseEventHandler } from "react";

interface Button {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Button> = ({ text, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;