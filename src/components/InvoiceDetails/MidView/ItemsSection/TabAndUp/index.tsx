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
    const colHeadingBottomPadding = "pb-8";

    return (
        <table
            className = "hidden tabAndUp:table w-full border-separate p-32px pb-8px"
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
                                ${colHeadingBottomPadding}
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
                                ${colHeadingBottomPadding}
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
                                ${colHeadingBottomPadding}
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
                                ${colHeadingBottomPadding}
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
