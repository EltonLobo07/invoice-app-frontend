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

export function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showCantBeEmptyMsg, setShowCantBeEmptyMsg] = React.useState(false);
    const navigate = useNavigate();
    const [userToken, setUserToken] = useUserTokenContext();

    const areAllRequiredFieldsFilled = () => (
        !helpers.isStrEmpty(email) &&
        !helpers.isStrEmpty(password)
    );

    const handleLogin = async () => {
        const allRequiredFieldsFilled = areAllRequiredFieldsFilled(); 
        if (allRequiredFieldsFilled) {
            try {
                const response = await authService.login({
                    email,
                    password
                });
                setUserToken(response);
                navigate("/");
            }
            catch(error) {
                console.log(error);
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
        <a>
            sign up for a new account
        </a>
    );

    return (
        <Layout
            title = "Sign in to your account"
            link = {link}
        >
            <Layout.Form>
                <CustomLabelledInput 
                    nativeSpanProps = {{
                        children: "email address"
                    }}
                    nativeInputProps = {{
                        type: "email",
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
                        value: password,
                        onChange: e => setPassword(e.target.value),
                        required: true
                    }}
                    _formSubmitBtnClicked = {showCantBeEmptyMsg}
                />
                <CustomButton
                    type = "button"
                    onClick = {handleLogin}
                >
                    Sign in
                </CustomButton>
            </Layout.Form>
        </Layout>
    );
}
