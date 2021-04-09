import React, {
  useState,
} from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems
} from 'carbon-components-react';
import {
  UserAvatar20,
} from '@carbon/icons-react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import AuthenticationModal from '../AuthenticationModal';


const GenericHeader = withRouter(({ history }) => {

  const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] = useState(false)

  const isLoggedIn = false;

  const userButtonOnClick = (e, history) => {

    if (isLoggedIn) {
      console.log("already logged in. redirecting to user page")
      history.push("/user");

    } else {
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
            <HeaderNavigation aria-label="">
              <HeaderMenuItem element={Link} to="/signup">
                Sign up
          </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/signin">
                Sign in
          </HeaderMenuItem>
            </HeaderNavigation>
            <SideNav aria-label=""
              expanded={isSideNavExpanded}
              isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>
                  <HeaderMenuItem element={Link} to="/signup">
                    Sign up
              </HeaderMenuItem>
                  <HeaderMenuItem element={Link} to="/signin">
                    Sign in
              </HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="" onClick={(e) => userButtonOnClick(e, history)}>
                <UserAvatar20  />
              </HeaderGlobalAction >
            </HeaderGlobalBar>
          </Header>
          <AuthenticationModal isOpen={isAuthenticationModalOpen} close={closeModal} />
        </>

      )
      }
    />
  )
});





export default GenericHeader;
