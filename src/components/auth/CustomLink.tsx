import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = Parameters<typeof Link>[0];

export function CustomLink(props: Props) {
    const {
        children,
        ...otherProps
    } = props;

    return (
        <Link
            {...otherProps}
            className = {twMerge(
                "underline hover:no-underline",
                otherProps.className
            )}
        >
            {children}
        </Link>
    );
}
