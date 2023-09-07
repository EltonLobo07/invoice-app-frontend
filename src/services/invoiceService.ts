import axios from "axios";
import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJlbHRvbi5sb2JvQGdtYWlsLmNvbSIsImlhdCI6MTY5Mzk3NTE3M30.bMatpli_Q0PHLUq6scxJHOv7otxqk8zctR3Nxi0LTFY"
    }
});

async function getInvoices() {
    return (await instance.get<Invoice[]>("/invoices")).data;
}

async function addInvoice(newInvoice: DeepReadonly<Invoice>) {
    return (await instance.post<Invoice>("/invoices", newInvoice)).data;
}

async function updateInvoice(invoice: DeepReadonly<Invoice>) {
    return (await instance.put(`/invoices/${invoice.id}`, invoice)).data;
}

async function deleteInvoice(invoiceId: Invoice["id"]) {
    return instance.delete(`/invoices/${invoiceId}`);
}

export const invoiceService = {
    getInvoices,
    addInvoice,
    updateInvoice,
    deleteInvoice
};
