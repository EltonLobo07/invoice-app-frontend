import { twMerge } from "tailwind-merge";
import { LabelledInput, LabelledInputProps } from "~/src/components/LabelledInput";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";

type Props = LabelledInputProps;

export function CustomLabelledInput(props: Props) {
    const inputRequired = Boolean(props.nativeInputProps?.required);
    const spanProps = {...props.nativeSpanProps};
    if (inputRequired && spanProps.children) {
        spanProps.children = (
            <>
                {props.nativeSpanProps?.children}
                <span
                    className = "text-fig-ds-09 text-[1.1rem] inline-block translate-y-1"
                >
                    *
                </span>
                <VisuallyHidden
                    useSpanTag
                >
                    required
                </VisuallyHidden>
            </>
        );
        spanProps.className = twMerge(
            "relative",
            props.nativeSpanProps?.className
        );
    }

    return (
        <LabelledInput 
            {...props}
            nativeSpanProps = {spanProps}
            nativeInputProps = {{
                ...props.nativeInputProps,
                className: twMerge(
                    "py-2 px-3 rounded-md min-h-fit",
                    props.nativeInputProps?.className
                ) 
            }}
        />
    );
}
