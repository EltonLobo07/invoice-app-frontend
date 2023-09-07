import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { VisuallyHidden } from "../../VisuallyHidden";
import { TabAndUpView } from "./TabAndUpView";

type Props = {
    invoice: DeepReadonly<Invoice>
};

export function InvoiceListItem(props: Props) {
    const [theme] = useThemeContext();
    const sectionTitle = `main details of invoice with unique identifier ${props.invoice.id} `;

    return (
        <li
            className = {`
                ${theme === "light" ? "bg-white" : "bg-fig-ds-03"}
                shadow-[0_10px_10px_-10px_#48549F1A]
                rounded-[8px]
            `}
        >
            <section
                aria-label = {sectionTitle}
                className = "relative"
            >
                <VisuallyHidden>
                    <h3>
                        {sectionTitle}
                    </h3>
                </VisuallyHidden>
                <button
                    onClick = {() => {}}
                    className = "absolute top-0 left-0 h-full w-full outline-fig-ds-01"
                >
                    <VisuallyHidden
                        useSpanTag
                    >
                        {`Display detailed invoice info associated to unique identifier: ${props.invoice.id}`}
                    </VisuallyHidden>
                </button>
                <TabAndUpView
                    invoice = {props.invoice}
                />
            </section>
        </li>
    );
}
