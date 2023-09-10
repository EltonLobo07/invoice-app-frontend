import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twStyles } from "~/src/twStyles";

type Props = JSX.IntrinsicElements["span"];

export function SpanLabel(props: Props) {
    const {
        children,
        ...otherProps
    } = props;

    const [theme] = useThemeContext();

    return (
        <span
            {...otherProps}
            className = {twMerge(
                "inline-block",
                twStyles.fontFigBodyVar,
                theme === "light" ? "text-fig-ds-07" : "text-fig-ds-05",
                otherProps.className
            )}
        >
            {children}
        </span>
    );
}
