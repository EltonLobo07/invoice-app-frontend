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

export function InvoiceList() {
    const [invoices, setInvoices] = React.useState<readonly DeepReadonly<Invoice>[]>([]);
    const [filterBy, setFilterBy] = React.useState<readonly Invoice["status"][]>([
        "draft",
        "pending",
        "paid"
    ]);

    console.log("filterBy:", filterBy);

    const filteredInvoices = invoices.filter(invoice => filterBy.includes(invoice.status));
    const sectionTitle = "invoices";
    let mobileInvoiceDescription = "No invoices";
    let tabAndUpInvoiceDescription = mobileInvoiceDescription;
    if (filteredInvoices.length > 0) {
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
                className = "flex items-baseline mb-16 gap-x-4 gap-y-4 tabAndUp:gap-x-10 relative z-10 flex-wrap"
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
            <ol
                className = "flex-grow flex flex-col gap-y-4 overflow-y-auto p-[4px]"
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
        </section>
    );
}
