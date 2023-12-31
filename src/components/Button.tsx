import React from "react";
import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { Theme } from "~/src/contexts/ThemeContext";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";

type PlainVariants = `plain${"" | "-darker"}`;
export type PublicBtnType = "primary" | "secondary" | "danger" | PlainVariants;

function getTxtAndBgColor(
    btnType: Exclude<PublicBtnType, PlainVariants> | `${PlainVariants}-${Theme}`
) {
    let txtColor = "";
    let bgColor = "";
    let bgColorOnHover = "";
    switch(btnType) {
        case "primary": {
            [txtColor, bgColor, bgColorOnHover] = ["text-white", "bg-fig-ds-01", "hover:bg-fig-ds-02"];
            break;
        }
        case "secondary": {
            [txtColor, bgColor, bgColorOnHover] = ["text-fig-ds-07", "bg-wash-me", "hover:bg-stoic-white"];
            break;
        }
        case "danger": {
            [txtColor, bgColor, bgColorOnHover] = ["text-white", "bg-fig-ds-09", "hover:bg-fig-ds-10"];
            break;
        }
        case "plain-light": {
            [txtColor, bgColor, bgColorOnHover] = ["text-fig-ds-07", "bg-wash-me", "hover:bg-stoic-white"];
            break;
        }
        case "plain-dark": {
            [txtColor, bgColor, bgColorOnHover] = ["text-fig-ds-07", "bg-fig-ds-04", "hover:bg-white"];
            break;
        }
        case "plain-darker-light": {
            [txtColor, bgColor, bgColorOnHover] = ["text-fig-ds-06", "bg-carbon-blue", "hover:bg-fig-ds-08"];
            break;
        }
        case "plain-darker-dark": {
            [txtColor, bgColor, bgColorOnHover] = ["text-fig-ds-05", "bg-carbon-blue", "hover:bg-fig-ds-03"];
            break;
        }
        default: {
            helpers.shouldBeUnreachable(btnType, `btnType not handled: ${btnType} in getTxtAndBgColor`);
        }
    }
    return {
        txtColor,
        bgColor,
        bgColorOnHover
    };
}

type Props = {
    customType: PublicBtnType,
    children: React.ReactNode,
    nativeBtnProps?: JSX.IntrinsicElements["button"]
};

export type ButtonProps = Props;

export function Button(props: Props) {
    const [theme] = useThemeContext();

    const txtAndBgColor = getTxtAndBgColor(
        props.customType === "plain" || props.customType === "plain-darker" 
        ? `${props.customType}-${theme}` 
        : props.customType
    );

    return (
        <button
            {...props.nativeBtnProps}
            className = {twMerge(
                "rounded-[1.5rem] px-6 py-4 capitalize outline-fig-ds-02",
                txtAndBgColor.bgColor,
                txtAndBgColor.bgColorOnHover,
                txtAndBgColor.txtColor,
                twStyles.fontFigHeadingSVar,
                props.nativeBtnProps?.className
            )}
        >
            {props.children}
        </button>
    );
}
