import { twMerge } from "tailwind-merge";
import { helpers } from "~/src/helpers";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";

type Props = {
    message: string
    className?: string
};

export function Spinner(props: Props) {
    const [theme] = useThemeContext();

    return (
        <div  
            className = {twMerge(
                helpers.formatClassNames(
                    `
                        w-[48px] h-[48px] 
                        border-[8px] 
                        ${theme === "light" ? "border-fig-ds-05" : "border-fig-ds-06"} 
                        rounded-full 
                        border-t-fig-ds-01 
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
        </div>
    );
}
