import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { InvoiceId } from "~/src/components/InvoiceId";

type Props = {
    value: string,
    className?: string
};

export function LabelledId(props: Props) {
    return (
        <>
            <VisuallyHidden>
                unique identifier:
            </VisuallyHidden>
            <InvoiceId 
                value = {props.value}
                rootClassName = {props.className}
            />
        </>
    );
}
