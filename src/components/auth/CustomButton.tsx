import { twMerge } from "tailwind-merge";
import { Button, PublicBtnType } from "~/src/components/Button";

type Props = JSX.IntrinsicElements["button"] & {
    customType?: PublicBtnType
};

export function CustomButton(props: Props) {
    const {
        children, 
        customType = "primary",
        ...otherProps
    } = props;

    return (
        <Button
            customType = {customType}
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
