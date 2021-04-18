import React, {
  useState
} from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Modal,
} from 'carbon-components-react';
import {
  UserAvatar20,
} from '@carbon/icons-react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthenticationModal from '../AuthenticationModal';
import { Auth } from 'aws-amplify';
import ReactCountryFlag from "react-country-flag"




const GenericHeader = withRouter(({ history,
  successNotification,
  errorNotification,
  setCurrentAuthenticatedUser }) => {

  const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] = useState(false)

  const [isAccountVerificationModalOpen, setIsAccountVerificationModalOpen] = useState(false)


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

  async function signInComplete() {
    closeModal()
    try {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentAuthenticatedUser(user)
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async function signUpComplete() {
    closeModal()
    setIsAccountVerificationModalOpen(true)
  }

  const { t, i18n } = useTranslation();

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="">
            {/*<SkipToContent />
            <HeaderMenuButton aria-label=""
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />*/}
            <HeaderName element={Link} to="/" prefix="Home of">
              CARBREACOGNITINTER
        </HeaderName>

            {/*<HeaderNavigation aria-label="" />*/}

            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="" onClick={() => i18n.changeLanguage('en')}>
                <ReactCountryFlag countryCode="US" svg />
              </HeaderGlobalAction >
              <HeaderGlobalAction aria-label="" onClick={() => i18n.changeLanguage('de')}>
                <ReactCountryFlag countryCode="DE" svg />
              </HeaderGlobalAction >
              <HeaderGlobalAction aria-label="" onClick={(e) => userButtonOnClick(e, history)}>
                <UserAvatar20 />
              </HeaderGlobalAction >
            </HeaderGlobalBar>
          </Header>
          <Modal
            open={isAccountVerificationModalOpen}
            passiveModal
            modalHeading="Congratulations. Your account get successfully created."
            onRequestClose={() => setIsAccountVerificationModalOpen(false)}
          >
            Please check your email inbox for the account verification link we sent you.
            <br />
             Without a verified email address we can't grant you access to this page.
             <br />
             Thank you for understanding.
            </Modal>
          <AuthenticationModal
            isOpen={isAuthenticationModalOpen}
            close={closeModal}
            signInComplete={signInComplete}
            signUpComplete={signUpComplete}
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
