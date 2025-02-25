import { MouseEventHandler, useState } from "react";
import styles from "./button.module.scss"

interface ButtonProps {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    animated?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, animated = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isShimmerAnimating, setIsShimmerAnimating] = useState(false);
    
    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsShimmerAnimating(true);
        setTimeout(() => setIsShimmerAnimating(false), 500);
    };
    
    return (
        <button
            className={`${styles.button} 
                      ${isHovered ? styles.buttonHover : ''} 
                      ${isActive ? styles.buttonActive : ''} 
                      ${animated && !isHovered ? styles.pulseAnimation : ''}`}
            type="button"
            onClick={(e) => {
                setIsActive(true);
                setTimeout(() => setIsActive(false), 200);
                onClick(e);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
        >
            <div className={`${styles.shimmer} ${isShimmerAnimating ? styles.shimmerAnimate : ''} transition-all duration-500`}></div>
            {text}
        </button>
    );
};

export default Button;