import { twMerge } from "tailwind-merge";
import { Invoice } from "~/src/types";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twStyles } from "~/src/twStyles";

type Props = {
    value: Invoice["id"]
} & Partial<Record<`${"root" | "id" | "hash"}ClassName`, string>>;

export function InvoiceId(props: Props) {
    const [theme] = useThemeContext();

    return (
        <span
            className = {twMerge(
                twStyles.fontFigHeadingSVar,
                props.rootClassName
            )}
        >
            <span
                aria-hidden
                className = {twMerge(
                    "text-fig-ds-07",
                    props.hashClassName
                )}
            >
                #
            </span>
            <span
                className = {twMerge(
                    theme === "light" ? "text-fig-ds-08" : "text-white",
                    props.idClassName
                )}
            >
                {props.value}
            </span>
        </span>
    );
}
