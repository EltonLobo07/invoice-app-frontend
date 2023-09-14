import React from "react";
import { Layout } from "~/src/components/auth/Layout";
import { CustomLabelledInput } from "~/src/components/auth/CustomLabelledInput";
import { CustomButton } from "~/src/components/auth/CustomButton";
import { helpers } from "~/src/helpers";
import { authService } from "~/src/services/authService";
import { 
    Navigate, 
    useNavigate 
} from "react-router-dom";
import { useUserTokenContext } from "~/src/custom-hooks/useUserTokenContext";
import { CustomLink } from "~/src/components/CustomLink";
import { useAsyncTaskResultContext } from "~/src/custom-hooks/useAsyncTaskResultContext";
import { AxiosError } from "axios";
import { BtnContent } from "~/src/components/StartTaskButton/BtnContent";

export function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showCantBeEmptyMsg, setShowCantBeEmptyMsg] = React.useState(false);
    const [loginRequestRunning, setLoginRequestRunning] = React.useState(false);
    const navigate = useNavigate();
    const [userToken, setUserToken] = useUserTokenContext();
    const asyncTaskResultMsgSetter = useAsyncTaskResultContext()[1];

    const areAllRequiredFieldsFilled = () => (
        !helpers.isStrEmpty(email) &&
        !helpers.isStrEmpty(password)
    );

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allRequiredFieldsFilled = areAllRequiredFieldsFilled(); 
        if (allRequiredFieldsFilled) {
            setLoginRequestRunning(true);
            try {
                const response = await authService.login({
                    email,
                    password
                });
                setUserToken(response);
                navigate("/");
                asyncTaskResultMsgSetter({
                    type: "success",
                    message: `Welcome ${response.name}!`
                });
            }
            catch(error) {
                let  message: string;
                if (error instanceof AxiosError) {
                    message = error.response?.status === 401 ? "Invalid credentials" : helpers.getBackendErrorStrIfPossible(error);
                } else if (error instanceof Error) {
                    message = error.message;
                } else {
                    message = "Try refreshing the page";
                    console.log(error);
                }
                asyncTaskResultMsgSetter({
                    type: "error",
                    message
                });
            }
            finally {
                setLoginRequestRunning(false);
            }
        }
        setShowCantBeEmptyMsg(!allRequiredFieldsFilled);
    };

    if (userToken) {
        return (
            <Navigate 
                to = "/"
            />
        );
    }

    const link = (
        <CustomLink
            to = "/signup"
        >
            sign up for a new account
        </CustomLink>
    );

    return (
        <Layout
            title = "Sign in to your account"
            link = {link}
        >
            <Layout.Form
                onSubmit = {handleLogin}
            >
                <CustomLabelledInput 
                    nativeSpanProps = {{
                        children: "email address"
                    }}
                    nativeInputProps = {{
                        type: "email",
                        placeholder: "email@example.com",
                        value: email,
                        onChange: e => setEmail(e.target.value),
                        required: true
                    }}
                    _formSubmitBtnClicked = {showCantBeEmptyMsg}
                />
                <CustomLabelledInput
                    nativeSpanProps = {{
                        children: "password"
                    }} 
                    nativeInputProps = {{
                        type: "password",
                        autoComplete: "on",
                        value: password,
                        onChange: e => setPassword(e.target.value),
                        required: true
                    }}
                    _formSubmitBtnClicked = {showCantBeEmptyMsg}
                />
                <CustomButton
                    type = "submit"
                    className = "flex gap-x-1 justify-center items-center"
                >
                    <BtnContent
                        asyncTaskRunning = {loginRequestRunning}
                        duringTaskMessage = "trying to login"
                    >
                        <span
                            className = "mt-[0.125rem]"
                        >
                            Sign in
                        </span>
                    </BtnContent>
                </CustomButton>
            </Layout.Form>
        </Layout>
    );
}
