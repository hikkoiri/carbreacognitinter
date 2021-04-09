import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import GenericHeader from './components/GenericHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import SignUpPage from './content/SignUpPage';
import SignInPage from './content/SignInPage';
import UserPage from './content/UserPage';

class App extends Component {
  render() {
    return (
      <>
        <GenericHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/user" component={UserPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
