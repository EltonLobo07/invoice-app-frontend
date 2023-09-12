import { twMerge } from "tailwind-merge";
import { SpanLabel } from "~/src/components/modals/InvoiceFormModal/SpanLabel";
import { Input } from "~/src/components/modals/InvoiceFormModal/Input";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";

type Props = 
    Omit<JSX.IntrinsicElements["label"], "children">
    & {_formSubmitBtnClicked?: boolean}
    & {nativeInputProps?: JSX.IntrinsicElements["input"]}
    & {nativeSpanProps?: JSX.IntrinsicElements["span"]};

export type LabelledInputProps = Props;

export function LabelledInput(props: Props) {
    const {
        nativeInputProps,
        nativeSpanProps,
        _formSubmitBtnClicked,
        ...labelProps
    } = props;

    const showRequired = _formSubmitBtnClicked && !String(nativeInputProps?.value);
    const showRequiredTxtColor = "text-fig-ds-09";
    const spanProps = nativeSpanProps ?? {};
    spanProps.className = twMerge(
        showRequired && showRequiredTxtColor,
        spanProps.className
    );
    const inputProps = nativeInputProps ?? {};
    inputProps.className = twMerge(
        showRequired && "border-fig-ds-09",
        inputProps.className
    );

    let labelJSX = <SpanLabel {...spanProps} />;
    if (showRequired) {
        labelJSX = (
            <span
                className = "flex justify-between gap-x-1"
            >
                {labelJSX}
                <span
                    className = {helpers.formatClassNames(
                        `
                            normal-case
                            pr-16px
                            ${showRequiredTxtColor}
                            ${twStyles.fontFigBetweenBodyAndHeading}
                        `
                    )}
                >
                    can't be empty
                </span>
            </span>
        );
    }

    return (
        <label
            {...labelProps}
            className = {twMerge(
                "flex flex-col gap-y-2",
                labelProps.className
            )}
        >
            {labelJSX}
            <Input 
                {...inputProps}
            />
        </label>
    );
}
