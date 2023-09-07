import { IconProps } from "~/src/components/icons/common";
import { commonSvgElementProps } from "~/src/components/icons/chevrons/common";
import { twMerge } from "tailwind-merge";

export function ChevronRight(props: IconProps) {
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
            <path fill="none" stroke="#7C5DFA" strokeWidth={2} d="m1 1 4 4-4 4" />
        </svg>
    );
}
