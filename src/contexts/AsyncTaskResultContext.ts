import React from "react";

export type StatusObj = {
    type: "success" | "error",
    message: string
};

export const AsyncTaskResultContext = React.createContext<
    [StatusObj,  (newStatusObj: StatusObj) => void] | null
>(null);
