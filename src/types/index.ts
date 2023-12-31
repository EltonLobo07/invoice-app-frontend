import * as helpers from "~/src/types/helpers";

export type InvoiceDate = helpers.Branded<string, "InvoiceDate">;
type InvoiceStatus = "paid" | "pending" | "draft";
export type InvoiceAddress = {
    street: string,
    city: string,
    postCode: string,
    country: string
};
type InvoiceItem = {
    name: string,
    quantity: number,
    price: number,
    total: number
};
export type Invoice = {
    id: string,
    createdAt: InvoiceDate,
    paymentDue: InvoiceDate,
    description: string,
    paymentTerms: 1 | 7 | 14 | 30, 
    clientName: string,
    clientEmail: string,
    status: InvoiceStatus,
    senderAddress: InvoiceAddress,
    clientAddress: InvoiceAddress,
    items: InvoiceItem[]
};

export type HeadingLvl = 1 | 2 | 3 | 4 | 5 | 6;
