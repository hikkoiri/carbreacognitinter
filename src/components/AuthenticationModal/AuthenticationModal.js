import React, {
    useState,
} from 'react';
import {
    Modal,
} from 'carbon-components-react';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import { Auth } from 'aws-amplify';


const AuthenticationModal = ({ isOpen,
     close, 
     signInComplete,
     signUpComplete,
     successNotification,
      errorNotification }) => {

    //general
    const [isSignInInsteadOfSignUp, setIsSignInInsteadOfSignUp] = useState(true)
    const [isRequestInProcessing, setIsRequestInProcessing] = useState(false)

    //sign in 
    const [signInUsername, setSignInUsername] = useState('')
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

        setIsRequestInProcessing(true)

        if (isSignInInsteadOfSignUp === true) {
            signIn()
        } else {
            signUp()
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

            console.log("signing in")

            await Auth.signIn(signInUsername, signInPassword);

            //signin succeded
            signInComplete()
            successNotification("Sign In succeeded")
        } catch (error) {
            errorNotification(error.message)
            console.log('error signing in', error);
        } finally {
            setIsRequestInProcessing(false)
        }
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








    return (
        <div>

            <Modal
                open={isOpen}
                onRequestClose={close}
                modalHeading={isSignInInsteadOfSignUp ? "Sign In" : "Sign Up"}
                modalLabel="User action"
                primaryButtonText={isSignInInsteadOfSignUp ? "Sign In" : "Sign Up"}
                primaryButtonDisabled={isRequestInProcessing}
                secondaryButtonText="Cancel"
                onRequestSubmit={startAuthentication}>


                {isSignInInsteadOfSignUp &&
                    <>
                        <p> Don't have an account? <a onClick={toggle} >Create one</a></p>
                        <SignInForm
                            onUsernameChange={(id) => setSignInUsername(id)}
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
        </div>
    )
}



export default AuthenticationModal;
