import { Invoice } from "~/src/types";

function addressInitializer(): Invoice["clientAddress"] {
    return {
        street: "",
        city: "",
        postCode: "",
        country: ""
    };
}

export const common = {
    addressInitializer
};
