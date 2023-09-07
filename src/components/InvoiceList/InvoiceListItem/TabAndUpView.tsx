import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { InvoiceId } from "~/src/components/InvoiceList/InvoiceListItem/InvoiceId";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { Amount } from "~/src/components/Amount";
import { InvoiceStatus } from "~/src/components/InvoiceStatus";
import { ChevronRight } from "~/src/components/icons/chevrons/ChevronRight";

type Props = {
    invoice: DeepReadonly<Invoice>
};

export function TabAndUpView(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <div
            className = "hidden tabAndUp:flex gap-x-10 py-16px px-24px"
        >
            <div
                className = "relative flex gap-x-6 items-center"
            >
                <VisuallyHidden>
                    unique identifier:
                </VisuallyHidden>
                <InvoiceId 
                    id = {props.invoice.id}
                    rootClassName = "w-[8ch]"
                />
                <VisuallyHidden>
                    payment due:
                </VisuallyHidden>
                <div
                    className = {`
                        ${twStyles.fontFigBody}
                        w-[14ch]
                    `}
                >
                    <span
                        aria-hidden
                        className = {`capitalize ${lightTheme ? "text-fig-ds-06" : "text-fig-ds-05"}`}
                    >
                        due&nbsp;
                    </span>
                    <span
                        className = {lightTheme ? "text-fig-ds-07" : "text-fig-ds-05"}
                    >
                        {helpers.convertToDisplayableDateStr(props.invoice.paymentDue)}
                    </span>
                </div>
            </div>
            <div
                className = "relative flex-grow overflow-x-auto gap-x-2 flex justify-between items-center"
            >
                <VisuallyHidden>
                    client name:
                </VisuallyHidden>
                <span
                    className = {`
                        capitalize whitespace-nowrap
                        ${twStyles.fontFigBody}
                        ${lightTheme ? "text-sky-snail-blue" : "text-white"}
                    `}
                >
                    {props.invoice.clientName}
                </span>
                <VisuallyHidden>
                    total amount:
                </VisuallyHidden>
                <Amount 
                    value = {helpers.getInvoiceItemsTotal(props.invoice.items)}
                    className = {twStyles.fontFigHeadingS}
                />
            </div>
            <div
                className = "flex items-center gap-x-5 relative"
            >
                <VisuallyHidden>
                    status:
                </VisuallyHidden>
                <InvoiceStatus
                    value = {props.invoice.status}
                />
                <ChevronRight 
                    className = "w-2 h-3"
                />
            </div>
        </div>
    );
}
