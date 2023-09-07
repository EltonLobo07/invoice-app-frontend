import * as helpers from "~/src/types/helpers";

export type InvoiceDate = helpers.Branded<string, "InvoiceDate">;
type InvoiceStatus = "paid" | "pending" | "draft";
type InvoiceAddress = {
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
export type InvoiceItemWithId = {id: string} & InvoiceItem;
export type Invoice = {
    id: string,
    createdAt: InvoiceDate,
    paymentDue: InvoiceDate,
    description: string,
    paymentTerms: number, 
    clientName: string,
    clientEmail: string,
    status: InvoiceStatus,
    senderAddress: InvoiceAddress,
    clientAddress: InvoiceAddress,
    items: InvoiceItem[]
};

export type HeadingLvl = 1 | 2 | 3 | 4 | 5 | 6;
