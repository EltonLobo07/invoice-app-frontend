import { twStyles } from "~/src/twStyles";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twMerge } from "tailwind-merge";

type Props = {
    value: string,
    className?: string
};

export function LabelledClientName(props: Props) {
    const [theme] = useThemeContext();

    return (
        <>
            <VisuallyHidden>
                client name:
            </VisuallyHidden>
            <span
                className = {twMerge(
                    "capitalize whitespace-nowrap",
                    twStyles.fontFigBody,
                    theme === "light" ? "text-sky-snail-blue" : "text-white",
                    props.className
                )}
            >
                {props.value}
            </span>
        </>
    );
}
