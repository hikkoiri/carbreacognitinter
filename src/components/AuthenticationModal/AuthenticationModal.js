import React, {
    useState,
} from 'react';
import {
    Modal,
    ToastNotification,
} from 'carbon-components-react';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import { Auth } from 'aws-amplify';


const AuthenticationModal = ({ isOpen, close }) => {

    const [isSignInInsteadOfSignUp, setIsSignInInsteadOfSignUp] = useState(true)
    const [errorNotificationMessage, setErrorNotificationMessage] = useState("")
    const [errorTimeStamp, setErrorTimeStamp] = useState("")
    const [isErrorNotificationOpen, setIsErrorNotificationOpen] = useState(false)


    //sign in 
    const [signInUserIdentifier, setSignInUserIdentifier] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    //sign up
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpRepeatPassword, setSignUpRepeatPassword] = useState('')


    const toggle = () => {
        if (isSignInInsteadOfSignUp === true) {
            setIsSignInInsteadOfSignUp(false)
        } else {
            setIsSignInInsteadOfSignUp(true)
        }
    }

    const startAuthentication = () => {
        if (isSignInInsteadOfSignUp === true) {
            signIn()
        } else {
            signUp()
        }

    }


    async function signIn() {
        //console.log(signInUserIdentifier)
        //console.log(signInPassword)

        if (signInUserIdentifier === "") {
            showErrorMessage("User identifier cannot be empty. Please enter email or username.")
            return;
        }

        if (signInPassword === "") {
            showErrorMessage("Password cannot be empty.")
            return;
        }

        console.log("signing in")

        try {
            await Auth.signIn(signInUserIdentifier, signInPassword);
            //signup succeded
            close()
        } catch (error) {
            showErrorMessage(error.message)
            console.log('error signing in', error);
        }
    }

    async function signUp() {

        if (signUpUsername === "") {
            showErrorMessage("Username cannot be empty.")
            return;
        }

        if (signUpEmail === "") {
            showErrorMessage("Email cannot be empty.")
            return;
        }

        //check email validity
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(signUpEmail)) {
            showErrorMessage("Please enter a valid email address.")
            return;
        }


        if (signUpPassword === "") {
            showErrorMessage("Password cannot be empty.")
            return;
        }

        if (signUpRepeatPassword === "") {
            showErrorMessage("Repeat Password cannot be empty.")
            return;
        }

        if (signUpPassword !== signUpRepeatPassword) {
            showErrorMessage("Entered passwords do not match.")
            return;
        }

        //console.log("signing up")
        //console.log(signUpUsername)
        //console.log(signUpEmail)
        //console.log(signUpPassword)
        //console.log(signUpRepeatPassword)


        try {
            await Auth.signUp({
                username: signUpUsername,
                password: signUpPassword,
                attributes: {
                    email: signUpEmail
                }
            });

            //signup succeded
            close()
        } catch (error) {
            showErrorMessage(error.message)
            console.log('error signing up:', error);
        }
    }


    const showErrorMessage = (message) => {
        setErrorNotificationMessage(message)
        setErrorTimeStamp(new Date().toLocaleString())
        setIsErrorNotificationOpen(true)
        setTimeout(function () {
            setIsErrorNotificationOpen(false)
        }, 5000);

    }


    return (
        <div>
            <Modal
                open={isOpen}
                onRequestClose={close}
                modalHeading={isSignInInsteadOfSignUp ? "Sign In" : "Sign Up"}
                modalLabel="User action"
                primaryButtonText={isSignInInsteadOfSignUp ? "Sign In" : "Sign Up"}
                secondaryButtonText="Cancel"
                onRequestSubmit={startAuthentication}>


                {isSignInInsteadOfSignUp &&
                    <>
                        <p> Don't have an account? <a onClick={toggle} >Create one</a></p>
                        <SignInForm
                            onUserIdentifierChange={(id) => setSignInUserIdentifier(id)}
                            onPasswordChange={(password) => setSignInPassword(password)}
                        />
                    </>
                }

                {!isSignInInsteadOfSignUp &&
                    <>
                        <p> Already have an account? <a onClick={toggle} >Try signing in</a></p>
                        <SignUpForm
                            onUsernameChange={(username) => setSignUpUsername(username)}
                            onEmailChange={(email) => setSignUpEmail(email)}
                            onPasswordChange={(password) => setSignUpPassword(password)}
                            onRepeatPasswordChange={(repeatedPassword) => setSignUpRepeatPassword(repeatedPassword)}
                        />
                    </>
                }

            </Modal>
            <ToastNotification
                style={{ marginTop: '1rem', marginRight: '1rem', position: 'absolute', right: '0px', display: isErrorNotificationOpen ? 'flex' : 'none' }}
                kind="error"
                title="An error occured!"
                caption={errorNotificationMessage}
                subtitle={errorTimeStamp}
                timeout={0}
                onCloseButtonClick={() => setIsErrorNotificationOpen(false)}
            />
        </div>
    )
}

export default AuthenticationModal;
