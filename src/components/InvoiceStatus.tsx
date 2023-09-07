import { twMerge } from "tailwind-merge";
import { Invoice } from "~/src/types";
import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/twStyles";

function getDotAndRootBgColorClassNames(status: Invoice["status"]) {
    let txtColor = "";
    let rootBgColor = "";
    switch(status) {
        case "pending": {
            [txtColor, rootBgColor] = ["text-princeton-orange", "bg-princeton-orange/5"];
            break;
        }
        case "paid": {
            [txtColor, rootBgColor] = ["text-dark-shamrock", "bg-dark-shamrock/5"];
            break;
        }
        case "draft": {
            [txtColor, rootBgColor] = ["text-carbon-blue", "bg-carbon-blue/5"];
            break;
        }
        default: {
            helpers.shouldBeUnreachable(status, `status type: ${status} not handled in getDotAndRootBgColorClassNames`);
        }
    }
    return {
        txtColor,
        rootBgColor
    };
}

type Props = {
    value: Invoice["status"],
    className?: string
};

export function InvoiceStatus(props: Props) {
    const dotAndRootBgColor = getDotAndRootBgColorClassNames(props.value);

    return (
        <span
            className = {twMerge(
                "flex w-[6.5rem] gap-x-2 justify-center items-center capitalize px-[1.875rem] py-[0.875rem] rounded-[8px]",
                dotAndRootBgColor.rootBgColor,
                dotAndRootBgColor.txtColor, // dot's background color
                twStyles.fontFigHeadingSVar,
                props.className
            )}
        >
            <span
                className = "inline-block w-2 h-2 rounded-full bg-current flex-shrink-0"
            >
            </span>
            <span>
                {props.value}
            </span>
        </span>
    );
}
