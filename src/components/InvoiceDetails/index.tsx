import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DeepReadonly } from "~/src/types/helpers";
import { InvoiceWithItemId, invoiceService } from "~/src/services/invoiceService";
import { GoBackBtn } from "~/src/components/GoBackBtn";
import { TopView } from "~/src/components/InvoiceDetails/TopView";
import { MidView } from "~/src/components/InvoiceDetails/MidView";
import { helpers } from "~/src/helpers";
import { Loading } from "~/src/components/Loading";
import { NotFound } from "~/src/components/InvoiceDetails/NotFound";
import { useUserTokenContext } from "~/src/custom-hooks/useUserTokenContext";

export function InvoiceDetails() {
    const [invoice, setInvoice] = React.useState<DeepReadonly<InvoiceWithItemId> | null | undefined>();
    const navigate = useNavigate();
    const { invoiceId } = useParams();
    const [userToken] = useUserTokenContext();

    React.useEffect(() => {
        if (invoiceId === undefined || !userToken) {
            return;
        }
        void (async () => {
            try {
                setInvoice(await invoiceService.getInvoiceById(invoiceId, userToken.jsonWebToken));
            }
            catch(error) {
                console.log(error);
                setInvoice(null);
            }
        })();
    }, [invoiceId, navigate, userToken]);

    if (!userToken) {
        return (
            <Navigate 
                to = "/login"
            />
        );
    }

    let contentNode: React.ReactNode = null;
    if (invoice === undefined) {
        contentNode = <Loading />;
    } else if (invoice === null) {
        contentNode = <NotFound />;
    } else {
        const title = `details of invoice with unique identifier ${invoice.id}`;
        const onDelete = async () => {
            try {
                await invoiceService.deleteInvoice(invoice.id);
                navigate(-1);
            }
            catch(error) {
                console.log(error);
            }
        };
        
        /*
            pb-28 is a magic number to help invoice details not to not get covered by the list of action buttons
        */
        contentNode = (
            <div
                className = {helpers.formatClassNames(
                    `
                    h-full overflow-y-hidden 
                    pt-32px tabAndUp:pt-48px laptopAndUp:pt-64px 
                    flex flex-col gap-y-8 
                    pb-28 tabAndUp:pb-0
                    `
                )}
            >
                <GoBackBtn
                    onClick = {() => navigate(-1)}
                />
                <section
                    aria-label = {title}
                    className = "flex flex-col gap-y-4 tabAndUp:gap-y-6 flex-grow overflow-y-auto"
                >
                    <TopView
                        invoice = {invoice}
                        title = {title}
                        onDelete = {onDelete}
                        onSuccessfulInvoiceEdit = {setInvoice}
                        onMarkAsPaidSuccess = {() => setInvoice({...invoice, status: "paid"})}
                    />
                    <MidView 
                        invoice = {invoice}
                    />
                </section>
            </div>
        );
    }

    return (
        <div
            className = "h-full"
        >
            {contentNode}
        </div>
    );
}
