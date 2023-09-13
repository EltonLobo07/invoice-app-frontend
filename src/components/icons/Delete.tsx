import { twMerge } from "tailwind-merge";
import { IconProps } from "~/src/components/icons/common";

export function Delete(props: IconProps) {
    return (
        <svg 
            xmlns = "http://www.w3.org/2000/svg" 
            viewBox = "0 0 13 16"
            fill = "currentColor"
            {...props}
            className = {twMerge(
                "w-[0.8125rem] h-4",
                props.className
            )}
        >
            <path
                d = "M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            ></path>
        </svg>
    );
}
