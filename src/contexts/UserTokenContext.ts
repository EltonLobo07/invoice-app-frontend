import React from "react";

export type UserToken = {
    name: string,
    jsonWebToken: string
};

export function assertUserToken(possibleUserToken: unknown): asserts possibleUserToken is UserToken {
    if (
        possibleUserToken === null || (
            typeof possibleUserToken === "object" &&
            "name" in possibleUserToken &&
            typeof possibleUserToken["name"] === "string" &&
            "jsonWebToken" in possibleUserToken &&
            typeof possibleUserToken["jsonWebToken"] === "string"
        )
    ) {
        return;
    }
    throw new Error("Invalid user token");
}

type UserTokenOrNull = UserToken | null;

type UserTokenValueAndSetter = [UserTokenOrNull, (arg: UserTokenOrNull) => void];

export const UserTokenContext = React.createContext<UserTokenValueAndSetter | null>(null);
