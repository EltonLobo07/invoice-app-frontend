import { SectionH3Labelled } from "~/src/components/InvoiceDetails/MidView/SectionH3Labelled";
import { TabAndUp } from "~/src/components/InvoiceDetails/MidView/ItemsSection/TabAndUp";
import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { Mobile } from "~/src/components/InvoiceDetails/MidView/ItemsSection/Mobile";
import { Amount } from "~/src/components/Amount";
import { twStyles } from "~/src/twStyles";

type Props = {
    items: DeepReadonly<InvoiceWithItemId["items"]>
};

export function ItemsSection(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <SectionH3Labelled
            hideH3
            label = "items"
            className = {helpers.formatClassNames(
                `
                    ${lightTheme ? "bg-wash-me" : "bg-fig-ds-04"}
                    rounded-[10px]
                    overflow-hidden
                `
            )}
        >   
            <TabAndUp
                items = {props.items}
            />
            <Mobile 
                items = {props.items}
            />
            <section
                aria-label = "grand total"
                className = {helpers.formatClassNames(
                    `
                        flex justify-between items-center 
                        px-24px tabAndUp:px-32px
                        py-[1.625rem] tabAndUp:py-[1.6875rem]
                        text-white
                        ${lightTheme ? "bg-carbon-blue" : "bg-fig-ds-08"}
                    `
                )}
            >
                <h4
                    className = {helpers.formatClassNames(
                        `
                            capitalize
                            ${twStyles.fontFigBody}    
                        `
                    )}
                >
                    <span
                        className = "hidden tabAndUp:inline-block"
                    >
                        amount due
                    </span>
                    <span
                        className = "inline-block tabAndUp:hidden"
                    >
                        grand total
                    </span>
                </h4>
                <Amount 
                    value = {helpers.getInvoiceItemsTotal(props.items)}
                    className = {twStyles.fontFigHeadingM}
                />
            </section>
        </SectionH3Labelled>
    );
}
