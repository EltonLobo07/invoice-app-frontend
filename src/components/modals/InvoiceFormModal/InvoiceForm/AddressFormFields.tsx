import { helpers } from "~/src/helpers";
import { LabelledInput } from "~/src/components/modals/InvoiceFormModal/LabelledInput";

type Props = {
    formSubmitBtnCliked: boolean
};

export function AddressFormFields(props: Props) {
    const commonVerticalGap = "gap-y-6";
    const labelledInputClassName = "w-[9.25rem] flex-grow";

    return (
        <div
            className = {helpers.formatClassNames(
                `
                    flex flex-col
                    ${commonVerticalGap}
                `
            )}
        >
            <LabelledInput 
                nativeSpanProps = {{
                    children: "sender address"
                }}
                nativeInputProps = {{
                    type: "text"
                }}
                className = "w-full"
                _formSubmitBtnClicked = {props.formSubmitBtnCliked}
            />
            <div
                className = {helpers.formatClassNames(
                    `
                        flex gap-x-[24px] flex-wrap
                        ${commonVerticalGap}
                    `
                )}
            >
                <LabelledInput 
                    nativeSpanProps = {{
                        children: "city"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        className: "w-full"
                    }}
                    className = {labelledInputClassName}
                    _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                />
                <LabelledInput 
                    nativeSpanProps = {{
                        children: "post code"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        className: "w-full"
                    }}
                    className = {labelledInputClassName}
                    _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                />
                <LabelledInput 
                    nativeSpanProps = {{
                        children: "country"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        className: "full"
                    }}
                    className = {labelledInputClassName}
                    _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                />
            </div>
        </div>
    );
}
