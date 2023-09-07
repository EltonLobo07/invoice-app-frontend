import { twMerge } from "tailwind-merge";
import { useCurrencyContext } from "~/src/custom-hooks/useCurrencyContext";

type Props = {
    value: number,
    className?: string
};

export function Amount(props: Props) {
    const [currency] = useCurrencyContext();

    return (
        <span
            className = {twMerge(
                "whitespace-nowrap",
                props.className
            )}
        >
            {`${currency} ${props.value.toFixed(2)}`}
        </span>
    );
}
