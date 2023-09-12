import { twMerge } from "tailwind-merge";
import { Spinner } from "~/src/components/Spinner";

type Props = {
    message: string,
    children: React.ReactNode,
    className?: string
};

export function Loading(props: Props) {
    return (
        <div
            className = {twMerge(
                "w-full h-full flex flex-col justify-center items-center gap-y-2",
                props.className
            )}
        >
            <Spinner 
                message = {props.message}
            />
            {props.children}
        </div>
    );
}
