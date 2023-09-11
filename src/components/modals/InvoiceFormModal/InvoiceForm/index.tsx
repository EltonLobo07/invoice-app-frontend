import React from "react";
import { GoBackBtn } from "~/src/components/GoBackBtn";
import { useThemeContext } from "~/src/custom-hooks/useThemeContext";
import { helpers } from "~/src/helpers";
import { InvoiceWithItemId, invoiceService } from "~/src/services/invoiceService";
import { twStyles } from "~/src/twStyles";
import { DeepReadonly, OptionalKey } from "~/src/types/helpers";
import { VisuallyHidden } from "~/src/components/VisuallyHidden";
import { InvoiceId } from "~/src/components/InvoiceId";
import { AddressFormFields } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/AddressFormFields";
import { LabelledInput } from "~/src/components/modals/InvoiceFormModal/LabelledInput";
import { Button } from "~/src/components/Button";
import { ItemsFormFields } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/ItemsFormFields";
import { PaymentTermsSelect } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/PaymentTermsSelect";
import { SpanLabel } from "~/src/components/modals/InvoiceFormModal/SpanLabel";
import { useObjectState } from "~/src/custom-hooks/useObjectState";
import { common } from "~/src/components/modals/InvoiceFormModal/InvoiceForm/common";
import { Invoice } from "~/src/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
    onCancel: () => void,
    invoiceToEdit?: DeepReadonly<InvoiceWithItemId>,
    onInvoiceEditSuccess?: (updatedInvoice: InvoiceWithItemId) => void,
    onInvoiceSaveSuccess?: (createdInvoice: InvoiceWithItemId) => void
};

type Address = DeepReadonly<InvoiceWithItemId["clientAddress"]>;
type Items = DeepReadonly<InvoiceWithItemId["items"]>;

function isStrEmpty(arg: string) {
    return arg.length === 0;
}

function generateRandomInvoiceId(): InvoiceWithItemId["id"] {
    return [
        helpers.generateRandomUpperCaseEngLetter(),
        helpers.generateRandomUpperCaseEngLetter(),
        helpers.generateRandomDigit(),
        helpers.generateRandomDigit(),
        helpers.generateRandomDigit(),
        helpers.generateRandomDigit()
    ].join("");
}

