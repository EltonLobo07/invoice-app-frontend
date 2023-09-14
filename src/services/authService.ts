import axios from "axios";
import { common } from "~/src/services/common";

const instance = axios.create({
    baseURL: common.baseUrl,
});

type SignUpDetails = {
    name: string,
    email: string,
    password: string
};

async function signUp(details: SignUpDetails) {
    return (await instance.post("/users", details)).data;
}

async function login(details: Omit<SignUpDetails, "name">) {
    return (await instance.post<{name: string, jsonWebToken: string}>("/login", details)).data;
}

export const authService = {
    signUp,
    login
};
