import { NativeModal } from "~/src/components/modals/NativeModal";
import { Header } from "~/src/components/Header";
import { DeepReadonly } from "~/src/types/helpers";
import { InvoiceWithItemId } from "~/src/services/invoiceService";
import { helpers } from "~/src/helpers";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { InvoiceForm } from "~/src/components/modals/InvoiceFormModal/InvoiceForm";

type Props = {
    open: boolean,
    onClose: () => void,
    invoiceToEdit?: DeepReadonly<InvoiceWithItemId>,
    onInvoiceEditSuccess?: (editedInvoice: InvoiceWithItemId) => void,
    onInvoiceSaveSucces?: (createdInvoice: InvoiceWithItemId) => void
};

export function InvoiceFormModal(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";
    const commonBgColor = lightTheme ? "bg-white" : "bg-fig-ds-12";

    return (
        <NativeModal
            open = {props.open}
            onClose = {props.onClose}
            className = "flex flex-col laptopAndUp:flex-row"
        >
            <div
                className = {helpers.formatClassNames(
                    `
                        laptopAndUp:h-full
                        w-full laptopAndUp:w-fit 
                        ${commonBgColor}
                    `
                )}
            >
                <Header 
                    applyMediaQueryPositionStyles = {false}
                />
            </div>
            <div
                className = {helpers.formatClassNames(
                    `
                        relative
                        ${commonBgColor}
                        w-full tabAndUp:w-[38.5rem] laptopAndUp:w-[45rem]
                        max-w-full
                        h-full overflow-y-hidden
                        pt-32px tabAndUp:pt-56px
                        tabAndUp:rounded-r-[20px]
                    `
                )}
            >
                <InvoiceForm
                    onCancel = {props.onClose}
                    invoiceToEdit = {props.invoiceToEdit}
                    onInvoiceEditSuccess = {props.onInvoiceEditSuccess}
                    onInvoiceSaveSuccess = {props.onInvoiceSaveSucces}
                />
            </div>
        </NativeModal>
    );
}
