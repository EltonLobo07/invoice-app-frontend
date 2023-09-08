import { Listbox } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { twStyles } from "~/src/twStyles";
import { Invoice } from "~/src/types";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { ChevronUp } from "~/src/components/icons/chevrons/ChevronUp";
import { ChevronDown } from "~/src/components/icons/chevrons/ChevronDown";
import { StatusOption } from "~/src/components/InvoiceList/StatusListbox/StatusOption";
import { helpers } from "~/src/helpers";

type Status = Invoice["status"];

type Props = {
    statusList: readonly Status[],
    onStatusListChange: (newStatusList: Status[]) => void,
    className?: string
};

export function StatusListbox(props: Props) {
    const [theme] = useThemeContext();

    function getChevron(selectListOpen: boolean) {
        return selectListOpen ? ChevronUp : ChevronDown;
    }

    return (
        <Listbox
            multiple
            value = {props.statusList}
            onChange = {props.onStatusListChange}
            as = "div"
            className = {twMerge(
                "relative",
                twStyles.fontFigHeadingSVar,
                props.className,
            )}
        >
            {
                ({ open }) => (
                    <>
                        <Listbox.Button
                            className = "relative"
                        >
                            <VisuallyHidden>
                                toggle status filter selection visibility
                            </VisuallyHidden>
                            <div
                                aria-hidden
                                className = {`flex gap-x-3 items-end ${twStyles.fontFigHeadingSVar}`}
                            >
                                <span>
                                    <span>
                                        Filter
                                    </span>
                                    <span
                                        className = "hidden tabAndUp:inline"
                                    >
                                        {" by status"}
                                    </span>
                                </span>
                                {
                                    (() => {
                                        const Icon = getChevron(open);
                                        return (
                                            <Icon 
                                                className = "w-3 h-3 text-fig-ds-01"
                                            />
                                        );
                                    })()
                                }
                            </div>
                        </Listbox.Button>
                        <Listbox.Options
                            className = {helpers.formatClassNames(
                                `
                                absolute top-10 left-1/2 -translate-x-1/2
                                min-w-[12rem] 
                                flex flex-col gap-y-4 
                                p-24px 
                                rounded-[8px] 
                                shadow-[0_10px_20px_0_#48549F40]
                                ${theme === "light" ? "bg-white" : "bg-fig-ds-04"}
                                `
                            )}
                        >
                            {
                                (["pending", "paid", "draft"] as const)
                                    .map(status => (
                                        <StatusOption 
                                            key = {status}
                                            status = {status}
                                        />
                                    ))
                            }                
                        </Listbox.Options>
                    </>
                )
            }
        </Listbox>
    );
}
