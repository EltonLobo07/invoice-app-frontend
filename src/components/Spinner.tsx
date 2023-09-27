import { twMerge } from "tailwind-merge";
import { helpers } from "~/src/helpers";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";

type Props = {
    message: string
    className?: string
};

export function Spinner(props: Props) {
    return (
        <span  
            className = {twMerge(
                helpers.formatClassNames(
                    `
                        inline-block
                        w-[48px] h-[48px] 
                        border-[4px] 
                        border-current 
                        rounded-full 
                        border-t-transparent 
                        animate-spin
                        relative
                    `
                ),
                props.className
            )}
        >
            <VisuallyHidden>
                {props.message}
            </VisuallyHidden>
        </span>
    );
}
