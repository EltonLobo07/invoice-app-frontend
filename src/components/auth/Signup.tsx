import React from "react";
import { Layout } from "~/src/components/auth/Layout";
import { CustomLabelledInput } from "~/src/components/auth/CustomLabelledInput";
import { CustomButton } from "~/src/components/auth/CustomButton";
import { helpers } from "~/src/helpers";
import { authService } from "~/src/services/authService";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "~/src/components/auth/CustomLink";
import { twStyles } from "~/src/twStyles";

export function Signup() {
    const [showCantBeEmptyMsg, setShowCantBeEmptyMsg] = React.useState(false);
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [didUserAttemptToSignUp, setDidUserAttemptToSignUp] = React.useState(false);
    const [showPasswordDontMatchMsg, setShowPasswordDontMatch] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (password !== confirmPassword) {
            if (didUserAttemptToSignUp && !showPasswordDontMatchMsg) {
                setShowPasswordDontMatch(true);
            }
        } else if (showPasswordDontMatchMsg) {
            setShowPasswordDontMatch(false);
        }
    }, [didUserAttemptToSignUp, showPasswordDontMatchMsg, password, confirmPassword]);

    const areAllRequiredFieldsFilled = () => {
        return (
            !helpers.isStrEmpty(fullName) &&
            !helpers.isStrEmpty(email) &&
            !helpers.isStrEmpty(password) && 
            !helpers.isStrEmpty(confirmPassword)
        );
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allRequiredFieldsFilled = areAllRequiredFieldsFilled();
        if (allRequiredFieldsFilled) {
            if (password !== confirmPassword) {
                setShowPasswordDontMatch(true);
            } else {
                try {
                    await authService.signUp({
                        name: fullName,
                        email,
                        password
                    });
                    navigate("/login");
                }
                catch(error) {
                    console.log(error);
                }
            }
        } 
        setShowCantBeEmptyMsg(!allRequiredFieldsFilled);
        setDidUserAttemptToSignUp(true);
    }; 

    const link = (
        <CustomLink
            to = "/login"
        >
            sign in to your existing account
        </CustomLink>
    );

    return (
        <Layout
            title = "Sign up"
            link = {link}
        >
            <Layout.Form
                className = "pb-6"
                onSubmit = {handleSignUp}
            >
                <CustomLabelledInput 
                    nativeSpanProps = {{
                        children: "full name",
                        className: "relative"
                    }}
                    nativeInputProps = {{
                        type: "text",
                        placeholder: "Elton Lobo",
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
                <div
                    className = "flex flex-col gap-y-2"
                >
                    <CustomButton
                        type = "submit"
                    >
                        Sign up
                    </CustomButton>
                    <div
                        aria-atomic
                        aria-live = "assertive"
                        aria-relevant = "additions"
                    >
                        <p
                            className = {helpers.formatClassNames(
                                `
                                    text-fig-ds-09
                                    normal-case
                                    ${twStyles.fontFigBetweenBodyAndHeading}
                                `
                            )}
                        >
                            {
                                showPasswordDontMatchMsg
                                ? "password and confirmation password don't match"
                                : ""
                            }
                        </p>
                    </div>
                </div>
            </Layout.Form>
        </Layout>        
    );
}
