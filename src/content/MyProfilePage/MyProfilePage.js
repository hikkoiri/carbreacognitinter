import React, {
  useState,
  useEffect
} from 'react';
import {
  OrderedList,
  ListItem,
} from 'carbon-components-react';
import { Auth } from 'aws-amplify';
import LogoutButton from '../../components/LogoutButton';

const MyProfilePage = () => {

  const [currentAuthenticatedUser, setCurrentAuthenticatedUser] = useState(undefined)

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentAuthenticatedUser(user)
      //console.log(user)
    }
    getUser()
  }, [])




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
      <LogoutButton></LogoutButton>

    </>
  );

}

export default MyProfilePage;
