import React from "react";
import { Header } from "~/src/components/Header";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { Status } from "~/src/Layout/Status";
import { 
    AsyncTaskResultContext, 
    StatusObj 
} from "~/src/contexts/AsyncTaskResultContext";

type Props = {
    children: React.ReactNode
};

export function Layout(props: Props) {
    const [statusObj, setStatusObj] = React.useState<StatusObj>({
        type: "success",
        message: ""
    });
    const [theme] = useThemeContext();

    /*
        laptopAndUp:px-128px is a guard for the content and header to never overlap 
        (Based on the assumption that the header's width will be some value less than 128px) 
    */
    return (
        <div
            className = {helpers.formatClassNames(
                `
                    h-full
                    ${helpers.getScrollbarTwClassName(theme)} 
                    isolate
                    flex flex-col
                    selection:bg-fig-ds-02 selection:text-white
                    ${theme === "light" ? "bg-fig-ds-11 text-fig-ds-08" : "bg-fig-ds-12 text-white"}
                    relative
                `
            )}
        >
            <AsyncTaskResultContext.Provider
                value = {[statusObj, setStatusObj]}
            >
                <Header 
                    applyMediaQueryPositionStyles
                />
                <div
                    className = {
                        helpers.formatClassNames(
                            `
                                flex-grow 
                                overflow-y-auto
                                ${helpers.getScrollbarTwClassName(theme)} 
                                px-8px 
                                laptopAndUp:px-128px
                            `
                        )
                    }
                >
                    <main
                        className = "h-full w-[45.625rem] max-w-full mx-auto"
                    >
                        {props.children}
                    </main>
                </div>
                <Status />
            </AsyncTaskResultContext.Provider>
        </div>
    );
}
