import { Modal } from "~/src/components/Modal";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { VisuallyHidden } from "../VisuallyHidden";
import { Button } from "../Button";
import { Invoice } from "~/src/types";

type Props = {
    invoiceId: Invoice["id"]
    open: boolean,
    onClose: () => void,
    onDelete: () => void
};

export function DeleteModal(props: Props) {
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <Modal
            open = {props.open}
            onClose = {props.onClose}
            className = "inset-[24px]"
        >
            <Modal.Panel
                className = {helpers.formatClassNames(
                    `
                        rounded-[8px]
                        p-48px
                        shadow-[0_10px_10px_-10px_#48549F03]
                        flex flex-col gap-y-3
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[30rem] max-w-full
                        ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                    `
                )}
            >
                <Modal.Title
                    className = {helpers.formatClassNames(
                        `
                            capitalize
                            ${lightTheme ? "text-fig-ds-08" : "text-white"}
                            ${twStyles.fontFigHeadingM}
                        `
                    )}
                >
                    confirm deletion
                </Modal.Title>
                <Modal.Description
                    className = "absolute"
                >
                    <VisuallyHidden
                        useSpanTag
                    >
                        This will permanently delete the invoice
                    </VisuallyHidden>
                </Modal.Description>
                <p
                    className = {helpers.formatClassNames(
                        `
                            ${lightTheme ? "text-fig-ds-06" : "text-fig-ds-05"}
                            ${twStyles.fontFigBody}
                        `
                    )}
                >
                    {
                        `Are you sure you want to delete invoice #${props.invoiceId}? This action cannot be undone.`
                    }
                </p>
                <div
                    className = "flex justify-end gap-x-[8px] flex-wrap-reverse gap-y-2"
                >
                    <Button
                        customType = "plain"
                        nativeBtnProps = {{
                            onClick: props.onClose
                        }}
                    >
                        cancel
                    </Button>
                    <Button
                        customType = "danger"
                        nativeBtnProps = {{
                            onClick: props.onDelete
                        }}
                    >
                        delete
                    </Button>
                </div>
            </Modal.Panel>
        </Modal>
    );
}
