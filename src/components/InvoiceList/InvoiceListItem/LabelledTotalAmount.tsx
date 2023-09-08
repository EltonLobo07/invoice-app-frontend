import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { Amount } from "~/src/components/Amount";
import { helpers } from "~/src/helpers";
import { twMerge } from "tailwind-merge";
import { twStyles } from "~/src/twStyles";

type Props = {
    items: DeepReadonly<Invoice["items"]>,
    className?: string
};

export function LabelledTotalAmount(props: Props)  {
    return (
        <>
            <VisuallyHidden>
                total amount:
            </VisuallyHidden>
            <Amount 
                value = {helpers.getInvoiceItemsTotal(props.items)}
                className = {twMerge(
                    twStyles.fontFigHeadingS,
                    props.className
                )}
            />
        </>
    );
}
