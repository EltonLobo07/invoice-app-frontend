import React from "react";
import { Header } from "~/src/components/Header";

type Props = {
    children: React.ReactNode
};

export function Layout(props: Props) {
    return (
        <div
            className = "h-full relative"
        >
            <Header 
                applyMediaQueryPositionStyles
            />
            <div>
                {props.children}
            </div>
        </div>
    );
}
