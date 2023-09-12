import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { LabelledInput } from "~/src/components/LabelledInput";
import { common } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/ItemsFormFields/common";
import { helpers } from "~/src/helpers";
import { Delete } from "~/src/components/icons/Delete";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";

type Item = DeepReadonly<InvoiceWithItemId["items"][number]>;

type Props = {
    item: Item,
    onChange: (newItem: Item) => void,
    onDeleteClick: () => void,
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
                        value: props.item.name,
                        onChange: e => props.onChange({...props.item, name: e.target.value}),
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
                            value: Math.max(props.item.quantity, 1),
                            onChange: e => props.onChange({...props.item, quantity: Number(e.target.value)}),
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
                            value: Math.max(props.item.price, 0),
                            onChange: e => props.onChange({...props.item, price: Number(e.target.value)}),
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
                                value: (props.item.quantity * props.item.price).toFixed(2),
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
                            onClick = {props.onDeleteClick}
                            className = "self-end mb-[20px]"
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
