import React from "react";
import { ThemeContext } from "~/src/contexts/ThemeContext";

export function useThemeContext() {
    const themeContext = React.useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("useThemeContext cannot be used in a component that cannot access the theme context");
    }
    return themeContext;
}
