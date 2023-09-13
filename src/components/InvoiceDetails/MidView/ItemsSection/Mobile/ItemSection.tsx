import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { common } from "~/src/components/InvoiceDetails/MidView/ItemsSection/common";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { SectionH5Labelled } from "~/src/components/InvoiceDetails/MidView/ItemsSection/Mobile/SectionH5Labelled";
import { Amount } from "~/src/components/Amount";

type Props = {
    item: DeepReadonly<InvoiceWithItemId["items"][number]>
};

export function ItemSection(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const title = props.item.name || common.DEFAULT_ITEM_NAME;

    return (
        <section
            aria-label = {title}
            className = "flex justify-between flex-wrap gap-y-2 overflow-x-auto"
        >
            <div
                className = "flex flex-col gap-y-2"
            >
                <h4
                    className = {helpers.formatClassNames(
                        `
                            break-all hyphens-auto
                            ${twStyles.fontFigHeadingS}
                            ${lightTheme ? "text-fig-ds-08" : "text-white"}
                        `
                    )}
                >
                    {title}
                </h4>
                <div
                    className = {helpers.formatClassNames(
                        `
                            flex gap-x-1
                            ${twStyles.fontFigHeadingS}
                            ${lightTheme ? "text-fig-ds-07" : "text-fig-ds-06"}
                        `
                    )}
                >
                    <SectionH5Labelled
                        label = "quantity"
                    >
                        {props.item.quantity}
                    </SectionH5Labelled>
                    <span
                        aria-hidden
                    >
                        x
                    </span>
                    <SectionH5Labelled
                        label = "price"
                    >
                        <Amount 
                            value = {props.item.price}
                        />
                    </SectionH5Labelled>
                </div>
            </div>
            <SectionH5Labelled
                label = "total"
                className = "self-center"
            >
                <Amount 
                    value = {props.item.total}
                    className = {helpers.formatClassNames(
                        `
                            ${twStyles.fontFigHeadingS}
                            ${lightTheme ? "text-fig-ds-08" : "text-white"}
                        `
                    )}
                />
            </SectionH5Labelled>
        </section>
    );
}
