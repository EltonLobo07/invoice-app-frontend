import React from "react";
import { twMerge } from "tailwind-merge";
import { Status } from "~/src/Layout/Status";

/*
    Issues:
        1. Opening the dialog on click of a button doesn't set visible focus ring on the first focusable child
        2. Closing the dialog using mouse click does not restore focus to the last focused element (I think it should not restore focus, so this might be the correct behaviour but I'll keep this point)
        3. Tabbing is not constrained to the dialog but also the interactive elements of the browser which is in my opnion the correct behaviour but I have seen many people talk about circular tab order when the dialog is open
*/

type Props = {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    className?: string
};

export function NativeModal(props: Props) {
    const { 
        open,
        onClose,
        children,
        className 
    } = props;

    const dialogRef = React.useRef<HTMLDialogElement | null>(null);

    const onDirectDialogClick = (dialogElement: HTMLDialogElement) => {   
        dialogElement.close();
    };

    React.useEffect(() => {
        const dialogElement = dialogRef.current;
        if (!dialogElement) {
            return;
        }
        if (open) {
            if (!dialogElement.open) {
                dialogElement.showModal();
            }
        } else if (dialogElement.open) {
            dialogElement.close();
        }
    }, [open]);

    return (
        <dialog
            ref = {dialogRef}
            className = {twMerge(
                "w-full h-full bg-black/50 m-0 max-w-full max-h-full",
                className,
                !open && "hidden"
            )}
            onClick = {e => {
                const dialogElement = dialogRef.current;
                if (e.target === dialogElement) {
                    onDirectDialogClick(dialogElement);
                }
            }}
            onClose = {() => onClose()}
        >
            {children}
            <Status />
        </dialog>
    );
}
