import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { Button } from "~/src/components/Button";
import { twStyles } from "~/src/twStyles";
import { InvoiceStatus } from "~/src/components/InvoiceStatus";
import { DeepReadonly } from "~/src/types/helpers";
import { Invoice } from "~/src/types";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { commonTwStyles } from "~/src/components/InvoiceDetails/common";
import { helpers } from "~/src/helpers";

type Props = {
    invoice: DeepReadonly<Invoice>,
    title: string
};

export function TopView(props: Props) {
    const [theme] = useThemeContext();

    const lightTheme = theme === "light";
    const greedyFlexItem = <div className = "flex-grow"></div>;

    return (
        <div
            className = {helpers.formatClassNames(
                `
                px-24px tabAndUp:px-32px 
                py-24px tabAndUp:py-[20px] 
                flex flex-row-reverse 
                ${commonTwStyles.borderRadius} 
                ${commonTwStyles.boxShadow}
                ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                `
            )}
        >
            <header
                className = "ml-auto relative"
            >
                <VisuallyHidden>
                    <h2>
                        {props.title}
                    </h2>
                </VisuallyHidden>
                <ul
                    className = {helpers.formatClassNames(
                        `
                        hidden gap-[8px]
                        items-center
                        overflow-x-auto
                        fixed left-0 right-0 bottom-0 tabAndUp:static 
                        px-16px py-[22px] tabAndUp:px-0 tabAndUp:py-0
                        ${lightTheme ? "bg-white" : "bg-fig-ds-03"}
                        ${commonTwStyles.boxShadow}
                        `
                    )}
                >
                    {greedyFlexItem}
                    <li>
                        <Button
                            customType = "plain"
                        >
                            edit
                        </Button>
                    </li>
                    <li>
                        <Button
                            customType = "danger"
                        >
                            delete
                        </Button>
                    </li>
                    {
                        props.invoice.status === "pending" && (
                            <li>
                                <Button
                                    customType = "primary"
                                    nativeBtnProps = {{
                                        className: "normal-case whitespace-nowrap"
                                    }}
                                >
                                    Mark as Paid
                                </Button>
                            </li>
                        )
                    }
                    {greedyFlexItem}
                </ul>
            </header> 
            <div
                className = {helpers.formatClassNames(
                    `
                    flex gap-x-[20px] items-center justify-between
                    flex-grow tabAndUp:flex-grow-0
                    `
                )}
            >
                <span
                    className = {helpers.formatClassNames(
                        `
                        capitalize
                        text-sky-snail-blue
                        ${twStyles.fontFigBody}
                        `
                    )}
                >
                    status
                </span>
                <InvoiceStatus 
                    value = {props.invoice.status}
                />
            </div>                       
        </div>
    );
}
