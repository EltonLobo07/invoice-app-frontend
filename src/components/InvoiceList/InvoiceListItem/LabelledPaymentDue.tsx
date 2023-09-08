import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { InvoiceDate } from "~/src/types";

type Props = {
    value: InvoiceDate,
    className?: string
};

export function LabelledPaymentDue(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <>
            <VisuallyHidden>
                payment due:
            </VisuallyHidden>
            <div
                className = {twMerge(
                    twStyles.fontFigBody,
                    props.className
                )}
            >
                <span
                    aria-hidden
                    className = {`capitalize ${lightTheme ? "text-fig-ds-06" : "text-fig-ds-05"}`}
                >
                    due&nbsp;
                </span>
                <span
                    className = {lightTheme ? "text-fig-ds-07" : "text-fig-ds-05"}
                >
                    {helpers.convertToDisplayableDateStr(props.value)}
                </span>
            </div>
        </>
    );
}
