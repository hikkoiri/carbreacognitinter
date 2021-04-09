import React from 'react';
import {
    Modal
} from 'carbon-components-react';

const AuthenticationModal = ({isOpen, close}) => {



    return (
        <div>
            <Modal
                open={isOpen}
                passiveModal
                onAbort={close}
                onRequestClose={close}
                modalHeading="You have been successfully signed out">
            </Modal>
        </div>
    )
}

export default AuthenticationModal;
