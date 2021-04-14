import React, {
  useState
} from 'react';
import './app.scss';
import { Content } from 'carbon-components-react';
import GenericHeader from './components/GenericHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import MyProfilePage from './content/MyProfilePage';
import GenericNotification from './components/GenericNotification';

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

  // notification
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationTimeStamp, setNotificationTimeStamp] = useState("")
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notificationKind, setNotificationKind] = useState("info")
  const [notificationTitle, setNotificationTitle] = useState("")

  const showErrorNotification = (message) => {
    setNotificationMessage(message)
    setNotificationTitle("Error")
    setNotificationKind("error")
    displayNotification()
  }

  const showSuccessNotification = (message) => {
    setNotificationMessage(message)
    setNotificationTitle("Success")
    setNotificationKind("success")
    displayNotification()
  }

  const displayNotification = () => {
    setNotificationTimeStamp(new Date().toLocaleString())
    setIsNotificationOpen(true)

    setTimeout(function () {
      setIsNotificationOpen(false)
    }, 5000);
  }


  return (
    <>
      <GenericHeader
        successNotification={(msg) => showSuccessNotification(msg)}
        errorNotification={(msg) => showErrorNotification(msg)}
      />
      <GenericNotification
        isNotificationOpen={isNotificationOpen}
        notificationKind={notificationKind}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
        notificationTimeStamp={notificationTimeStamp}
      />
      <Content>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/myprofile"
            render={() => <MyProfilePage successNotification={(msg) => showSuccessNotification(msg)} />}
          />
        </Switch>
      </Content>
    </>
  );
}


export default App;
