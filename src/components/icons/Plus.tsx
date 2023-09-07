import { twMerge } from "tailwind-merge";
import { IconProps } from "~/src/components/icons/common";

export function Plus(props: IconProps) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <svg 
            xmlns = "http://www.w3.org/2000/svg" 
            viewBox = "0 0 11 11" 
            {...otherProps}
            className = {twMerge(
                "w-[0.6875rem] h-[0.6875rem]",
                className
            )}
        >
            <path
                fill = "#7C5DFA"
                d = "M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
            />
        </svg>
    );
}
