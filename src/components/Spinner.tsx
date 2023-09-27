import { twMerge } from "tailwind-merge";
import { helpers } from "~/src/helpers";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { Loader } from "./icons/Loader";

type Props = {
    message: string
    className?: string
};

export function Spinner(props: Props) {
    return (
        <div  
            className = {twMerge(
                helpers.formatClassNames(
                    /*
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
                    */
                    `
                        inline-block
                        w-[48px] h-[48px]
                        animate-[spin_1s_linear_infinite]
                        relative   
                    `
                ),
                props.className
            )}
        >
            <Loader 
                className = {helpers.formatClassNames(
                    `
                        w-full
                        h-full
                    `
                )}
            />
            <VisuallyHidden>
                {props.message}
            </VisuallyHidden>
        </div>
    );
}
