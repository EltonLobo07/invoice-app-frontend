import React from "react";
import { Header } from "~/src/components/Header";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { useUserTokenContext } from "~/src/custom-hooks/useUserTokenContext";
import { Loading } from "~/src/components/Loading";

type Props = {
    children: React.ReactNode
};

export function Layout(props: Props) {
    const [theme] = useThemeContext();
    const [userToken] = useUserTokenContext();

    let content: React.ReactNode;
    if (userToken === undefined) {
        content = <Loading />;
    } else {
        content = props.children;
    }

    /*
        laptopAndUp:px-128px is a guard for the content and header to never overlap 
        (Based on the assumption that the header's width will be some value less than 128px) 
    */
    return (
        <div
            className = {helpers.formatClassNames(
                `
                h-full relative 
                flex flex-col
                selection:bg-fig-ds-02 selection:text-white
                ${theme === "light" ? "bg-fig-ds-11 text-fig-ds-08" : "bg-fig-ds-12 text-white"}
                `
            )}
        >
            <Header 
                applyMediaQueryPositionStyles
            />
            <div
                className = "flex-grow overflow-y-auto px-8px laptopAndUp:px-128px"
            >
                <main
                    className = "h-full w-[45.625rem] max-w-full mx-auto"
                >
                    {content}
                </main>
            </div>
        </div>
    );
}
