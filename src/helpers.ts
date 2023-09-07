function passIfTrueElseEmpty(condition: boolean, str: string): string {
    return condition ? str : "";
}

export function shouldBeUnreachable(_x: never, errorMsg = "This line of code should be unreachable") {
    throw new Error(errorMsg);
}

export const helpers = {
    passIfTrueElseEmpty,
    shouldBeUnreachable
};
