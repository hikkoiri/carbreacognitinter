import React from 'react';
import {
    ToastNotification,
} from 'carbon-components-react';


const GenericNotification = ({ isNotificationOpen, notificationKind, notificationTitle, notificationMessage, notificationTimeStamp, setIsNotificationOpen }) => {

    return (
        <ToastNotification
            style={{
                marginTop: '1rem',
                marginRight: '1rem',
                position: 'absolute',
                right: '0px',
                zIndex: '999999',
                display: isNotificationOpen ? 'flex' : 'none'
            }}
            kind={notificationKind}
            title={notificationTitle}
            caption={notificationMessage}
            subtitle={notificationTimeStamp}
            timeout={0}
            hideCloseButton={true}
        />
    )
}

export default GenericNotification;
