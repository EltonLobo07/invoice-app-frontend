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
                    "w-full normal-case rounded-md py-2 px-3 text-[1rem] outline-offset-2",
                    otherProps.className
                )
            }}
        >
            {children}
        </Button>
    );
}
