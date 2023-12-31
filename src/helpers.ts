import { AxiosError } from "axios";
import { Invoice, InvoiceDate } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { Theme } from "~/src/contexts/ThemeContext";

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

function generateRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function generateRandomUpperCaseEngLetter() {
   return String.fromCodePoint(generateRandomNum("A".codePointAt(0)!, "Z".codePointAt(0)!));
}

function generateRandomDigit() {
    return generateRandomNum(0, 9);
}

function assertInvoiceDate(arg: string): asserts arg is InvoiceDate {
    if (!Number.isFinite(Date.parse(arg))) {
        throw new Error("Invalid date string");
    }
}

function getDateAfterNumDays(date: Date, numDays: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

function getYearMonthDateStr(date: Date): string {
    const dateStr = date.toISOString();
    return dateStr.slice(0, "yyyy-mm-dd".length);
}

function getInvoiceDate(date: Date): InvoiceDate {
    return getYearMonthDateStr(date) as InvoiceDate;
}

function isStrEmpty(arg: string) {
    return arg.length === 0;
}

function getAtMostTwoLettersFromName(name: string) {
    const [firstName, lastName] = name.split(" ");
    const firstLetter = firstName[0];
    const secondLetter = (
        lastName === undefined
        ? firstName.length > 1
          ? firstName[1]
          : ""
        : lastName[0]
    );
    return `${firstLetter}${secondLetter}`.toUpperCase();
}

/*
function chIsAnUpperEnglishCaseLetter(ch: string) {
    return ch.length === 1 && ch >= "A" && ch <= "Z";
}

function isAStrOfUpperEnglishLetters(arg: string) {
    for (const ch of arg) {
        if (!chIsAnUpperEnglishCaseLetter(ch)) {
            return false;
        }
    }
    return true;
}

function chIsADigit(ch: string) {
    return ch.length === 1 && ch >= "0" && ch <= "9";
}

function isAStrOfDigits(arg: string) {
    for (const ch of arg) {
        if (!chIsADigit(ch)) {
            return false;
        }
    }
    return true;
}


function isValidInvoiceId(possibleInvoiceId: string) {
    return (
        possibleInvoiceId.length === 6 &&
        isAStrOfUpperEnglishLetters(possibleInvoiceId.slice(0, 3)) &&
        isAStrOfDigits(possibleInvoiceId.slice(3))
    );
}
*/

function getPromiseThatResolvesAfterXSeconds(x: number = 5000): Promise<null> {
    return new Promise(resolve => setTimeout(() => resolve(null), x));
}

function getBackendErrorStrIfPossible(error: AxiosError) {
    const { response } = error;
    if (
        response && 
        response.data !== null &&
        typeof response.data === "object"
    ) {
        if (
            "error" in response.data && 
            typeof response.data.error === "string" 
        ) {
            return response.data.error;
        }
        if (
            "message" in response.data &&
            typeof response.data.message === "string"
        ) {
            return response.data.message;
        }
    }
    return error.message;
}

function getScrollbarTwClassName(theme: Theme): string {
    return formatClassNames(
        `
            scrollbar
            scrollbar-w-[8px]
            scrollbar-thumb-rounded-[4px]
            ${
                theme === "light"
                ? "scrollbar-track-white scrollbar-thumb-fig-ds-05"
                : "scrollbar-track-fig-ds-12 scrollbar-thumb-fig-ds-04"
            }
        `
    );
}

export const helpers = {
    passIfTrueElseEmpty,
    shouldBeUnreachable,
    getInvoiceItemsTotal,
    convertToDisplayableDateStr,
    formatClassNames,
    generateRandomUpperCaseEngLetter,
    generateRandomDigit,
    assertInvoiceDate,
    getDateAfterNumDays,
    getInvoiceDate,
    isStrEmpty,
    getAtMostTwoLettersFromName,
    getPromiseThatResolvesAfterXSeconds,
    getBackendErrorStrIfPossible,
    getScrollbarTwClassName
};
