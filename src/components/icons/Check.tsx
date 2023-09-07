import { twMerge } from "tailwind-merge";
import { IconProps } from "~/src/components/icons/common";

export function Check(props: IconProps) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <svg
            xmlns = "http://www.w3.org/2000/svg"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = {4}
            className = {twMerge(
                "w-6 h-6",
                className
            )}
            viewBox = "0 0 24 24"
            {...otherProps}
        >
            <path
                strokeLinecap = "round"
                strokeLinejoin = "round"
                d = "m4.5 12.75 6 6 9-13.5"
            />
        </svg>
    );
}
