import React from "react";

type Props = {
    useSpanTag?: boolean,
    children: React.ReactNode
};

export function VisuallyHidden(props: Props) {
    const style: React.CSSProperties = {
        display: 'inline-block',
        position: 'absolute',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        height: 1,
        width: 1,
        margin: 0,
        padding: 0,
        border: 0
    }

    if (props.useSpanTag) {
        return (
            <span
                style = {style}
            >
                {props.children}
            </span>
        );
    }
    return (
        <div
            style = {style}
        >
            {props.children}
        </div>
    );
}
