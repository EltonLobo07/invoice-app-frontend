import { helpers } from "~/src/helpers";
import { LabelledInput } from "~/src/components/LabelledInput";
import { common } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/common";

type Address = ReturnType<typeof common.addressInitializer>; 

type Props = {
    formSubmitBtnCliked: boolean,
    address: Address,
    addressSetter: (newAddress: Partial<Address>) => void,
    requiredMsg?: string
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
                    children: "street address"
                }}
                nativeInputProps = {{
                    type: "text",
                    value: props.address.street,
                    onChange: e => props.addressSetter({street: e.target.value})
                }}
                className = "w-full"
                _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                requiredMsg = {props.requiredMsg}
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
                        value: props.address.city,
                        onChange: e => props.addressSetter({city: e.target.value}),
                        className: "w-full"
                    }}
                    className = {labelledInputClassName}
                    _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                    requiredMsg = {props.requiredMsg}
                />
                <LabelledInput 
                    nativeSpanProps = {{
                        children: "post code"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        value: props.address.postCode,
                        onChange: e => props.addressSetter({postCode: e.target.value}),
                        className: "w-full"
                    }}
                    className = {labelledInputClassName}
                    _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                    requiredMsg = {props.requiredMsg}
                />
                <LabelledInput 
                    nativeSpanProps = {{
                        children: "country"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        value: props.address.country,
                        onChange: e => props.addressSetter({country: e.target.value}),
                        className: "full"
                    }}
                    className = {labelledInputClassName}
                    _formSubmitBtnClicked = {props.formSubmitBtnCliked}
                    requiredMsg = {props.requiredMsg}
                />
            </div>
        </div>
    );
}
