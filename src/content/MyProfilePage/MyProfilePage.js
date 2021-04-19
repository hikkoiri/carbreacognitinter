import React from 'react';
import {
  OrderedList,
  ListItem,
} from 'carbon-components-react';
import LogoutButton from '../../components/LogoutButton';
import { useTranslation } from 'react-i18next';

const MyProfilePage = ({ successNotification, currentAuthenticatedUser }) => {

  const { t } = useTranslation();

  return (
    <>
      <h1>{t("myprofilepage.title")}</h1>
      <br />
      <OrderedList>
        <ListItem>
        {t("myprofilepage.username")} {currentAuthenticatedUser ? currentAuthenticatedUser.username : ""}
        </ListItem>
        <ListItem>
        {t("myprofilepage.email_address")} {currentAuthenticatedUser ? currentAuthenticatedUser.attributes.email : ""}
        </ListItem>
        <ListItem>
        {t("myprofilepage.email_verified")} {currentAuthenticatedUser ? currentAuthenticatedUser.attributes.email_verified.toString() : ""}
        </ListItem>
      </OrderedList>
      <br />
      <LogoutButton successNotification={(msg) => successNotification(msg)} />

    </>
  );

}

export default MyProfilePage;
