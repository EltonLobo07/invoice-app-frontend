import { Dialog as HUIDialog } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';

type Props = {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    className?: string
};

export type ModalProps = Props;

export function Modal(props: Props) {
    return (
        <HUIDialog
            open = {props.open}
            onClose = {props.onClose}
            className = "relative"
        >
            <div
                className = "fixed inset-0 bg-black/50"
            ></div>
            <div
                className = {twMerge(
                    "fixed inset-0",
                    props.className
                )}
            >
                {props.children}
            </div>
        </HUIDialog>
    );
}

Modal.Title = HUIDialog.Title;
Modal.Description = HUIDialog.Description;
Modal.Panel = HUIDialog.Panel;
