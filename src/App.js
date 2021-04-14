import React, {
  useState
} from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import GenericHeader from './components/GenericHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import MyProfilePage from './content/MyProfilePage';
import { ToastContainer, toast } from 'react-toastify';


import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {

    // REQUIRED - Amazon Cognito Region
    region: process.env.REACT_APP_COGNITO_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
  }
});




function App() {
  
  //current user
  const [currentAuthenticatedUser, setCurrentAuthenticatedUser] = useState(undefined)


  const showErrorNotification = (message) => {
    toast.error(message);
  }

  const showSuccessNotification = (message) => {
    toast.success(message);

  }

  return (
    <>
      <GenericHeader
        successNotification={(msg) => showSuccessNotification(msg)}
        errorNotification={(msg) => showErrorNotification(msg)}
        setCurrentAuthenticatedUser={(user) => setCurrentAuthenticatedUser(user)}
      />

      <ToastContainer style={{
        marginTop: '3rem'
      }} />


      <Content>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/myprofile"
            render={() => <MyProfilePage
              successNotification={(msg) => showSuccessNotification(msg)}
              currentAuthenticatedUser={currentAuthenticatedUser}
            />}
          />
        </Switch>
      </Content>
    </>
  );
}


export default App;
