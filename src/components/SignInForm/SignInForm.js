import React from 'react';
import {
  Form,
  TextInput
} from 'carbon-components-react'



const SignInForm = ({onUserIdentifierChange, onPasswordChange}) => {
  
  const UserIdentifierTextInputProps = {
    id: 'useridentifier',
    labelText: 'Username or Email Address',
  };
  
  const PasswordProps = {
    id: 'password',
    labelText: 'Password',
  };


  
  return (<Form style={{ marginTop: '2rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <TextInput 
      required 
      onChange={(e) => onUserIdentifierChange(e.target.value)} 
      {...UserIdentifierTextInputProps} />
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
