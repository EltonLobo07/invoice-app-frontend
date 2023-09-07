import React from "react";
import { Header } from "~/src/components/Header";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";

type Props = {
    children: React.ReactNode
};

export function Layout(props: Props) {
    const [theme] = useThemeContext();

    /*
        laptopAndUp:px-128px is a guard for the content and header to never overlap 
        (Based on the assumption that the header's width will be some value less than 128px) 
    */
    return (
        <div
            className = {`
                h-full relative 
                flex flex-col
                selection:bg-fig-ds-02 selection:text-white
                ${theme === "light" ? "bg-fig-ds-11 text-fig-ds-08" : "bg-fig-ds-12 text-white"}
            `}
        >
            <Header 
                applyMediaQueryPositionStyles
            />
            <main
                className = {`
                    flex-grow overflow-y-auto 
                    px-24px laptopAndUp:px-128px 
                    border border-black 
                    w-[45.625rem] max-w-full
                    mx-auto
                `}
            >
                {props.children}
            </main>
        </div>
    );
}
