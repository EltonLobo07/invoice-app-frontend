import { Invoice } from "~/src/types";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { InvoiceStatus } from "~/src/components/InvoiceStatus";

type Props = {
    value: Invoice["status"],
    className?: string
};

export function LabelledStatus(props: Props) {
    return (
        <>
            <VisuallyHidden>
                status:
            </VisuallyHidden>
            <InvoiceStatus 
                value = {props.value}
            />
        </>
    );
}
