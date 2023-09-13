import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twStyles } from "~/src/twStyles";
import { ChevronLeft } from "./icons/chevrons/ChevronLeft";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function GoBackBtn(props: Props) {
    const {
        className,
        ...otherProps
    } = props;

    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <button
            type = "button"
            {...otherProps}
            className = {twMerge(
                "flex gap-x-6 items-center",
                twStyles.fontFigHeadingSVar,
                lightTheme ? "text-fig-ds-08" : "text-white",
                lightTheme ? "hover:text-fig-ds-07" : "hover:text-fig-ds-06",
                className
            )}
        >
            <ChevronLeft 
                aria-label = ""
                className = "w-2 h-3"
            />
            <span
                className = "-mb-1"
            >
                Go back
            </span>
        </button>
    );
}
