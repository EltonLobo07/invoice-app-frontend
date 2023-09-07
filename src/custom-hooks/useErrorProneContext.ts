import React from "react";

export function useErrorProneContext<TContext>(context: React.Context<TContext>, errorMsg: string) {
    const contextValue = React.useContext(context);
    if (contextValue === null) {
        throw new Error(errorMsg);
    }
    return contextValue;
}
