import { twMerge } from "tailwind-merge";
import { IconProps } from "~/src/components/icons/common";
import { commonSvgElementProps } from "~/src/components/icons/chevrons/common";

export function ChevronUp(props: IconProps) {
    const {
        className, 
        ...otherProps 
    } = props;

    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            {...commonSvgElementProps}
            className = {twMerge(
                commonSvgElementProps.className,
                className
            )}
            viewBox = "0 0 24 24"
            {...otherProps}
        >
            <path
            strokeLinecap = "round"
            strokeLinejoin = "round"
            d = "m4.5 15.75 7.5-7.5 7.5 7.5"
            />
        </svg>
    );
}
