import { Listbox } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "~/src/components/icons/chevrons/ChevronDown";
import { ChevronUp } from "~/src/components/icons/chevrons/ChevronUp";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { Invoice } from "~/src/types";

type PaymentTerms = Invoice["paymentTerms"];

type Props = {
    value: PaymentTerms,
    onChange: (newValue: PaymentTerms) => void,
    className?: string
};

function getText(paymentTerm: PaymentTerms) {
    return `Net ${paymentTerm} Day${paymentTerm === 1 ? "" : "s"}`;
}

const paymentTerms: readonly PaymentTerms[] = [
    1,
    7,
    14,
    30
] as const;

export function PaymentTermsSelect(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const commonPadding = "px-24px py-16px";
    const commonBorderRadius = "rounded-[8px]";

    return (
        <Listbox
            as = "div"
            value = {props.value}
            onChange = {props.onChange}
            className = {twMerge(
                helpers.formatClassNames(
                    `
                        relative
                        ${twStyles.fontFigHeadingSVar}
                    `
                ),
                props.className
            )}
        >
            {({ open }) => {
                const Chevron = open ? ChevronUp : ChevronDown;
                /*
                    min-h-[3.3rem]
                        To match the date picker's default height
                */
                return (
                    <>
                        <Listbox.Button
                            className = {helpers.formatClassNames(
                                `
                                    ${lightTheme ? "text-fig-ds-08" : "text-white"}
                                    ${lightTheme ? "bg-white" : "bg-fig-ds-04"}
                                    ${lightTheme ? "border-fig-ds-05" : "border-fig-ds-04"}
                                    ${commonPadding}
                                    ${commonBorderRadius}
                                    border
                                    w-full
                                    min-h-[3.3rem]
                                    outline-fig-ds-02
                                `
                            )}
                        >
                            <span
                                className = "flex justify-between items-center gap-x-1"
                            >
                                <span>
                                    {getText(props.value)}
                                </span>
                                <Chevron 
                                    aria-hidden
                                    className = "w-3 h-3 text-fig-ds-01"
                                />
                            </span>
                        </Listbox.Button>
                        <Listbox.Options
                            className = {helpers.formatClassNames(
                                `
                                    absolute
                                    w-full
                                    mt-2
                                    overflow-hidden
                                    shadow-[0_10px_20px_0_#00000040]
                                    outline-fig-ds-02
                                    ${commonBorderRadius}
                                    ${lightTheme ? "bg-white" : "bg-fig-ds-04"}
                                `
                            )}
                        >
                            {
                                paymentTerms.map((paymentTerm, paymentTermIdx) => (
                                    <Listbox.Option
                                        key = {paymentTerm}
                                        value = {paymentTerm}
                                        className = {helpers.formatClassNames(
                                            `
                                                ${commonPadding}
                                                cursor-pointer
                                                ${
                                                    helpers.passIfTrueElseEmpty(
                                                        paymentTermIdx !== paymentTerms.length,
                                                        `border-b ${
                                                            lightTheme 
                                                            ? "border-fig-ds-05" 
                                                            : "border-fig-ds-03"
                                                        }`    
                                                    )
                                                }
                                            `
                                        )}
                                    >
                                        {({ active }) => (
                                            <span
                                                className = {helpers.formatClassNames(
                                                    `
                                                        ${
                                                            active
                                                            ? "text-fig-ds-02"
                                                            : lightTheme
                                                              ? "text-fig-ds-08"
                                                              : "text-fig-ds-05"
                                                        }
                                                    `
                                                )}
                                            >
                                                {getText(paymentTerm)}
                                            </span>
                                        )}
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </>
                );
            }}
        </Listbox>
    );
}
