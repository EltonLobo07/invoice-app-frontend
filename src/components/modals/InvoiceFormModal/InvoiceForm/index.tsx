import React from "react";
import { GoBackBtn } from "~/src/components/GoBackBtn";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { twStyles } from "~/src/twStyles";
import { DeepReadonly } from "~/src/types/helpers";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { InvoiceId } from "~/src/components/InvoiceId";
import { AddressFormFields } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/AddressFormFields";
import { LabelledInput } from "~/src/components/modals/InvoiceFormModal/LabelledInput";
import { Button } from "~/src/components/Button";
import { ItemsFormFields } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/ItemsFormFields";
import { PaymentTermsSelect } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/PaymentTermsSelect";
import { SpanLabel } from "~/src/components/modals/InvoiceFormModal/SpanLabel";

type Props = {
    invoiceToEdit?: DeepReadonly<InvoiceWithItemId>
    onCancel: () => void
};

export function InvoiceForm(props: Props) {
    const [formSubmitBtnClicked] = React.useState(false);
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const horizontalPadding = "px-24px tabAndUp:px-56px";
    const fromToLegendClassNames = `text-fig-ds-01 mb-6 ${twStyles.fontFigHeadingSVar}`;
    const commonMarginTop = "mt-10 tabAndUp:mt-12";
    const showAllFieldsMustBeAddedMsg = formSubmitBtnClicked; // Todo (Incomplete)

    const actionBtnGapClassName = "gap-x-[8px] gap-y-2";
    let actionBtnsJSX: JSX.Element;
    if (props.invoiceToEdit) {
        actionBtnsJSX = (
            <>
                <Button
                    customType = "plain"
                    nativeBtnProps = {{
                        type: "button",
                        className: "ml-auto"
                    }}
                >
                    cancel
                </Button>
                <Button
                    customType = "primary"
                    nativeBtnProps = {{
                        type: "button"
                    }}
                >
                    save changes
                </Button>
            </>
        );
    } else {
        actionBtnsJSX = (
            <>
                <Button
                    customType = "plain"
                    nativeBtnProps = {{
                        type: "button",
                        className: "self-center"
                    }}
                >
                    discard
                </Button>
                <div
                    className = {helpers.formatClassNames(
                        `
                            ml-auto
                            flex justify-end flex-wrap
                            ${actionBtnGapClassName}
                        `
                    )}
                >
                    <Button
                        customType = "plain-darker"
                        nativeBtnProps = {{
                            type: "button",
                            className: "normal-case ml-auto whitespace-nowrap"
                        }}
                    >
                        Save as Draft
                    </Button>
                    <Button
                        customType = "primary"
                        nativeBtnProps = {{
                            type: "submit",
                            className: "whitespace-nowrap"
                        }}
                    >
                        save & send
                    </Button>
                </div>
            </>
        );
    }

    return (
        <form
            className = "w-full h-full overflow-y-auto flex flex-col capitalize"
        >
            <GoBackBtn 
                onClick = {props.onCancel}
                className = {helpers.formatClassNames(
                    `
                        ${horizontalPadding}
                        mb-[1.625rem]
                        tabAndUp:hidden
                    `
                )}
            />
            <h3
                aria-hidden
                className = {helpers.formatClassNames(
                    `
                        ${horizontalPadding}
                        ${twStyles.fontFigHeadingM}
                        ${lightTheme ? "text-fig-ds-08" : "text-white"}
                        relative
                        mb-[1.375rem] tabAndUp:mb-[2.875rem]
                    `
                )}
            >
                {
                    props.invoiceToEdit
                    ? (
                        <>
                            {"edit "}
                            <VisuallyHidden
                                useSpanTag
                            >
                                invoice with unique identifier
                            </VisuallyHidden> 
                            <InvoiceId 
                                value = {props.invoiceToEdit.id}
                                rootClassName = {twStyles.fontFigHeadingM}
                            />
                        </>
                    )
                    : "new invoice"
                }  
            </h3>
            <div
                className = {helpers.formatClassNames(
                    `
                        flex-grow overflow-y-auto
                        flex flex-col
                        ${horizontalPadding}
                    `
                )}
            >
                <fieldset>
                    <legend
                        className = {fromToLegendClassNames}
                    >
                        bill from
                    </legend>
                    <AddressFormFields
                        formSubmitBtnCliked = {formSubmitBtnClicked}
                    />
                </fieldset>
                <fieldset
                    className = {commonMarginTop}
                >
                    <legend
                        className = {fromToLegendClassNames}
                    >
                        bill to
                    </legend>
                    <div
                        className = "flex flex-col gap-y-6"
                    >
                        <LabelledInput 
                            nativeSpanProps = {{
                                children: "client's name"
                            }}
                            nativeInputProps = {{
                                type: "text"
                            }}
                            _formSubmitBtnClicked = {formSubmitBtnClicked}
                        />
                        <LabelledInput 
                            nativeSpanProps = {{
                                children: "client's email"
                            }}
                            nativeInputProps = {{
                                type: "email",
                                placeholder: "e.g. email@example.com"
                            }}
                            _formSubmitBtnClicked = {formSubmitBtnClicked}
                        />
                        <AddressFormFields 
                            formSubmitBtnCliked = {formSubmitBtnClicked}
                        />
                    </div>
                </fieldset>
                <fieldset
                    className = {helpers.formatClassNames(
                        `
                            relative
                            flex gap-6 flex-wrap
                            ${commonMarginTop}
                        `
                    )}
                >
                    <VisuallyHidden>
                        <legend>
                            basic details
                        </legend>
                    </VisuallyHidden>
                    <LabelledInput 
                        nativeSpanProps = {{
                            children: "invoice date"
                        }}
                        nativeInputProps = {{
                            type: "date",
                            style: {
                                colorScheme: theme
                            }
                        }}
                        _formSubmitBtnClicked = {formSubmitBtnClicked}
                        className = "basis-60 flex-grow"
                    />
                    <label
                        className = "basis-60 flex-grow flex flex-col gap-y-2"
                    >
                        <SpanLabel>
                            payment terms
                        </SpanLabel>
                        <PaymentTermsSelect 
                            value = {1}
                            onChange = {() => {}}
                        />
                    </label>
                    <LabelledInput 
                        nativeSpanProps = {{
                            children: "project description"
                        }}
                        nativeInputProps = {{
                            type: "text"
                        }}
                        _formSubmitBtnClicked = {formSubmitBtnClicked}
                        className = "w-full"
                    />
                </fieldset>
                <fieldset
                    className = "mt-16 tabAndUp:mt-7 laptopAndUp:mt-9"
                >
                    <legend
                        className = {helpers.formatClassNames(
                            `
                                ${twStyles.fontFigHeadingS}
                                relative
                                text-stone-wash
                                inline-block mb-5 tabAndUp:mb-4
                            `
                        )}
                    >
                        <VisuallyHidden
                            useSpanTag
                        >
                            item table
                        </VisuallyHidden>
                        <span
                            aria-hidden
                            className = "inline-block"
                        >
                            item list
                        </span>
                    </legend>
                    <ItemsFormFields
                        items = {[]}
                        formSubmitBtnClicked = {formSubmitBtnClicked}
                    />
                    {
                        (props.invoiceToEdit?.items.length ?? 0 === 0) && (
                            <div
                                className = {helpers.formatClassNames(
                                    `
                                        mb-4
                                        normal-case
                                        flex justify-center
                                        ${twStyles.fontFigBetweenBodyAndHeading}
                                        ${lightTheme ? "text-black" : "text-white"}
                                    `
                                )}
                            >
                                No item added
                            </div>
                        )
                    }
                    <Button
                        customType = "secondary"
                        nativeBtnProps = {{
                            type: "button",
                            className: "w-full"
                        }}
                    >
                        add new items
                    </Button>
                </fieldset>
            </div>
            <div
                role = "alert"
                className = {helpers.formatClassNames(
                    `
                        ${helpers.passIfTrueElseEmpty(showAllFieldsMustBeAddedMsg, "hidden")}
                        ${twStyles.fontFigBetweenBodyAndHeading}
                        ${horizontalPadding}
                        mt-8
                        normal-case
                        text-fig-ds-09
                    `
                )}
            >
                All fields must be added if you wish to save & send
            </div>
            <fieldset
                className = {helpers.formatClassNames(
                    `
                        relative
                        flex
                        py-5 tabAndUp:py-8
                        tabAndUp:rounded-r-20px
                        ${lightTheme ? "bg-white" : "bg-fig-ds-12"}
                        ${horizontalPadding}
                        ${actionBtnGapClassName}
                    `
                )}
            >
                <VisuallyHidden>
                    <legend>
                        actions
                    </legend>
                </VisuallyHidden>
                {actionBtnsJSX}
            </fieldset>
        </form>
    );
}
