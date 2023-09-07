import React from "react";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";

type Props = {
    visuallyHiddenText: string,
    children: React.ReactNode,
    onClick?: () => void
};

export function Button(props: Props) {
    return (
        <button
            type = "button"
            onClick = {props.onClick}
            className = "px-[20px] tabAndUp:px-[28px] laptopAndUp:px-0 laptopAndUp:py-[20px] relative"
        >
            <VisuallyHidden>
                {props.visuallyHiddenText}
            </VisuallyHidden>
            {props.children}
        </button>
    );
}
