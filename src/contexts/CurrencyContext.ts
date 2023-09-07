import React from "react";

export type Currency = "$" | "£" | "€" | "₹";

export const CurrencyContext = React.createContext<Currency | null>(null);
