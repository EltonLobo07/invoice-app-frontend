import { Spinner } from "~/src/components/Spinner";

type Props = {
    asyncTaskRunning: boolean,
    duringTaskMessage: string,
    children: React.ReactNode
};

export function BtnContent(props: Props) {
    return (
        <>
            <span
                aria-atomic
                aria-live = "assertive"
                aria-relevant = "additions"
                className = "inline-block w-4 h-4 flex-shrink-0"
            >
                {
                    props.asyncTaskRunning && (
                        <Spinner 
                            message = {props.duringTaskMessage}
                            className = "w-full h-full border-[0.125rem]"
                        />
                    )
                }
            </span>
            {props.children}
            <span
                className = "inline-block w-4 h-4"
            >
            </span>
        </>
    );
}
