import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { ChevronRight } from "~/src/components/icons/chevrons/ChevronRight";
import { LabelledId } from "~/src/components/InvoiceList/InvoiceListItem/LabelledId";
import { LabelledPaymentDue } from "~/src/components/InvoiceList/InvoiceListItem/LabelledPaymentDue";
import { LabelledClientName } from "~/src/components/InvoiceList/InvoiceListItem/LabelledClientName";
import { LabelledTotalAmount } from "~/src/components/InvoiceList/InvoiceListItem/LabelledTotalAmount";
import { LabelledStatus } from "~/src/components/InvoiceList/InvoiceListItem/LabelledStatus";
import { helpers } from "~/src/helpers";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";

type Props = {
    invoice: DeepReadonly<Invoice>
};

export function TabAndUp(props: Props) {
    const [theme] = useThemeContext();

    return (
        <div
            className = "hidden tabAndUp:flex gap-x-10 py-16px px-24px"
        >
            <div
                className = "relative flex gap-x-6 items-center"
            >
                <LabelledId 
                    value = {props.invoice.id}
                    className = "w-[8ch] relative z-20"
                />
                <LabelledPaymentDue 
                    value = {props.invoice.paymentDue}
                    className = "w-[14ch] relative z-20"
                />
            </div>
            <div
                className = {helpers.formatClassNames(
                    `
                        relative 
                        z-20 
                        flex-grow 
                        overflow-x-auto 
                        ${helpers.getScrollbarTwClassName(theme)} 
                        flex 
                        gap-x-2
                        justify-between 
                        items-center
                    `
                )}
            >
                <LabelledClientName 
                    value = {props.invoice.clientName}
                />
                <LabelledTotalAmount 
                    items = {props.invoice.items}
                />
            </div>
            <div
                className = "flex items-center gap-x-5 relative"
            >
                <LabelledStatus 
                    value = {props.invoice.status}
                />
                <ChevronRight 
                    className = "w-2 h-3"
                />
            </div>
        </div>
    );
}
