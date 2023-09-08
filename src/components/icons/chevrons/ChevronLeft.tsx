import { IconProps } from "~/src/components/icons/common";
import { commonSvgElementProps } from "~/src/components/icons/chevrons/common";
import { twMerge } from "tailwind-merge";

export function ChevronLeft(props: IconProps) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <svg 
            xmlns = "http://www.w3.org/2000/svg" 
            {...commonSvgElementProps}
            className = {twMerge(
                commonSvgElementProps.className,
                className
            )}
            viewBox = "0 0 7 10"
            {...otherProps}
        >
            <path
                fill = "none"
                stroke = "#9277FF"
                strokeWidth = {2}
                d = "M6.342.886 2.114 5.114l4.228 4.228"
            />
        </svg>
    );
}
