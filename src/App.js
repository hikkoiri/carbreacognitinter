import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import GenericHeader from './components/GenericHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import UserPage from './content/UserPage';

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
