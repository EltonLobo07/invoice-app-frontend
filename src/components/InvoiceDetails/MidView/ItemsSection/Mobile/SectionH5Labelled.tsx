import { VisuallyHidden } from "~/src/components/VisuallyHidden";

type Props = {
    label: string,
    children?: React.ReactNode,
    className?: string
};

export function SectionH5Labelled(props: Props) {
    return (
        <section
            title = {props.label}
            className = {props.className}
        >
            <VisuallyHidden>
                <h5>
                    {props.label}
                </h5>
            </VisuallyHidden>
            {props.children}
        </section>
    );
}
