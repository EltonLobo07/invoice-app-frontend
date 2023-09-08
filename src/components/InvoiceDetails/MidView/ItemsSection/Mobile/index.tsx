import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { ItemSection } from "~/src/components/InvoiceDetails/MidView/ItemsSection/Mobile/ItemSection";

type Props = {
    items: DeepReadonly<InvoiceWithItemId["items"]>
};

export function Mobile(props: Props) {
    return (
        <div
            className = "flex tabAndUp:hidden flex-col gap-y-6 px-24px py-6"
        >
            {
                props.items.map(item => (
                    <ItemSection 
                        key = {item.id}
                        item = {item}
                    />
                ))
            }
        </div>
    );
}
