import React from "react";

export function useObjectState<TState extends object>(initialState: TState | (() => TState)) {
    const [state, setState] = React.useState(initialState);
    const setStateWrapper = React.useCallback((newState: Partial<TState>) => {
        setState(prevState => {
            if (Object.keys(newState).length === 0) {
                return prevState;
            }
            return {
                ...prevState,
                ...newState
            };
        });
    }, []);
    return [state, setStateWrapper] as const;
}
