import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { ItemFormField } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/ItemsFormFields/ItemFormField";
import { common } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/ItemsFormFields/common";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";

type Items = DeepReadonly<InvoiceWithItemId["items"]>;
type Item = Items[number];

type Props = {
    items: Items,
    onItemsChange: (newitems: Items) => void,
    onItemDelete: (item: Item) => void,
    formSubmitBtnClicked: boolean
};

export function ItemsFormFields(props: Props) {
    return (
        <div
            role = "table"
            aria-label = "items associated to the invoice"
        >
            <div
                role = "rowgroup"
            >
                <div
                    role = "row"
                    className = "relative"
                >
                    {
                        common.labels.map(label => (
                            <VisuallyHidden
                                key = {label.actualValue}
                                useSpanTag
                            >
                                <span
                                    role = "columnheader"
                                >
                                    {common.getNameNode(label)}
                                </span>
                            </VisuallyHidden>
                        ))
                    }
                </div>
            </div>
            <div
                role = "rowgroup"
            >
                {
                    props.items.map((item, itemNum) => (
                        <ItemFormField
                            key = {item.id} 
                            item = {item}
                            onChange = {newItem => props.onItemsChange(
                                props.items
                                    .map((curItem, curItemNum) => curItemNum === itemNum ? newItem : curItem)
                            )}
                            onDeleteClick = {() => props.onItemDelete(item)} 
                            formSubmitBtnClicked = {props.formSubmitBtnClicked}
                        />
                    ))
                }
            </div>
        </div>
    );
}
