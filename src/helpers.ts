import { Invoice, InvoiceDate } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";

function passIfTrueElseEmpty(condition: boolean, str: string): string {
    return condition ? str : "";
}

function shouldBeUnreachable(_x: never, errorMsg = "This line of code should be unreachable") {
    throw new Error(errorMsg);
}

function convertToDisplayableDateStr(invoiceDate: InvoiceDate): string {
    const date = new Date(invoiceDate);
    const captalizedMonthStr = date.toDateString().slice(4, 8);
    return `${String(date.getDate()).padStart(2, "0")} ${captalizedMonthStr} ${date.getFullYear()}`;
}

function getInvoiceItemsTotal(invoiceItems: DeepReadonly<Invoice["items"]>): number {
    return invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function formatClassNames(classNames: string): string {
    const stack: string[] = [];
    const specialCharacters = new Set([" ", "\t", "\n"]);
    for (const ch of classNames) {
        const chPresent = specialCharacters.has(ch); 
        if (!chPresent || (stack.length > 0 && !specialCharacters.has(stack[stack.length - 1]))) {
            stack.push(chPresent ? " " : ch);
        }
    }
    while (stack && specialCharacters.has(stack[stack.length - 1])) {
        stack.pop();
    }
    return stack.join("");
}

export const helpers = {
    passIfTrueElseEmpty,
    shouldBeUnreachable,
    getInvoiceItemsTotal,
    convertToDisplayableDateStr,
    formatClassNames
};
