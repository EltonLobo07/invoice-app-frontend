import React from "react";
import { Layout } from "~/src/components/auth/Layout";
import { CustomLabelledInput } from "~/src/components/auth/CustomLabelledInput";
import { CustomButton } from "~/src/components/auth/CustomButton";
import { helpers } from "~/src/helpers";
import { authService } from "~/src/services/authService";
import { useNavigate } from "react-router-dom";
import { CustomLink } from "~/src/components/auth/CustomLink";
import { twStyles } from "~/src/twStyles";
import { AxiosError } from "axios";
import { useAsyncTaskResultContext } from "~/src/custom-hooks/useAsyncTaskResultContext";
import { BtnContent } from "~/src/components/StartTaskButton/BtnContent";

export function Signup() {
    const [showCantBeEmptyMsg, setShowCantBeEmptyMsg] = React.useState(false);
    const [fullName, setFullName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [didUserAttemptToSignUp, setDidUserAttemptToSignUp] = React.useState(false);
    const [showPasswordDontMatchMsg, setShowPasswordDontMatch] = React.useState(false);
    const [signUpRequestRunning, setSignUpRequestRunning] = React.useState(false);
    const asyncTaskResultMsgSetter = useAsyncTaskResultContext()[1];
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
                setSignUpRequestRunning(true);
                try {
                    await authService.signUp({
                        name: fullName,
                        email,
                        password
                    });
                    asyncTaskResultMsgSetter({
                        type: "success",
                        message: "Account created"
                    })
                    navigate("/login");
                }
                catch(error) {
                    let  message: string;
                    if (error instanceof AxiosError) {
                        message = helpers.getBackendErrorStrIfPossible(error);
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
                    setSignUpRequestRunning(false);
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
                        autoComplete: "off",
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
                        autoComplete: "off",
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
                        className = "flex gap-x-1 justify-center items-center"
                    >
                        <BtnContent
                            asyncTaskRunning = {signUpRequestRunning}
                            duringTaskMessage = "trying to create an account"
                        >
                            <span
                                className = "mt-[0.125rem]"
                            >
                                Sign up
                            </span>
                        </BtnContent>
                    </CustomButton>
                    <div
                        aria-atomic
                        aria-live = "polite"
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
