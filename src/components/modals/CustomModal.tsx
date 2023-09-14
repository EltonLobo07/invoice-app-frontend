import { Dialog as HUIDialog } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { Status } from '~/src/Layout/Status';

type Props = {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode,
    className?: string
};

export type CustomModalProps = Props;

export function CustomModal(props: Props) {
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
            <Status />
        </HUIDialog>
    );
}

CustomModal.Title = HUIDialog.Title;
CustomModal.Description = HUIDialog.Description;
CustomModal.Panel = HUIDialog.Panel;
