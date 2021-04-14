import React from 'react';
import {
    Button,
} from 'carbon-components-react';
import {
    withRouter
} from 'react-router-dom';
import { Auth } from 'aws-amplify';


const LogoutButton = withRouter(({ history, successNotification }) => {

    async function logout() {
        try {
            await Auth.signOut();
            console.log('successfully signed out');
            successNotification("Sign Out succeeded")
            history.push("/");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <Button kind="danger" onClick={logout}>Logout</Button>
    )
})

export default LogoutButton;
