import React from "react";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { Button } from "~/src/components/Button";
import { twStyles } from "~/src/twStyles";
import { InvoiceStatus } from "~/src/components/InvoiceStatus";
import { DeepReadonly } from "~/src/types/helpers";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { commonTwStyles } from "~/src/components/InvoiceDetails/common";
import { helpers } from "~/src/helpers";
import { DeleteModal } from "./DeleteModal";
import { InvoiceFormModal } from "~/src/components/modals/InvoiceFormModal";
import { InvoiceWithItemId, invoiceService } from "~/src/services/invoiceService";
import { useUserTokenContext } from "~/src/custom-hooks/useUserTokenContext";
import { AxiosError } from "axios";
import { StartTaskBtn } from "~/src/components/StartTaskButton";
import { useAsyncTaskResultContext } from "~/src/custom-hooks/useAsyncTaskResultContext";

type Props = {
    invoice: DeepReadonly<InvoiceWithItemId>,
    onSuccessfulInvoiceEdit: (updatedInvoice: InvoiceWithItemId) => void,
    title: string,
    onDelete: () => void,
    onMarkAsPaidSuccess: () => void
};

type ModalType = "delete" | "edit" | "none";

export function TopView(props: Props) {
    const [openModalType, setOpenModalType] = React.useState<ModalType>("none");
    const [theme] = useThemeContext();
    const [userToken] = useUserTokenContext();
    const asynTaskResultMsgSetter = useAsyncTaskResultContext()[1];

    const lightTheme = theme === "light";
    const greedyFlexItem = <div className = "flex-grow"></div>;

    const handleMarkAsPaid = async () => {
        if (!userToken) {
            throw new Error("User must be logged in");
        }
        try {
            await invoiceService.updateInvoice({
                ...props.invoice, 
                status: "paid"
            }, userToken.jsonWebToken);
            props.onMarkAsPaidSuccess();
        }   
        catch(error) {
            if (error instanceof AxiosError) {
                throw new Error(helpers.getBackendErrorStrIfPossible(error));
            }
            throw error;
        }
    };

    return (
        <div
            className = {helpers.formatClassNames(
                `
                    px-24px tabAndUp:px-32px 
                    py-24px tabAndUp:py-[20px] 
                    flex flex-row-reverse 
                    ${commonTwStyles.borderRadius} 
                    ${commonTwStyles.boxShadow}
                    ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                `
            )}
        >
            <header
                className = "ml-auto relative"
            >
                <VisuallyHidden>
                    <h2>
                        {props.title}
                    </h2>
                </VisuallyHidden>
                <ul
                    className = {helpers.formatClassNames(
                        `
                            flex gap-[8px]
                            items-center
                            overflow-x-auto
                            ${helpers.getScrollbarTwClassName(theme)}
                            fixed left-0 right-0 bottom-0 z-10 tabAndUp:static 
                            px-16px py-[22px] tabAndUp:px-0 tabAndUp:py-0
                            ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                            ${commonTwStyles.boxShadow}
                        `
                    )}
                >
                    {greedyFlexItem}
                    <li>
                        <Button
                            customType = "plain"
                            nativeBtnProps = {{
                                onClick: () => setOpenModalType("edit")
                            }}
                        >
                            edit
                        </Button>
                    </li>
                    <li>
                        <Button
                            customType = "danger"
                            nativeBtnProps = {{
                                onClick: () => setOpenModalType("delete")
                            }}
                        >
                            delete
                        </Button>
                    </li>
                    {
                        props.invoice.status === "pending" && (
                            <li>
                                <StartTaskBtn
                                    customType = "primary"
                                    nativeBtnProps = {{
                                        type: "button",
                                        onClick: handleMarkAsPaid,
                                        className: "normal-case whitespace-nowrap"
                                    }}
                                    duringTaskMessage = "trying to mark the invoice as paid"
                                    onSuccess = {() => asynTaskResultMsgSetter({
                                        type: "success",
                                        message: `Invoice with unique identifier - #${props.invoice.id}, marked as paid`
                                    })}
                                >
                                    <span
                                        className = "mt-[0.125rem]"
                                    >
                                        Mark as Paid
                                    </span>
                                </StartTaskBtn>
                            </li>
                        )
                    }
                    {greedyFlexItem}
                </ul>
            </header> 
            <div
                className = {helpers.formatClassNames(
                    `
                        flex gap-x-[20px] items-center justify-between
                        flex-grow tabAndUp:flex-grow-0
                    `
                )}
            >
                <span
                    className = {helpers.formatClassNames(
                        `
                            capitalize
                          text-sky-snail-blue
                            ${twStyles.fontFigBody}
                        `
                    )}
                >
                    status
                </span>
                <InvoiceStatus 
                    value = {props.invoice.status}
                />
            </div>     
            <DeleteModal
                open = {openModalType === "delete"}
                onClose = {() => setOpenModalType("none")}
                onDelete = {props.onDelete}
                invoiceId = {props.invoice.id}
            />    
            <InvoiceFormModal 
                open = {openModalType === "edit"}
                onClose = {() => setOpenModalType("none")}
                invoiceToEdit = {props.invoice}
                onInvoiceEditSuccess = {updatedInvoice => {
                    setOpenModalType("none");
                    props.onSuccessfulInvoiceEdit(updatedInvoice);
                }}
            />              
        </div>
    );
}
