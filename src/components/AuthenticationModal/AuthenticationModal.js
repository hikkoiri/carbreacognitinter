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
                errorNotification("Username cannot be empty.")
                return;
            }

            if (signInPassword === "") {
                errorNotification("Password cannot be empty.")
                return;
            }

            await signInWithCredentials(signInUsername,signInPassword)
            
        } catch (error) {
            errorNotification(error.message)
            console.log('error signing in', error);
        } finally {
            setIsRequestInProcessing(false)
        }
    }

    async function signInWithCredentials(username, password){
        console.log("signing in")

        await Auth.signIn(username, password);
        //signin succeded
        signInComplete()
        successNotification("Sign In succeeded")
    }

    async function signUp() {

        //console.log("signing up")
        //console.log(signUpUsername)
        //console.log(signUpEmail)
        //console.log(signUpPassword)
        //console.log(signUpRepeatPassword)

        try {
            if (signUpUsername === "") {
                errorNotification("Username cannot be empty.")
                return;
            }

            if (signUpEmail === "") {
                errorNotification("Email cannot be empty.")
                return;
            }

            //check email validity
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(signUpEmail)) {
                errorNotification("Please enter a valid email address.")
                return;
            }


            if (signUpPassword === "") {
                errorNotification("Password cannot be empty.")
                return;
            }

            if (signUpRepeatPassword === "") {
                errorNotification("Repeat Password cannot be empty.")
                return;
            }

            if (signUpPassword !== signUpRepeatPassword) {
                errorNotification("Entered passwords do not match.")
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
            successNotification("Sign Up succeeded. Verify you account next.")
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
                errorNotification("Username cannot be empty.")
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
                errorNotification("Verification code cannot be empty.")
                return;
            }
            if (resetPasswordNewPassword === "") {
                errorNotification("New password cannot be empty.")
                return;
            }

            if (resetPasswordNewPasswordRepeat === "") {
                errorNotification("Repeat password cannot be empty.")
                return;
            }

            if (resetPasswordNewPasswordRepeat !== resetPasswordNewPassword) {
                errorNotification("Entered passwords do not match.")
                return;
            }

            await Auth.forgotPasswordSubmit(resetPasswordUsername, resetPasswordVerificationCode, resetPasswordNewPassword)
            successNotification("Password Reset succeeded")
            signInWithCredentials(resetPasswordUsername,resetPasswordNewPassword)
            
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
                return "Sign In"
            case 2:
                return "Sign Up"
            case 3:

                if (resetPasswordProgress === 0) {
                    return "Request Verification Code for Password Reset"
                } else {
                    return "Reset Password"
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
                modalLabel="User action"
                primaryButtonText={getActionName()}
                primaryButtonDisabled={isRequestInProcessing}
                secondaryButtonText="Cancel"
                onRequestSubmit={startAuthentication}>


                {currentAuthenticationMode === 1 &&
                    <>
                        <p> Don't have an account? <span onClick={() => setCurrentAuthenticationMode(2)}
                            className="pointer" >Create one</span></p>
                        <SignInForm
                            onUsernameChange={(username) => setSignInUsername(username)}
                            onPasswordChange={(password) => setSignInPassword(password)}
                            startPasswordReset={() => setCurrentAuthenticationMode(3)}
                        />
                    </>
                }

                {currentAuthenticationMode === 2 &&
                    <>
                        <p> Already have an account? <span onClick={() => setCurrentAuthenticationMode(1)} className="pointer" >Try signing in</span></p>
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
