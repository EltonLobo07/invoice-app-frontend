import axios from "axios";
import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { v4 as uuidv4 } from "uuid";
import { common } from "~/src/services/common";

const instance = axios.create({
    baseURL: `${common.baseUrl}/invoices/`
});

function addIdsToItems(invoice: Invoice) {
    return {
        ...invoice,
        items: invoice.items.map(item => ({...item, id: uuidv4()}))
    };
}

export type InvoiceWithItemId = ReturnType<typeof addIdsToItems>;

function createAxiosAuthTokenHeader(authToken: string) {
    return {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    };
}

async function getInvoices(authToken: string) {
    return (await instance.get<Invoice[]>("/", createAxiosAuthTokenHeader(authToken))).data.map(addIdsToItems);
}

async function getInvoiceById(id: string, authToken: string) {
    return addIdsToItems((await instance.get<Invoice>(`/${id}`, createAxiosAuthTokenHeader(authToken))).data);
}

async function addInvoice(newInvoice: DeepReadonly<Invoice>, authToken: string) {
    return addIdsToItems((await instance.post<Invoice>("/", newInvoice, createAxiosAuthTokenHeader(authToken))).data);
}

async function updateInvoice(invoice: DeepReadonly<Invoice>, authToken: string) {
    return addIdsToItems((await instance.put<Invoice>(`/${invoice.id}`, invoice, createAxiosAuthTokenHeader(authToken))).data);
}

async function deleteInvoice(invoiceId: Invoice["id"], authToken: string) {
    return instance.delete(`/${invoiceId}`, createAxiosAuthTokenHeader(authToken));
}

export const invoiceService = {
    getInvoices,
    getInvoiceById,
    addInvoice,
    updateInvoice,
    deleteInvoice
};
