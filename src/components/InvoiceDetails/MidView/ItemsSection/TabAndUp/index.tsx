import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { DeepReadonly } from "~/src/types/helpers";
import { TableRow } from "~/src/components/InvoiceDetails/MidView/ItemsSection/TabAndUp/TableRow";
import { InvoiceWithItemId } from "~/src/services/invoiceService";

type Props = {
    items: DeepReadonly<InvoiceWithItemId["items"]>
};

export function TabAndUp(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const colHeadingHorizontalAndBottomPadding = "px-2 pb-8";

    return (
        <table
            className = "hidden tabAndUp:table w-full border-separate px-24px py-32px pb-8px"
        >
            <caption
                className = "relative"
            >
                <VisuallyHidden>
                    details of the items associated with the invoice
                </VisuallyHidden>
            </caption>
            <thead
                className = {helpers.formatClassNames(
                    `
                        ${twStyles.fontFigBody}
                        ${lightTheme ? "text-fig-ds-07" : "text-fig-ds-05"}
                        pb-8
                    `
                )}
            >
                <tr>
                    <th
                        scope = "col"
                        className = {helpers.formatClassNames(
                            `
                                capitalize text-start
                                ${colHeadingHorizontalAndBottomPadding}
                            `
                        )}
                    >
                        item name
                    </th>
                    <th
                        scope = "col"
                        className = {helpers.formatClassNames(
                            `
                                relative
                                ${colHeadingHorizontalAndBottomPadding}
                            `
                        )}
                    >
                        <VisuallyHidden
                            useSpanTag
                        >
                            quantity
                        </VisuallyHidden>
                        <span
                            aria-hidden
                            className = "uppercase"
                        >
                            qty.
                        </span>
                    </th>
                    <th
                        scope = "col"
                        className = {helpers.formatClassNames(
                            `
                                capitalize text-end
                                ${colHeadingHorizontalAndBottomPadding}
                            `
                        )}
                    >
                        price
                    </th>
                    <th
                        scope = "col"
                        className = {helpers.formatClassNames(
                            `
                                capitalize text-end
                                ${colHeadingHorizontalAndBottomPadding}
                            `
                        )}
                    >
                        total
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    props.items.map(item => (
                        <TableRow
                            key = {item.id}
                            item = {item}
                        />
                    ))
                }
            </tbody>
        </table>
    );
}
