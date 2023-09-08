import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { commonTwStyles } from "~/src/components/InvoiceDetails/common";
import { InvoiceId } from "~/src/components/InvoiceId";
import { DeepReadonly } from "~/src/types/helpers";
import { twStyles } from "~/src/twStyles";
import { helpers } from "~/src/helpers";
import { Address } from "~/src/components/InvoiceDetails/Address";
import { SectionH3Labelled } from "~/src/components/InvoiceDetails/MidView/SectionH3Labelled";
import { ItemsSection } from "./ItemsSection";
import { InvoiceWithItemId } from "~/src/services/invoiceService";

type Props = {
    invoice: DeepReadonly<InvoiceWithItemId>
};

export function MidView(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const isDescriptionEmpty = props.invoice.description.length === 0;
    const isClientNameEmpty = props.invoice.clientName.length === 0;
    const isClientEmailEmpty = props.invoice.clientEmail.length === 0;
    const twOpacity = "opacity-50";
    const commonClassNames = `${lightTheme ? "text-fig-ds-08" : "text-white"} ${twStyles.fontFigHeadingS}`;

    return (
        <div
            className = {helpers.formatClassNames(
                `
                max-h-full overflow-y-auto
                p-24px tabAndUp:p-32px laptopAndUp:p-48px
                ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                ${commonTwStyles.borderRadius}
                ${commonTwStyles.boxShadow}
                `
            )}
        >
            <div
                className = {helpers.formatClassNames(
                    `
                    flex
                    flex-col tabAndUp:flex-row
                    tabAndUp:justify-between
                    gap-y-8
                    mb-8 tabAndUp:mb-5
                    relative
                    `
                )}
            >
                <div
                    className = "flex flex-col gap-y-1 tabAndUp:gap-y-2 relative"
                >
                    <SectionH3Labelled
                        label = "unique identifier"
                        hideH3
                    >
                        <InvoiceId 
                            value = {props.invoice.id}
                        />
                    </SectionH3Labelled>
                    <SectionH3Labelled
                        label = "description"
                        hideH3
                    >
                        <span
                            className = {helpers.formatClassNames(
                                `
                                ${twStyles.fontFigBodyVar}
                                ${lightTheme ? "text-fig-ds-07" : "text-fig-ds-05"}
                                ${helpers.passIfTrueElseEmpty(isDescriptionEmpty, twOpacity)}
                                `
                            )}
                        >
                            {props.invoice.description || "no project description"}
                        </span>
                    </SectionH3Labelled>
                </div>
                <SectionH3Labelled
                    label = "sender address" 
                    hideH3
                >
                    <Address 
                        value = {props.invoice.senderAddress}
                        twOpacity = {twOpacity}
                        className = "tabAndUp:items-end"
                    />
                </SectionH3Labelled>
            </div>
            <div
                className = "flex gap-x-[61px] tabAndUp:gap-x-[118px] flex-wrap gap-y-8 mb-[2.375rem] tabAndUp:mb-12"
            >
                <div
                    className = "flex flex-col gap-y-8"
                >
                    <SectionH3Labelled
                        label = "invoice date"
                    >
                        <span
                            className = {commonClassNames}
                        >
                            {helpers.convertToDisplayableDateStr(props.invoice.createdAt)}
                        </span>
                    </SectionH3Labelled>
                    <SectionH3Labelled
                        label = "payment due"
                    >
                        <span
                            className = {commonClassNames}
                        >
                            {helpers.convertToDisplayableDateStr(props.invoice.paymentDue)}
                        </span>
                    </SectionH3Labelled>
                </div>
                <SectionH3Labelled
                    label = "bill to"
                >
                    <div
                        className = "flex flex-col gap-y-2"
                    >
                        <span
                            className = {helpers.formatClassNames(
                                `
                                ${commonClassNames}
                                ${helpers.passIfTrueElseEmpty(isClientNameEmpty, twOpacity)}
                                `
                            )}
                        >
                            {props.invoice.clientName || "unknown name"}
                        </span>
                        <Address 
                            value = {props.invoice.clientAddress}
                            twOpacity = {twOpacity}
                        />
                    </div>
                </SectionH3Labelled>
                <SectionH3Labelled
                    label = "sent to"
                >
                    <span
                        className = {helpers.formatClassNames(
                            `
                            ${commonClassNames}
                            ${helpers.passIfTrueElseEmpty(isClientEmailEmpty, twOpacity)}
                            `
                        )}
                    >
                        {props.invoice.clientEmail || "unknown email"}
                    </span>
                </SectionH3Labelled>
            </div>
            <ItemsSection
                items = {props.invoice.items}
            />
        </div>
    );
}
