import axios from "axios";
import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { v4 as uuidv4 } from "uuid";

const instance = axios.create({
    baseURL: "http://localhost:3000/invoices",
    headers: {
        Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlbHRvbi5sb2JvQGdtYWlsLmNvbSIsImlhdCI6MTY5Mzk3NTE3M30.bMatpli_Q0PHLUq6scxJHOv7otxqk8zctR3Nxi0LTFY"
    }
});

function addIdsToItems(invoice: Invoice) {
    return {
        ...invoice,
        items: invoice.items.map(item => ({...item, id: uuidv4()}))
    };
}

export type InvoiceWithItemId = ReturnType<typeof addIdsToItems>;

async function getInvoices() {
    return (await instance.get<Invoice[]>("/")).data.map(addIdsToItems);
}

async function getInvoiceById(id: string) {
    return addIdsToItems((await instance.get<Invoice>(`/${id}`)).data);
}

async function addInvoice(newInvoice: DeepReadonly<Invoice>) {
    return addIdsToItems((await instance.post<Invoice>("/", newInvoice)).data);
}

async function updateInvoice(invoice: DeepReadonly<Invoice>) {
    return addIdsToItems((await instance.put<Invoice>(`/${invoice.id}`, invoice)).data);
}

async function deleteInvoice(invoiceId: Invoice["id"]) {
    return instance.delete(`/${invoiceId}`);
}

export const invoiceService = {
    getInvoices,
    getInvoiceById,
    addInvoice,
    updateInvoice,
    deleteInvoice
};
