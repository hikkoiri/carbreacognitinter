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



const GenericHeader = withRouter(({ history }) => {

  const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] = useState(false)


  async function userButtonOnClick(e, history) {
    // check is user is logged in
    try {
      const userSession = await Auth.currentAuthenticatedUser();
      console.log(userSession)
      console.log("already logged in. redirecting to user page")
      history.push("/user");
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

            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="" onClick={(e) => userButtonOnClick(e, history)}>
                <UserAvatar20 />
              </HeaderGlobalAction >
            </HeaderGlobalBar>
          </Header>
          <AuthenticationModal
            isOpen={isAuthenticationModalOpen}
            close={closeModal}
          />
        </>
      )
      }
    />
  )
});





export default GenericHeader;
