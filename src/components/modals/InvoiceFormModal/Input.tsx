import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twStyles } from "~/src/twStyles";

type Props = JSX.IntrinsicElements["input"];

export function Input(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <input
            {...props}
            className = {twMerge(
                lightTheme ? "text-fig-ds-08" : "text-white",
                lightTheme ? "bg-white" : "bg-fig-ds-04",
                lightTheme ? "border-fig-ds-05" : "border-fig-ds-04",
                twStyles.fontFigHeadingSVar,
                "px-[24px] pt-[1.0625rem] pb-[0.9375rem]",
                "rounded-[0.25rem]",
                "outline-fig-ds-02",
                "border",
                props.className
            )}
        />
    );
}
