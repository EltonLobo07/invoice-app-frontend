import { Listbox } from "@headlessui/react";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { Invoice } from "~/src/types";
import { Check } from "~/src/components/icons/Check";

type Props = {
    status: Invoice["status"]
};

export function StatusOption(props: Props) {
    const [theme] = useThemeContext();

    return (    
        <Listbox.Option
            value = {props.status}
            className = "capitalize flex gap-x-3 items-center cursor-pointer"
        >
            {
                ({ active, selected }) => (
                    <>
                        <div
                            className = {`
                                w-4 h-4 
                                rounded-[4px] 
                                flex justify-center items-center
                                border-fig-ds-01
                                ${helpers.passIfTrueElseEmpty(selected || active, "border")}
                                ${
                                    selected
                                    ? "bg-fig-ds-01"
                                    : theme === "light"
                                      ? "bg-fig-ds-05"
                                      : "bg-fig-ds-03"
                                }
                            `}
                        >
                            {
                                selected && (
                                    <Check 
                                        aria-label = "checked"
                                        className = "text-white w-3/4 h-3/4"
                                    />
                                )
                            }
                        </div>
                        <span
                            className = {helpers.passIfTrueElseEmpty(active, "text-fig-ds-01")}
                        >
                            {props.status}
                        </span>
                    </>
                )
            }
        </Listbox.Option>
    );
}
