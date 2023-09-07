import React from "react";
import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { Theme } from "~/src/contexts/ThemeContext";
import { shouldBeUnreachable } from "~/src/helpers";

type PlainVariants = `plain${"" | "-darker"}`;
type PublicBtnType = "primary" | "secondary" | "danger" | PlainVariants;

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
            [txtColor, bgColor, bgColorOnHover] = ["text-stoic-white", "bg-fig-ds-04", "hover:bg-white"];
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
            shouldBeUnreachable(btnType, `btnType not handled: ${btnType} in getTxtAndBgColor`);
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
                "rounded-[32px] px-[24px] py-[18px] capitalize",
                txtAndBgColor.bgColor,
                txtAndBgColor.bgColorOnHover,
                txtAndBgColor.txtColor,
                props.nativeBtnProps?.className
            )}
        >
            {props.children}
        </button>
    );
}
