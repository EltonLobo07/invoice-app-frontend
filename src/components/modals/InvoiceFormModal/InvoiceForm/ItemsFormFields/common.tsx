import { VisuallyHidden } from "~/src/components/VisuallyHidden";

type Label = Readonly<{
    actualValue: string,
    displayValue?: string,
    shouldBeVisuallyHidden: boolean
}>;

export const labels: readonly Label[] = [
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

export const common = {
    getNameNode,
    labels
};
