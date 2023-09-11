import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { LabelledInput } from "~/src/components/modals/InvoiceFormModal/LabelledInput";
import { common } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/ItemsFormFields/common";
import { helpers } from "~/src/helpers";
import { Delete } from "~/src/components/icons/Delete";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";

type Props = {
    item: DeepReadonly<InvoiceWithItemId["items"][number]>,
    formSubmitBtnClicked: boolean
};

export function ItemFormField(props: Props) {
    const [theme] = useThemeContext();
    const commonFlexClassNames = "flex gap-x-4 gap-y-6 flex-wrap";

    return (
        <div
            role = "row"
            className = "mb-12"
        >
            <div
                role = "cell"
                className = {commonFlexClassNames}
            >
                <LabelledInput 
                    nativeSpanProps = {{
                        children: (
                            <span>
                                {common.getNameNode(common.labels[0])}
                            </span>
                        )
                    }}
                    nativeInputProps = {{
                        type: "text",
                        className: "w-full"
                    }}
                    className = "flex-grow basis-[13.375rem]"
                    _formSubmitBtnClicked = {props.formSubmitBtnClicked}
                />
                <div
                    className = {helpers.formatClassNames(
                        `
                            flex-grow
                            ${commonFlexClassNames}
                        `
                    )}
                >
                    <LabelledInput 
                        nativeSpanProps = {{
                            children: common.getNameNode(common.labels[1])
                        }}
                        nativeInputProps = {{
                            type: "number",
                            className: "w-full"
                        }}
                        _formSubmitBtnClicked = {props.formSubmitBtnClicked}
                        className = "flex-grow-[5] basis-12"
                    />
                    <LabelledInput 
                        nativeSpanProps = {{
                            children: common.getNameNode(common.labels[2])
                        }}
                        nativeInputProps = {{
                            type: "number",
                            className: "w-full"
                        }}
                        _formSubmitBtnClicked = {props.formSubmitBtnClicked}
                        className = "flex-grow-[10] basis-[6.25rem]"
                    />
                    <div
                        className = {helpers.formatClassNames(
                            `
                                flex-grow
                                ${commonFlexClassNames}
                            `
                        )}
                    >
                        <LabelledInput 
                            nativeSpanProps = {{
                                children: common.getNameNode(common.labels[3])
                            }}
                            nativeInputProps = {{
                                type: "number",
                                readOnly: true,
                                className: helpers.formatClassNames(
                                    `
                                        w-full 
                                        border-none 
                                        px-0 
                                        bg-inherit 
                                        ${theme === "light" ? "text-fig-ds-06" : "text-fig-ds-05"}
                                    `
                                )
                            }}
                            _formSubmitBtnClicked = {props.formSubmitBtnClicked}
                            className = "flex-grow basis-[4.25rem]"
                        />
                        <button
                            className = "self-end mb-[12px]"
                        >
                            <Delete
                                aria-label = "delete item"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
