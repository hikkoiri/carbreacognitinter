import React, {
  useState,
} from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenuButton,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderNavigation,
  SkipToContent,
} from 'carbon-components-react';
import {
  UserAvatar20,
} from '@carbon/icons-react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import AuthenticationModal from '../AuthenticationModal';
import { Auth } from 'aws-amplify';



const GenericHeader = withRouter(({ history,
  successNotification,
  errorNotification,
  setCurrentAuthenticatedUser }) => {

  const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] = useState(false)


  async function userButtonOnClick(e, history) {
    // check is user is logged in
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentAuthenticatedUser(user)
      console.log("already logged in. redirecting to user page")
      history.push("/myprofile");
    } catch (error) {
      console.log('error signing in', error);
      console.log("not logged in yet. opening authentication modal")
      setIsAuthenticationModalOpen(true)
    }
  }

  const closeModal = () => {
    console.log("closing modal")
    setIsAuthenticationModalOpen(false)
  }

  async function authenticationSuccess() {
    closeModal()
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentAuthenticatedUser(user)
    } catch (error) {
      console.log('error signing in', error);
    }
  }


  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="">
            <SkipToContent />
            <HeaderMenuButton aria-label=""
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <HeaderName element={Link} to="/" prefix="Home of">
              CARBREACOGNITINTER
        </HeaderName>


            <HeaderNavigation aria-label="" />

            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="" onClick={(e) => userButtonOnClick(e, history)}>
                <UserAvatar20 />
              </HeaderGlobalAction >
            </HeaderGlobalBar>
          </Header>
          <AuthenticationModal
            isOpen={isAuthenticationModalOpen}
            close={closeModal}
            authenticationSuccess={authenticationSuccess}
            successNotification={(msg) => successNotification(msg)}
            errorNotification={(msg) => errorNotification(msg)}
          />
        </>
      )
      }
    />
  )
});





export default GenericHeader;
