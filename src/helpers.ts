function passIfTrueElseEmpty(condition: boolean, str: string): string {
    return condition ? str : "";
}

export const helpers = {
    passIfTrueElseEmpty
};
