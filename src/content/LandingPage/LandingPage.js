import React from 'react';

import { useTranslation } from 'react-i18next';

const LandingPage = () => {

  const { t } = useTranslation();


  return (
    <>
      <h1>Landing Page</h1>

      <h3>{t("description.part1")}</h3>

    
    </>);
};

export default LandingPage;
