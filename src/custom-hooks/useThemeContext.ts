import { ThemeContext } from "~/src/contexts/ThemeContext";
import { useErrorProneContext } from "~/src/custom-hooks/useErrorProneContext";

export function useThemeContext() {
    return useErrorProneContext(
        ThemeContext,
        "useThemeContext cannot be used in a component that cannot access the theme context"
    );
}
