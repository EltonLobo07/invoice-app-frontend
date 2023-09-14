import React from "react";
import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "~/src/components/Button";
import { useAsyncTaskResultContext } from "~/src/custom-hooks/useAsyncTaskResultContext";
import { BtnContent } from "./BtnContent";

type Props = ButtonProps & {
    onSuccess: () => void,
    duringTaskMessage: string
};

export type StartTaskBtnProps = Props;

export function StartTaskBtn(props: Props) {
    const [asyncTaskRunning, setAsyncTaskRunning] = React.useState(false);
    const setAsyncTaskResult = useAsyncTaskResultContext()[1];

    const {
        onSuccess,
        duringTaskMessage,
        children,
        ...otherProps 
    } = props;

    const onClickWrapper = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAsyncTaskRunning(true);
        try {
            await otherProps.nativeBtnProps?.onClick?.(e);
            onSuccess();
        }
        catch(error) {
            console.log(error);
            if (error instanceof Error) {
                setAsyncTaskResult({
                    type: "error",
                    message: error.message
                });
            }
        }
        finally {
            setAsyncTaskRunning(false);
        }
    };

    return (
        <Button 
            {...otherProps}
            nativeBtnProps = {{
                ...otherProps.nativeBtnProps,
                onClick: onClickWrapper,
                className: twMerge(
                    "flex gap-x-1 items-center",
                    "px-2",
                    props.nativeBtnProps?.className
                ) 
            }}
        >
            <BtnContent 
                asyncTaskRunning = {asyncTaskRunning}
                duringTaskMessage = {duringTaskMessage}
            >
                {children}
            </BtnContent>
        </Button>
    );
}
