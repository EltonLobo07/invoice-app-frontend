import { twMerge } from "tailwind-merge";
import { Button } from "~/src/components/Button";

type Props = JSX.IntrinsicElements["button"];

export function CustomButton(props: Props) {
    const {
        children, 
        ...otherProps
    } = props;

    return (
        <Button
            customType = "primary"
            nativeBtnProps = {{
                ...otherProps,
                className: twMerge(
                    "w-full normal-case rounded-md",
                    otherProps.className
                )
            }}
        >
            {children}
        </Button>
    );
}
