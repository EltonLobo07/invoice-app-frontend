import React from "react";
import { Layout } from "~/src/components/auth/Layout";
import { CustomLabelledInput } from "~/src/components/auth/CustomLabelledInput";
import { CustomButton } from "~/src/components/auth/CustomButton";
import { helpers } from "~/src/helpers";
import { authService } from "~/src/services/authService";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [showCantBeEmptyMsg, setShowCantBeEmptyMsg] = React.useState(false);
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const navigate = useNavigate();

    const areAllRequiredFieldsFilled = () => {
        return (
            !helpers.isStrEmpty(fullName) &&
            !helpers.isStrEmpty(email) &&
            !helpers.isStrEmpty(password) && 
            !helpers.isStrEmpty(confirmPassword)
        );
    };

    const handleSignUp = async () => {
        const allRequiredFieldsFilled = areAllRequiredFieldsFilled();
        if (allRequiredFieldsFilled) {
            if (password !== confirmPassword) {
                console.log("password and confirmation password don't match");
            } else {
                try {
                    console.log(await authService.signUp({
                        name: fullName,
                        email,
                        password
                    }));
                    console.log("Sign up successful");
                    navigate("/login");
                }
                catch(error) {
                    console.log(error);
                }
            }
        } 
        setShowCantBeEmptyMsg(!allRequiredFieldsFilled);
    }; 

    const link = (
        <a
            className = "underline"
        >
            sign in to your existing account
        </a>
    );

    return (
        <Layout
            title = "Sign up"
            link = {link}
        >
            <Layout.Form>
                <CustomLabelledInput 
                    nativeSpanProps = {{
                        children: "full name",
                        className: "relative"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        value: fullName,
                        onChange: e => setFullName(e.target.value),
                        required: true
                    }}
                    _formSubmitBtnClicked = {showCantBeEmptyMsg}
                />
                <CustomLabelledInput 
                    nativeSpanProps = {{
                        children: "email"
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
                <CustomLabelledInput 
                    nativeSpanProps = {{
                        children: "password confirmation"
                    }}
                    nativeInputProps = {{
                        type: "password",
                        value: confirmPassword,
                        onChange: e => setConfirmPassword(e.target.value),
                        required: true
                    }}
                    _formSubmitBtnClicked = {showCantBeEmptyMsg}
                />
                <CustomButton
                    type = "button"
                    onClick = {handleSignUp}
                >
                    Sign up
                </CustomButton>
            </Layout.Form>
        </Layout>        
    );
}
