import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twStyles } from "~/src/twStyles";

type Props = JSX.IntrinsicElements["input"];

export function Input(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    /*
        min-h-[3.3rem]
            To match the date picker's default height
    */
    return (
        <input
            {...props}
            className = {twMerge(
                lightTheme ? "text-fig-ds-08" : "text-white",
                lightTheme ? "bg-white" : "bg-fig-ds-04",
                lightTheme ? "border-fig-ds-05" : "border-fig-ds-04",
                twStyles.fontFigHeadingSVar,
                "px-[24px] py-[16px]",
                "rounded-[8px]",
                "outline-fig-ds-02",
                "min-h-[3.3rem]",
                "border",
                props.className
            )}
        />
    );
}
