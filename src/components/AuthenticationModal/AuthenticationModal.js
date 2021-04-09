import React, {
    useState,
} from 'react';
import {
    Modal,
} from 'carbon-components-react';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';
import { Auth } from 'aws-amplify';


const AuthenticationModal = ({ isOpen, close }) => {

    const [isSignInInsteadOfSignUp, setIsSignInInsteadOfSignUp] = useState(true)

    const toggle = () => {
        if (isSignInInsteadOfSignUp === true) {
            setIsSignInInsteadOfSignUp(false)
        } else {
            setIsSignInInsteadOfSignUp(true)
        }
    }


    async function signUp() {
        try {
            const { user } = await Auth.signUp({
                username: "user",
                password: "12345678abc!XYZ",
                attributes: {
                    email: "test@test.com" 
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error);
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
                secondaryButtonText="Cancel"
                onRequestSubmit={signUp}>

               



                {isSignInInsteadOfSignUp &&
                    <>
                        <p> Don't have an account? <a onClick={toggle} >Create one</a></p>
                        <SignInForm />
                    </>
                }

                {!isSignInInsteadOfSignUp &&
                    <>
                        <p> Already have an account? <a onClick={toggle} >Try signing in</a></p>
                       <SignUpForm/>
                    </>
                }

            </Modal>
        </div>
    )
}

export default AuthenticationModal;
