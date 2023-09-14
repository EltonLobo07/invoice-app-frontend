import React from "react";
import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";

type Props = {
    title: string,
    link: JSX.Element,
    children: React.ReactNode
};

export function Layout(props: Props) {
    const [theme] = useThemeContext();

    return (
        <section
            aria-label = {props.title}
            className = {helpers.formatClassNames(
                `
                    h-full 
                    overflow-y-auto
                    ${helpers.getScrollbarTwClassName(theme)} 
                    flex 
                    py-4
                `
            )}
        >
            <div
                className = {helpers.formatClassNames(
                    `
                        m-auto 
                        flex 
                        flex-col 
                        gap-y-8 
                        max-w-full 
                        max-h-full 
                        overflow-y-auto
                        ${helpers.getScrollbarTwClassName(theme)}
                    `
                )}
            >
                <div
                    className = "flex flex-col items-center gap-y-2"
                >
                    <h2
                        className = {helpers.formatClassNames(
                            `
                                text-center
                                ${twStyles.fontFigHeadingL}
                            `
                        )}
                    >
                        {props.title}
                    </h2>
                    <p
                        className = "flex flex-col tabAndUp:flex-row gap-x-1 gap-y-1 text-center"
                    >
                        <span>
                            or
                        </span>
                        {props.link}
                    </p>
                </div>
                {props.children}
            </div>
        </section>
    );
}

const Form = (props: JSX.IntrinsicElements["form"]) => {
    const {
        children,
        ...otherProps
    } = props;

    const [theme] = useThemeContext();
    const lightTheme = theme === "light";

    return (
        <form
            {...otherProps}
            className = {twMerge(
                helpers.formatClassNames(
                    `
                        flex-grow overflow-y-auto
                        ${helpers.getScrollbarTwClassName(theme)}
                        w-[28rem] max-w-full 
                        m-auto
                        shadow-[0_10px_10px_-10px_#48549F1A]
                        rounded-md
                        ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                        border
                        ${lightTheme ? "border-fig-ds-05/50" : "border-fig-ds-04/50"}
                        capitalize
                        flex flex-col gap-y-6
                        p-8                        
                    `
                ),
                otherProps.className
            )}
        >
            {children}
        </form>
    );
};

Layout.Form = Form;
