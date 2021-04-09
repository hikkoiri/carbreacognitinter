import React, {
    useState,
} from 'react';
import {
    Modal,
} from 'carbon-components-react';
import SignInForm from '../SignInForm';
import SignUpForm from '../SignUpForm';


const AuthenticationModal = ({ isOpen, close }) => {

    const [isSignInInsteadOfSignUp, setIsSignInInsteadOfSignUp] = useState(true)

    const toggle = () => {
        if (isSignInInsteadOfSignUp === true) {
            setIsSignInInsteadOfSignUp(false)
        } else {
            setIsSignInInsteadOfSignUp(true)
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
                secondaryButtonText="Cancel">


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
