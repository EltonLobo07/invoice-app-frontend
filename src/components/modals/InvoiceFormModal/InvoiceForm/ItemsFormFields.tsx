import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { SpanLabel } from "~/src/components/modals/InvoiceFormModal/SpanLabel";

type Label = Readonly<{
    actualValue: string,
    displayValue?: string,
    shouldBeVisuallyHidden: boolean
}>;

const labels: readonly Label[] = [
    {actualValue: "item name", shouldBeVisuallyHidden: false},
    {actualValue: "quantity", displayValue: "Qty.", shouldBeVisuallyHidden: false},
    {actualValue: "price", shouldBeVisuallyHidden: false},
    {actualValue: "total", shouldBeVisuallyHidden: false},
    {actualValue: "delete item", shouldBeVisuallyHidden: true}
];

function getNameNode(label: Label) {
    let res: JSX.Element;
    if (label.displayValue === undefined) {
        res = (
            <>
                {label.actualValue}
            </>
        );
    } else {
        res = (
            <>
                <VisuallyHidden
                    useSpanTag
                >
                    {label.actualValue}
                </VisuallyHidden>
                <span>
                    {label.displayValue}
                </span>
            </>
        );
    }
    return res;
}

export function ItemsFormFields() {
    const gridClassName = "grid-cols-[minmax(13.375rem,1fr)_minmax(3rem,1fr)_repeat(2,minmax(6.25rem,1fr),min-content)]";

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
                    className = "relative hidden tabAndUp:table-row"
                >
                    {
                        labels.map(label => {
                            const res = (
                                <SpanLabel
                                    key = {label.actualValue}
                                    role = "columnheader"
                                >
                                    {getNameNode(label)}
                                </SpanLabel>
                            );
                            if (!label.shouldBeVisuallyHidden) {
                                return res;
                            }
                            return (
                                <VisuallyHidden>
                                    {res}
                                </VisuallyHidden>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
