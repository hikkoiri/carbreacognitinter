import React from 'react';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {

  const { t } = useTranslation();

  return (
    <>
      <h1>{t("landingpage.title")}</h1>
    </>);
};

export default LandingPage;
