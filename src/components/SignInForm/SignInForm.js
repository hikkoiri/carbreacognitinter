import React from 'react';
import {
  Form,
  TextInput
} from 'carbon-components-react'



const SignInForm = ({onUsernameChange, onPasswordChange, startPasswordReset}) => {
  
  const UsernameTextInputProps = {
    id: 'username',
    labelText: 'Username',
  };
  
  const PasswordProps = {
    id: 'password',
    labelText: 'Password',
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
      <br/>
      Forgot your password? <span onClick={startPasswordReset} className="pointer" > Click here</span>
  </Form>
  )};
export default SignInForm;
