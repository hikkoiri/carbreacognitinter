import React, {
    useState,
} from 'react';
import {
    Modal,
} from 'carbon-components-react';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import { Auth } from 'aws-amplify';
import ResetPasswordForm from '../ResetPasswordForm';
import { useTranslation } from 'react-i18next';


const AuthenticationModal = ({ isOpen,
    close,
    signInComplete,
    signUpComplete,
    successNotification,
    errorNotification }) => {

    //general
    const [currentAuthenticationMode, setCurrentAuthenticationMode] = useState(1)
    // 1 -> Sign In
    // 2 -> Sign Up
    // 3 -> Reset Password
    const [isRequestInProcessing, setIsRequestInProcessing] = useState(false)
    const { t } = useTranslation();


    //sign in 
    const [signInUsername, setSignInUsername] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    //sign up
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpRepeatPassword, setSignUpRepeatPassword] = useState('')

    //reset password
    const [resetPasswordProgress, setResetPasswordProgress] = useState(0)
    const [resetPasswordUsername, setResetPasswordUsername] = useState('')
    const [resetPasswordVerificationCode, setResetPasswordVerificationCode] = useState('')
    const [resetPasswordNewPassword, setResetPasswordNewPassword] = useState('')
    const [resetPasswordNewPasswordRepeat, setResetPasswordNewPasswordRepeat] = useState('')




    const startAuthentication = () => {

        setIsRequestInProcessing(true)

        switch (currentAuthenticationMode) {
            case 1:
                // sign in 
                signIn()
                break;
            case 2:
                // sign up
                signUp()
                break;
            case 3:
                // reset password
                if (resetPasswordProgress === 0) {
                    resetPassword()
                } else {
                    resetPasswordSubmit()
                }
                break;
            default:
            //should never enter here
        }
    }

    async function signIn() {

        //console.log(signInUsername)
        //console.log(signInPassword)

        try {
            if (signInUsername === "") {
                errorNotification(t("authenticationModal.signin.errornotification.usernamemissing"))
                return;
            }

            if (signInPassword === "") {
                errorNotification(t("authenticationModal.signin.errornotification.passwordmissing"))
                return;
            }

            await signInWithCredentials(signInUsername, signInPassword)

        } catch (error) {
            errorNotification(error.message)
            console.log('error signing in', error);
        } finally {
            setIsRequestInProcessing(false)
        }
    }

    async function signInWithCredentials(username, password) {
        console.log("signing in")

        await Auth.signIn(username, password);
        //signin succeded
        signInComplete()
        successNotification(t("authenticationModal.signin.successnotification.siginsuceeded"))
    }

    async function signUp() {

        //console.log("signing up")
        //console.log(signUpUsername)
        //console.log(signUpEmail)
        //console.log(signUpPassword)
        //console.log(signUpRepeatPassword)

        try {
            if (signUpUsername === "") {
                errorNotification(t("authenticationModal.signup.errornotification.usernamemissing"))
                return;
            }

            if (signUpEmail === "") {
                errorNotification(t("authenticationModal.signup.errornotification.emailmissing"))
                return;
            }

            //check email validity
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(signUpEmail)) {
                errorNotification(t("authenticationModal.signup.errornotification.emailinvalid"))
                return;
            }


            if (signUpPassword === "") {
                errorNotification(t("authenticationModal.signup.errornotification.passwordmissing"))
                return;
            }

            if (signUpRepeatPassword === "") {
                errorNotification(t("authenticationModal.signup.errornotification.repeatpasswordmissing"))
                return;
            }

            if (signUpPassword !== signUpRepeatPassword) {
                errorNotification(t("authenticationModal.signup.errornotification.passwordmismatch"))
                return;
            }

            await Auth.signUp({
                username: signUpUsername,
                password: signUpPassword,
                attributes: {
                    email: signUpEmail
                }
            });

            //signup succeded
            signUpComplete()
            successNotification(t("authenticationModal.signup.successnotification.siginsuceeded"))
        } catch (error) {
            errorNotification(error.message)
            console.log('error signing up:', error);
        } finally {
            setIsRequestInProcessing(false)
        }
    }

    async function resetPassword() {
        try {
            console.log("starting password reset")
            if (resetPasswordUsername === "") {
                errorNotification(t("authenticationModal.passwordreset.errornotification.usernamemissing"))
                return;
            }

            await Auth.forgotPassword(resetPasswordUsername)
            setResetPasswordProgress(1)

        } catch (error) {
            errorNotification(error.message)
            console.log('error sending verification code:', error);
        } finally {
            setIsRequestInProcessing(false)
        }
    }

    async function resetPasswordSubmit() {
        try {
            console.log("submitting password reset")

            if (resetPasswordVerificationCode === "") {
                errorNotification(t("authenticationModal.passwordresetsubmit.errornotification.codemissing"))
                return;
            }
            if (resetPasswordNewPassword === "") {
                errorNotification(t("authenticationModal.passwordresetsubmit.errornotification.passwordmissing"))
                return;
            }

            if (resetPasswordNewPasswordRepeat === "") {
                errorNotification(t("authenticationModal.passwordresetsubmit.errornotification.repeatpasswordmissing"))
                return;
            }

            if (resetPasswordNewPasswordRepeat !== resetPasswordNewPassword) {
                errorNotification(t("authenticationModal.passwordresetsubmit.errornotification.passwordmismatch"))
                return;
            }

            await Auth.forgotPasswordSubmit(resetPasswordUsername, resetPasswordVerificationCode, resetPasswordNewPassword)
            successNotification(t("authenticationModal.passwordresetsubmit.successnotification.suceeded"))
            signInWithCredentials(resetPasswordUsername, resetPasswordNewPassword)

        } catch (error) {
            errorNotification(error.message)
            console.log('error resetting password: ', error);
        } finally {
            setIsRequestInProcessing(false)
        }
    }


    function getActionName() {
        switch (currentAuthenticationMode) {
            case 1:
                return t("authenticationModal.signin.actionname")
            case 2:
                return t("authenticationModal.signup.actionname")
            case 3:

                if (resetPasswordProgress === 0) {
                    return t("authenticationModal.passwordreset.actionname")
                } else {
                    return t("authenticationModal.passwordresetsubmit.actionname")
                }

            default:
            //should never enter here
        }
        return { currentAuthenticationMode }
    }

    return (
        <div>

            <Modal
                open={isOpen}
                onRequestClose={close}
                modalHeading={getActionName()}
                modalLabel={t("authenticationModal.label")}
                primaryButtonText={getActionName()}
                primaryButtonDisabled={isRequestInProcessing}
                secondaryButtonText={t("authenticationModal.cancelbutton")}
                onRequestSubmit={startAuthentication}>


                {currentAuthenticationMode === 1 &&
                    <>
                        <p>{t("authenticationModal.signin.signupreferrer.question")}
                            <span onClick={() => setCurrentAuthenticationMode(2)}
                                className="pointer" >{t("authenticationModal.signin.signupreferrer.link")}
                            </span>
                        </p>
                        <SignInForm
                            onUsernameChange={(username) => setSignInUsername(username)}
                            onPasswordChange={(password) => setSignInPassword(password)}
                        />
                        <br />

                        <p>{t("authenticationModal.signin.passwordresetreferrer.question")} <span onClick={() => setCurrentAuthenticationMode(3)} className="pointer" >
                            {t("authenticationModal.signin.passwordresetreferrer.link")}
                        </span>
                        </p>
                    </>
                }

                {currentAuthenticationMode === 2 &&
                    <>
                        <p>{t("authenticationModal.signup.signinreferrer.question")}
                            <span onClick={() => setCurrentAuthenticationMode(1)} className="pointer" >
                                {t("authenticationModal.signup.signinreferrer.link")}
                            </span>
                        </p>
                        <SignUpForm
                            onUsernameChange={(username) => setSignUpUsername(username)}
                            onEmailChange={(email) => setSignUpEmail(email)}
                            onPasswordChange={(password) => setSignUpPassword(password)}
                            onRepeatPasswordChange={(repeatedPassword) => setSignUpRepeatPassword(repeatedPassword)}
                        />
                    </>
                }

                {currentAuthenticationMode === 3 &&
                    <ResetPasswordForm
                        resetPasswordProgress={resetPasswordProgress}
                        onUsernameChange={(username) => setResetPasswordUsername(username)}
                        onVerificationCodeChange={(verificationCode) => setResetPasswordVerificationCode(verificationCode)}
                        onPasswordChange={(password) => setResetPasswordNewPassword(password)}
                        onRepeatPasswordChange={(repeatedPassword) => setResetPasswordNewPasswordRepeat(repeatedPassword)}
                    />
                }

            </Modal>
        </div>
    )
}



export default AuthenticationModal;
