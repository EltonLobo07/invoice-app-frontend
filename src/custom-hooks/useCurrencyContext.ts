import { CurrencyContext } from "~/src/contexts/CurrencyContext";
import { useErrorProneContext } from "~/src/custom-hooks/useErrorProneContext";

export function useCurrencyContext() {
    return useErrorProneContext(
        CurrencyContext,
        "useCurrencyContext cannot be used in a component that cannot access the currency context"
    );
}
