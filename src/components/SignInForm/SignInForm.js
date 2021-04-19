import React from 'react';
import {
  Form,
  TextInput
} from 'carbon-components-react'
import { useTranslation } from 'react-i18next';



const SignInForm = ({onUsernameChange, onPasswordChange}) => {
  
  const { t } = useTranslation();


  const UsernameTextInputProps = {
    id: 'username',
    labelText: t("signinform.inputlabel.username"),
  };
  
  const PasswordProps = {
    id: 'password',
    labelText: t("signinform.inputlabel.password"),
  };
  
  return (<Form style={{ marginTop: '2rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <TextInput 
      required 
      onChange={(e) => onUsernameChange(e.target.value)} 
      {...UsernameTextInputProps} />
    </div>

      <TextInput
        type="password"
        required
        onChange={(e) => onPasswordChange(e.target.value)} 
        {...PasswordProps}
      />
  </Form>
  )};
export default SignInForm;
