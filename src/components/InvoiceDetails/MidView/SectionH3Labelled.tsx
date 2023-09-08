import React from "react";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { twMerge } from "tailwind-merge";

type Props = {
    label: string,
    children: React.ReactNode,
    hideH3?: boolean,
    className?: string
};

export function SectionH3Labelled(props: Props) {
    const [theme] = useThemeContext();

    const H3Wrapper = props.hideH3 ? VisuallyHidden : React.Fragment;

    return (
        <section
            aria-label = {props.label}
            className = {twMerge(
                props.hideH3 ? "relative" : "flex flex-col gap-y-3",
                props.className
            )}
        >
            <H3Wrapper>
                <h3
                    className = {helpers.passIfTrueElseEmpty(
                        !props.hideH3,
                        helpers.formatClassNames(
                            `
                            capitalize
                            ${theme === "light" ? "text-fig-ds-07" : "text-fig-ds-05"}
                            ${twStyles.fontFigBodyVar}
                            `
                        )
                    )}
                >
                    {props.label}
                </h3>
            </H3Wrapper>
            {props.children}
        </section>
    );
}
