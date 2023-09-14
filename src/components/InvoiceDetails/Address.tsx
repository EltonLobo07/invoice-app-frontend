import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { InvoiceAddress } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";

type Props = {
    value: DeepReadonly<InvoiceAddress>,
    twOpacity: string,
    className?: string
};

export function Address(props: Props) {
    const [theme] = useThemeContext();

    function getSpanNode(valueToTest: string, defaultText: string) {
        const isValueEmptyStr = valueToTest.length === 0;
        return (
            <span
                className = {helpers.passIfTrueElseEmpty(isValueEmptyStr, props.twOpacity)}
            >
                {valueToTest || defaultText}
            </span>
        );  
    }

    return (
        <p
            className = {twMerge(
                "flex flex-col",
                twStyles.fontFigBody,
                theme === "light" ? "text-fig-ds-07" : "text-fig-ds-05",
                props.className
            )}
        >
            {getSpanNode(props.value.street, "no street added")}
            {getSpanNode(props.value.city, "no city added")}
            {getSpanNode(props.value.postCode, "no postcode added")}
            {getSpanNode(props.value.country, "no country added")}
        </p>
    );
}
