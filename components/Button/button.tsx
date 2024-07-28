import { MouseEventHandler } from "react";
import styles from "./button.module.scss"

interface Button {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Button> = ({ text, onClick }) => {
    return (
        <button
            className={`${styles.btn}`}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;