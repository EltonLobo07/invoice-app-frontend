import { useErrorProneContext } from "~/src/custom-hooks/useErrorProneContext";
import { UserTokenContext } from "~/src/contexts/UserTokenContext";

export function useUserTokenContext() {
    return useErrorProneContext(
        UserTokenContext,
        "useUserTokenContext cannot be used in a component that cannot access the user token context"
    );
}
