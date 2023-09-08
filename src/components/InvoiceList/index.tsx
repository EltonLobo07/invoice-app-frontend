import React from "react";
import { twStyles } from "~/src/twStyles";
import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { StatusListbox } from "~/src/components/InvoiceList/StatusListbox";
import { Button } from "~/src/components/Button";
import { Plus } from "~/src/components/icons/Plus";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { InvoiceListItem } from "~/src/components/InvoiceList/InvoiceListItem";
import { invoiceService } from "~/src/services/invoiceService";
import IllustrationEmpty from "~/src/images/illustration-empty.svg";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twMerge } from "tailwind-merge";
import { helpers } from "~/src/helpers";

export function InvoiceList() {
    const [invoices, setInvoices] = React.useState<readonly DeepReadonly<Invoice>[]>([]);
    const [filterBy, setFilterBy] = React.useState<readonly Invoice["status"][]>([
        "draft",
        "pending",
        "paid"
    ]);
    const [theme] = useThemeContext();

    const filteredInvoices = invoices.filter(invoice => filterBy.includes(invoice.status));
    const noInvoices = filteredInvoices.length === 0;
    const sectionTitle = "invoices";
    let mobileInvoiceDescription = "No invoices";
    let tabAndUpInvoiceDescription = mobileInvoiceDescription;
    if (!noInvoices) {
        mobileInvoiceDescription = `${filteredInvoices.length} invoices`;
        tabAndUpInvoiceDescription = `There are ${filteredInvoices.length} total invoices`;
    }

    React.useEffect(() => {
        void (async () => {
            try {
                setInvoices(await invoiceService.getInvoices());
            }
            catch(error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <section
            aria-label = {sectionTitle}
            className = "h-full flex flex-col pt-32px tabAndUp:pt-[61px] laptopAndUp:pt-78px"
        >
            <header
                className = {helpers.formatClassNames(
                    `
                    flex items-baseline gap-x-4 gap-y-4 tabAndUp:gap-x-10 flex-wrap 
                    relative z-10
                    ${noInvoices ? "mb-0" : "mb-[64px]"}    
                    `
                )}
            >
                <div
                    className = "flex flex-col"
                >
                    <h2
                        className = {`capitalize ${twStyles.fontFigHeadingL}`}
                    >
                        {sectionTitle}
                    </h2>
                    <p
                        className = {`text-fig-ds-06 ${twStyles.fontFigBodyVar}`}
                    >
                        <span
                            className = "tabAndUp:hidden"
                        >
                            {mobileInvoiceDescription}
                        </span>
                        <span
                            className = "hidden tabAndUp:inline"
                        >
                            {tabAndUpInvoiceDescription}
                        </span>
                    </p>
                </div>
                <div
                    className = "flex items-baseline gap-x-4 ml-auto"
                >
                    <StatusListbox 
                        statusList = {filterBy}
                        onStatusListChange = {setFilterBy}
                    />
                    <Button
                        customType = "primary"
                        nativeBtnProps = {{
                            className: "flex gap-x-[16px] items-center py-2 pl-2 pr-4"
                        }}
                    >
                        <span
                            className = "w-8 h-8 bg-current rounded-full flex justify-center items-center"
                        >
                            <Plus 
                                aria-label = "add"
                            />
                        </span>
                        <span
                            className = {`relative ${twStyles.fontFigHeadingSVar}`}
                        >
                            new
                            <VisuallyHidden
                                useSpanTag
                            >
                                invoice
                            </VisuallyHidden>
                            <span
                                aria-hidden
                                className = "hidden tabAndUp:inline"   
                            >
                                {" invoice"}
                            </span>
                        </span>
                    </Button>
                </div>
            </header>
            {/*
                Use of an ordered list over an unordered list below is debatable. 
                But if I claim that my application will list out invoices in sorted order 
                based on the payment due date (early payment due invoices come first), 
                then the order matters. I plan to display the invoices based 
                on the payment due date of each invoice.
            */}
            {/*
                p-[4px] to give some space for the outline of the list item button
            */}
            <div
                className = {helpers.formatClassNames(
                    `
                    flex-grow overflow-y-auto 
                    ${helpers.passIfTrueElseEmpty(noInvoices, "flex")}
                    `
                )}
            >
                {
                    noInvoices 
                    ? (
                        <div
                            className = "flex flex-col overflow-y-auto gap-y-[42px] tabAndUp:gap-y-[66px] my-auto w-full items-center py-2"
                        >
                            <img 
                                src = {IllustrationEmpty}
                                alt = ""
                                className = "w-48 h-40"
                            />
                            <div
                                className = "flex flex-col gap-y-6 text-center"
                            >
                                <span
                                    className = {`
                                        ${twStyles.fontFigHeadingM}
                                    `}
                                >
                                    There is nothing here
                                </span>
                                <p
                                    className = {helpers.formatClassNames(
                                        `
                                        flex flex-col
                                        ${twStyles.fontFigBodyVar}
                                        ${theme === "light" ? "text-fig-ds-06" : "text-fig-ds-05"}
                                        `
                                    )}
                                >
                                    <span>
                                        Create an invoice by clicking the
                                    </span> 
                                    <span>
                                        <span
                                            className = {twMerge(
                                                "capitalize",
                                                twStyles.fontFigBodyVar,
                                                "font-bold"
                                            )}
                                        >
                                            <span
                                                className = "tabAndUp:hidden"
                                            >
                                                {"new "}
                                            </span>
                                            <span
                                                className = "hidden tabAndUp:inline"
                                            >
                                                {"new invoice "}
                                            </span>
                                        </span>
                                        button and get started
                                    </span>
                                </p>
                            </div>
                        </div>
                    )
                    : (
                        <ol
                            className = "h-full overflow-y-auto flex flex-col gap-y-4 p-[4px]"
                        >
                            {
                                filteredInvoices.map(filteredInvoice => (
                                    <InvoiceListItem 
                                        key = {filteredInvoice.id}
                                        invoice = {filteredInvoice}
                                    />
                                ))
                            }
                        </ol>
                    )
                }
            </div>
        </section>
    );
}
