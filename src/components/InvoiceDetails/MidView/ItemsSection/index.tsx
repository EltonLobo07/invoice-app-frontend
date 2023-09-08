import { SectionH3Labelled } from "~/src/components/InvoiceDetails/MidView/SectionH3Labelled";
import { TabAndUp } from "~/src/components/InvoiceDetails/MidView/ItemsSection/TabAndUp";
import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { DeepReadonly } from "~/src/types/helpers";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { Mobile } from "~/src/components/InvoiceDetails/MidView/ItemsSection/Mobile";

type Props = {
    items: DeepReadonly<InvoiceWithItemId["items"]>
};

export function ItemsSection(props: Props) {
    const [theme] = useThemeContext();

    return (
        <SectionH3Labelled
            hideH3
            label = "items"
            className = {helpers.formatClassNames(
                `
                    ${theme === "light" ? "bg-wash-me" : "bg-fig-ds-04"}
                    rounded-[10px]
                `
            )}
        >   
            <TabAndUp
                items = {props.items}
            />
            <Mobile 
                items = {props.items}
            />
        </SectionH3Labelled>
    );
}
