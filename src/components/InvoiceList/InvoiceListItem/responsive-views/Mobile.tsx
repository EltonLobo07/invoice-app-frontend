import { Invoice } from "~/src/types";
import { DeepReadonly } from "~/src/types/helpers";
import { LabelledId } from "../LabelledId";
import { LabelledClientName } from "../LabelledClientName";
import { LabelledStatus } from "../LabelledStatus";
import { LabelledPaymentDue } from "../LabelledPaymentDue";
import { LabelledTotalAmount } from "../LabelledTotalAmount";

type Props = {
    invoice: DeepReadonly<Invoice>
};

export function Mobile(props: Props) {
    return (
        <div
            className = "tabAndUp:hidden p-24px flex flex-col gap-y-6"
        >
            <div
                className = "relative flex gap-x-2 justify-between items-baseline"
            >
                <LabelledId 
                    value = {props.invoice.id}
                />
                <LabelledClientName 
                    value = {props.invoice.clientName}
                    className = "flex-grow overflow-x-auto text-right relative z-20"
                />
            </div>
            <div
                className = "relative flex gap-x-2 gap-y-2 justify-between items-center flex-wrap"
            >
                <div
                    className = "flex-grow flex flex-col gap-y-2"
                >
                    <LabelledPaymentDue 
                        value = {props.invoice.paymentDue}
                    />
                    <LabelledTotalAmount 
                        items = {props.invoice.items}
                        className = "self-start max-w-full overflow-x-auto relative z-20"
                    />
                </div>
                <LabelledStatus 
                    value = {props.invoice.status}
                />
            </div>
        </div>
    );
}