export function InvoiceForm(props: Props) {
    const initialFormSubmitBtnClicked = () => false;
    const initialSenderAddress = () => props.invoiceToEdit?.senderAddress ?? common.addressInitializer();
    const initialClientAddress = () => props.invoiceToEdit?.clientAddress ?? common.addressInitializer();
    const initialClientName = () => props.invoiceToEdit?.clientName ?? "";
    const initialClientEmail = () => props.invoiceToEdit?.clientEmail ?? "";
    const initialInvoiceDate = () => props.invoiceToEdit?.createdAt ?? new Date().toISOString().slice(0, "yyyy-mm-dd".length);
    const initialPaymentTerm = () => props.invoiceToEdit?.paymentTerms ?? 1;
    const initialProjectDescription = () => props.invoiceToEdit?.description ?? "";
    const initialItems = () => props.invoiceToEdit?.items ?? [];

    const [formSubmitBtnClicked, setFormSubmitBtnClicked] = React.useState(initialFormSubmitBtnClicked);
    const [senderAddress, setSenderAddress] = useObjectState<Address>(initialSenderAddress);
    const [clientAddress, setClientAddress] = useObjectState<Address>(initialClientAddress);
    const [clientName, setClientName] = React.useState(initialClientName);
    const [clientEmail, setClientEmail] = React.useState(initialClientEmail);
    const [invoiceDate, setInvoiceDate] = React.useState(initialInvoiceDate);
    const [paymentTerm, setPaymentTerm] = React.useState<Invoice["paymentTerms"]>(initialPaymentTerm); 
    const [projectDescription, setProjectDescription] = React.useState(initialProjectDescription);
    const [items, setItems] = React.useState<Items>(initialItems);
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const [theme] = useThemeContext();
    const intersectionObserverTargetRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const intersectionObserverTarget = intersectionObserverTargetRef.current;
        if (!intersectionObserverTarget) {
            return;
        }
        const observer = new IntersectionObserver(
            entries => {
                const firstEntry = entries[0];
                setIsIntersecting(firstEntry.isIntersecting);
            },
            {
                threshold: 0.1
            }
        );  
        observer.observe(intersectionObserverTarget);
        return () => {
            observer.unobserve(intersectionObserverTarget);
        };
    }, []);

    const lightTheme = theme === "light";
    const horizontalPadding = "px-24px tabAndUp:px-56px";
    const fromToLegendClassNames = `text-fig-ds-01 mb-6 ${twStyles.fontFigHeadingSVar}`;
    const commonMarginTop = "mt-10 tabAndUp:mt-12";
    const showAllFieldsMustBeAddedMsg = !formSubmitBtnClicked; // Todo (Incomplete)

    const areAllAddressFieldsFilled = (address: Address) => {
        for (const key of Object.keys(address)) {
            if (isStrEmpty(address[key as keyof Address])) {
                return false;
            }
        }
        return true;
    };

    const areAlllItemsNameFilled = () => {
        for (const item of items) {
            if (isStrEmpty(item.name)) {
                return false;
            }
        }
        return true;
    };

    const areAllFieldsFilled = () => {
        return (
            areAllAddressFieldsFilled(senderAddress) &&
            areAllAddressFieldsFilled(clientAddress) &&
            !isStrEmpty(clientName) &&
            !isStrEmpty(clientEmail) &&
            !isStrEmpty(invoiceDate) &&
            !isStrEmpty(projectDescription) &&
            areAlllItemsNameFilled()
        );
    };

    const createInvoiceFromFields = (): OptionalKey<DeepReadonly<Invoice>, "status"> => {
        const assertInvoiceDate: (typeof helpers)["assertInvoiceDate"] = helpers.assertInvoiceDate;
        assertInvoiceDate(invoiceDate);
        return {
            id: props.invoiceToEdit?.id ?? generateRandomInvoiceId(),
            status: props.invoiceToEdit?.status,
            senderAddress,
            clientAddress,
            clientEmail,
            clientName,
            createdAt: invoiceDate,
            paymentDue: helpers.getInvoiceDate(
                helpers.getDateAfterNumDays(
                    new Date(invoiceDate), 
                    paymentTerm
                )
            ),
            description: projectDescription,
            paymentTerms: paymentTerm,
            items
        };
    };

    const handleSaveChange = async () => {
        setFormSubmitBtnClicked(true);
        if (areAllFieldsFilled()) {
            try {
                const invoiceObj = createInvoiceFromFields();
                const { status } = invoiceObj;
                if (status === undefined) {
                    throw new Error("status cannot be undefined when saving changes");
                }
                const updatedInvoice = await invoiceService.updateInvoice({
                    ...invoiceObj, 
                    status: status === "draft" ? "pending" : status
                });
                props.onInvoiceEditSuccess?.(updatedInvoice);
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    const handleSaveAndSend = async () => {
        setFormSubmitBtnClicked(true);
        if (areAllFieldsFilled()) {
            try {
                const invoiceObj = createInvoiceFromFields();
                const createdInvoice = await invoiceService.addInvoice({...invoiceObj, status: "pending"});
                props.onInvoiceSaveSuccess?.(createdInvoice);
            }
            catch(error) {
                console.log(error);
            }
        }
    };

    const handleSaveAsDraft = async () => {
        try {
            const invoiceObj = createInvoiceFromFields();
            const draftInvoice = await invoiceService.addInvoice({...invoiceObj, status: "draft"});
            props.onInvoiceSaveSuccess?.(draftInvoice);
        }
        catch(error) {
            console.log(error);
        }
    };

    const handleDiscard = () => {
        setFormSubmitBtnClicked(initialFormSubmitBtnClicked);
        setSenderAddress(initialSenderAddress());
        setClientAddress(initialClientAddress());
        setClientName(initialClientName());
        setClientEmail(initialClientEmail());
        setInvoiceDate(initialInvoiceDate());
        setPaymentTerm(initialPaymentTerm());
        setProjectDescription(initialProjectDescription());
        setItems(initialItems());
    };

    const actionBtnGapClassName = "gap-x-[8px] gap-y-2";
    let actionBtnsJSX: JSX.Element;
    if (props.invoiceToEdit) {
        actionBtnsJSX = (
            <>
                <Button
                    customType = "plain"
                    nativeBtnProps = {{
                        type: "button",
                        onClick: props.onCancel,
                        className: "ml-auto"
                    }}
                >
                    cancel
                </Button>
                <Button
                    customType = "primary"
                    nativeBtnProps = {{
                        type: "button",
                        onClick: handleSaveChange
                    }}
                >
                    save changes
                </Button>
            </>
        );
    } else {
        actionBtnsJSX = (
            <>
                <Button
                    customType = "plain"
                    nativeBtnProps = {{
                        type: "button",
                        onClick: handleDiscard,
                        className: "self-center"
                    }}
                >
                    discard
                </Button>
                <div
                    className = {helpers.formatClassNames(
                        `
                            ml-auto
                            flex justify-end flex-wrap
                            ${actionBtnGapClassName}
                        `
                    )}
                >
                    <Button
                        customType = "plain-darker"
                        nativeBtnProps = {{
                            type: "button",
                            onClick: handleSaveAsDraft,
                            className: "normal-case ml-auto whitespace-nowrap"
                        }}
                    >
                        Save as Draft
                    </Button>
                    <Button
                        customType = "primary"
                        nativeBtnProps = {{
                            type: "button",
                            onClick: () => handleSaveAndSend(),
                            className: "whitespace-nowrap"
                        }}
                    >
                        save & send
                    </Button>
                </div>
            </>
        );
    }

    return (
        <form
            className = "w-full h-full overflow-y-auto flex flex-col capitalize relative"
        >
            <GoBackBtn 
                onClick = {props.onCancel}
                className = {helpers.formatClassNames(
                    `
                        ${horizontalPadding}
                        mb-[1.625rem]
                        tabAndUp:hidden
                    `
                )}
            />
            <h3
                aria-hidden
                className = {helpers.formatClassNames(
                    `
                        ${horizontalPadding}
                        ${twStyles.fontFigHeadingM}
                        ${lightTheme ? "text-fig-ds-08" : "text-white"}
                        relative
                        mb-[1.375rem] tabAndUp:mb-[2.875rem]
                    `
                )}
            >
                {
                    props.invoiceToEdit
                    ? (
                        <>
                            {"edit "}
                            <VisuallyHidden
                                useSpanTag
                            >
                                invoice with unique identifier
                            </VisuallyHidden> 
                            <InvoiceId 
                                value = {props.invoiceToEdit.id}
                                rootClassName = {twStyles.fontFigHeadingM}
                            />
                        </>
                    )
                    : "new invoice"
                }  
            </h3>
            <div
                className = {helpers.formatClassNames(
                    `
                        flex-grow overflow-y-auto
                        flex flex-col
                        pb-[4px]
                        ${horizontalPadding}
                    `
                )}
            >
                <fieldset>
                    <legend
                        className = {fromToLegendClassNames}
                    >
                        bill from
                    </legend>
                    <AddressFormFields
                        address = {senderAddress}
                        addressSetter = {setSenderAddress}
                        formSubmitBtnCliked = {formSubmitBtnClicked}
                    />
                </fieldset>
                <fieldset
                    className = {commonMarginTop}
                >
                    <legend
                        className = {fromToLegendClassNames}
                    >
                        bill to
                    </legend>
                    <div
                        className = "flex flex-col gap-y-6"
                    >
                        <LabelledInput 
                            nativeSpanProps = {{
                                children: "client's name"
                            }}
                            nativeInputProps = {{
                                type: "text",
                                value: clientName,
                                onChange: e => setClientName(e.target.value)
                            }}
                            _formSubmitBtnClicked = {formSubmitBtnClicked}
                        />
                        <LabelledInput 
                            nativeSpanProps = {{
                                children: "client's email"
                            }}
                            nativeInputProps = {{
                                type: "email",
                                value: clientEmail,
                                onChange: e => setClientEmail(e.target.value),
                                placeholder: "e.g. email@example.com"
                            }}
                            _formSubmitBtnClicked = {formSubmitBtnClicked}
                        />
                        <AddressFormFields
                            address = {clientAddress} 
                            addressSetter = {setClientAddress}
                            formSubmitBtnCliked = {formSubmitBtnClicked}
                        />
                    </div>
                </fieldset>
                <fieldset
                    className = {helpers.formatClassNames(
                        `
                            relative
                            flex gap-6 flex-wrap
                            ${commonMarginTop}
                        `
                    )}
                >
                    <VisuallyHidden>
                        <legend>
                            basic details
                        </legend>
                    </VisuallyHidden>
                    <LabelledInput 
                        nativeSpanProps = {{
                            children: "invoice date"
                        }}
                        nativeInputProps = {{
                            type: "date",
                            value: invoiceDate,
                            onChange: e => setInvoiceDate(e.target.value),
                            style: {
                                colorScheme: theme
                            }
                        }}
                        _formSubmitBtnClicked = {formSubmitBtnClicked}
                        className = "basis-60 flex-grow"
                    />
                    <label
                        className = "basis-60 flex-grow flex flex-col gap-y-2"
                    >
                        <SpanLabel>
                            payment terms
                        </SpanLabel>
                        <PaymentTermsSelect 
                            value = {paymentTerm}
                            onChange = {setPaymentTerm}
                        />
                    </label>
                    <LabelledInput 
                        nativeSpanProps = {{
                            children: "project description"
                        }}
                        nativeInputProps = {{
                            type: "text",
                            value: projectDescription,
                            onChange: e => setProjectDescription(e.target.value)
                        }}
                        _formSubmitBtnClicked = {formSubmitBtnClicked}
                        className = "w-full"
                    />
                </fieldset>
                <fieldset
                    className = "mt-16 tabAndUp:mt-7 laptopAndUp:mt-9"
                >
                    <legend
                        className = {helpers.formatClassNames(
                            `
                                ${twStyles.fontFigHeadingS}
                                relative
                                text-stone-wash
                                inline-block mb-5 tabAndUp:mb-4
                            `
                        )}
                    >
                        <VisuallyHidden
                            useSpanTag
                        >
                            item table
                        </VisuallyHidden>
                        <span
                            aria-hidden
                            className = "inline-block"
                        >
                            item list
                        </span>
                    </legend>
                    <ItemsFormFields
                        items = {items}
                        onItemsChange = {setItems}
                        onItemDelete = {item => setItems(items.filter(curItem => curItem.id !== item.id))}
                        formSubmitBtnClicked = {formSubmitBtnClicked}
                    />
                    {
                        items.length === 0 && (
                            <div
                                className = {helpers.formatClassNames(
                                    `
                                        mb-4
                                        normal-case
                                        flex justify-center
                                        ${twStyles.fontFigBetweenBodyAndHeading}
                                        ${lightTheme ? "text-black" : "text-white"}
                                    `
                                )}
                            >
                                No item added
                            </div>
                        )
                    }
                    <Button
                        customType = "secondary"
                        nativeBtnProps = {{
                            type: "button",
                            onClick: () => setItems(
                                [
                                    ...items,
                                    {
                                        id: uuidv4(),
                                        name: "",
                                        price: 0,
                                        quantity: 1,
                                        total: 0
                                    }
                                ]
                            ),
                            className: "w-full"
                        }}
                    >
                        add new items
                    </Button>
                </fieldset>
                <div
                    ref = {intersectionObserverTargetRef}
                    className = "h-2 w-full bg-inherit"
                ></div>
            </div>
            <div
                className = "relative h-[1px] w-full bg-transparent"
            >
                <div
                    className = {helpers.formatClassNames(
                        `
                            h-[200px]
                            absolute left-0 right-0 top-0 -translate-y-[100%]
                            pointer-events-none 
                            ${
                                isIntersecting 
                                ? "bg-transparent" 
                                : "bg-[linear-gradient(180deg,rgba(0,0,0,0.0001)_0%,_rgba(0,0,0,0.1)_100%)]"
                            }
                        `
                    )}
                >
                </div>
            </div>
            <div
                role = "alert"
                className = {helpers.formatClassNames(
                    `
                        ${helpers.passIfTrueElseEmpty(showAllFieldsMustBeAddedMsg, "hidden")}
                        ${twStyles.fontFigBetweenBodyAndHeading}
                        ${horizontalPadding}
                        mt-8
                        normal-case
                        text-fig-ds-09
                    `
                )}
            >
                All fields must be added if you wish to save & send
            </div>
            <fieldset
                className = {helpers.formatClassNames(
                    `
                        relative
                        flex
                        py-5 tabAndUp:py-8
                        tabAndUp:rounded-br-[20px]
                        rounded-t-[20px]
                        ${lightTheme ? "bg-white" : "bg-fig-ds-12"}
                        ${horizontalPadding}
                        ${actionBtnGapClassName}
                    `
                )}
            >
                <VisuallyHidden>
                    <legend>
                        actions
                    </legend>
                </VisuallyHidden>
                {actionBtnsJSX}
            </fieldset>
        </form>
    );
}
