import { useErrorProneContext } from "~/src/custom-hooks/useErrorProneContext";
import { AsyncTaskResultContext } from "../contexts/AsyncTaskResultContext";

export function useAsyncTaskResultContext() {
    return useErrorProneContext(
        AsyncTaskResultContext,
        "useAsyncTaskResultContext cannot be used in a component that cannot access the AsyncTaskResult context"
    );
}
