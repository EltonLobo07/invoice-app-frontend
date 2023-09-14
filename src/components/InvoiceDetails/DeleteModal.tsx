import { CustomModal } from "~/src/components/modals/CustomModal";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { VisuallyHidden } from "../VisuallyHidden";
import { Button } from "../Button";
import { Invoice } from "~/src/types";
import { StartTaskBtn } from "~/src/components/StartTaskButton";
import { useAsyncTaskResultContext } from "~/src/custom-hooks/useAsyncTaskResultContext";

type Props = {
    invoiceId: Invoice["id"]
    open: boolean,
    onClose: () => void,
    onDelete: () => void
};

export function DeleteModal(props: Props) {
    const asyncTaskResultMsgSetter = useAsyncTaskResultContext()[1];
    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <CustomModal
            open = {props.open}
            onClose = {props.onClose}
            className = "inset-[24px]"
        >
            <CustomModal.Panel
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
                <CustomModal.Title
                    className = {helpers.formatClassNames(
                        `
                            capitalize
                            ${lightTheme ? "text-fig-ds-08" : "text-white"}
                            ${twStyles.fontFigHeadingM}
                        `
                    )}
                >
                    confirm deletion
                </CustomModal.Title>
                <CustomModal.Description
                    className = "absolute"
                >
                    <VisuallyHidden
                        useSpanTag
                    >
                        This will permanently delete the invoice
                    </VisuallyHidden>
                </CustomModal.Description>
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

                    <StartTaskBtn
                        customType = "danger"
                        nativeBtnProps = {{
                            onClick: props.onDelete
                        }}
                        duringTaskMessage = "trying to delete the invoice"
                        onSuccess = {() => asyncTaskResultMsgSetter({
                            type: "success",
                            message: `Deleted invoice with unique identifier #${props.invoiceId}`
                        })}
                    >
                        <span
                            className = "mt-[0.125rem]"
                        >
                            delete
                        </span>
                    </StartTaskBtn>
                </div>
            </CustomModal.Panel>
        </CustomModal>
    );
}
