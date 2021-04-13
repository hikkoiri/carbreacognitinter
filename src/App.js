import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import GenericHeader from './components/GenericHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import MyProfilePage from './content/MyProfilePage';

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



class App extends Component {
  render() {
    return (
      <>
        <GenericHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/myprofile" component={MyProfilePage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
