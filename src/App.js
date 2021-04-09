import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import GenericHeader from './components/GenericHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import UserPage from './content/UserPage';

import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',

        // REQUIRED - Amazon Cognito Region
        region: 'eu-central-1',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        //identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-central-1_WTG4GwWKv',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '1s3ftorv6i7eeuulte1qi8015r',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'localhost',
        // OPTIONAL - Cookie path
            path: '/',
        // OPTIONAL - Cookie expiration in days
            expires: 365,
        // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            sameSite: "strict" ,
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - customized storage object
        //storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        //clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
       // oauth: {
       //     domain: 'your_cognito_domain',
       //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
       //     redirectSignIn: 'http://localhost:3000/',
       //     redirectSignOut: 'http://localhost:3000/',
       //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        //}
    }
});

// You can get the current config object
const currentConfig = Auth.configure();

class App extends Component {
  render() {
    return (
      <>
        <GenericHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/user" component={UserPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
