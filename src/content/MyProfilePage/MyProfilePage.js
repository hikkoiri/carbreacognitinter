import React from 'react';
import {
  OrderedList,
  ListItem,
} from 'carbon-components-react';
import LogoutButton from '../../components/LogoutButton';

const MyProfilePage = ({ successNotification, currentAuthenticatedUser }) => {


  return (
    <>
      <h1>My Profile</h1>
      <br />
      <OrderedList>
        <ListItem>
          Username: {currentAuthenticatedUser ? currentAuthenticatedUser.username : ""}
        </ListItem>
        <ListItem>
          Email Address: {currentAuthenticatedUser ? currentAuthenticatedUser.attributes.email : ""}
        </ListItem>
        <ListItem>
          Email confirmed: {currentAuthenticatedUser ? currentAuthenticatedUser.attributes.email_verified.toString() : ""}
        </ListItem>
      </OrderedList>
      <br />
      <LogoutButton successNotification={(msg) => successNotification(msg)} />

    </>
  );

}

export default MyProfilePage;
