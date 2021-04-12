import React from 'react';
import {
  Form,
  TextInput,
} from 'carbon-components-react'


const SignUpForm = ({ onUsernameChange, onEmailChange, onPasswordChange, onRepeatPasswordChange }) => {

  const UsernameTextInputProps = {
    id: 'username',
    labelText: 'Username',
    placeholder: 'john_doe',
  };

  const EmailTextInputProps = {
    id: 'email',
    labelText: 'Email Address',
    placeholder: 'john@doe.com',
  };

  const PasswordProps = {
    id: 'password',
    labelText: 'Password',
  };

  const RepeatPasswordProps = {
    id: 'repeat_password',
    labelText: 'Repeat Password',
  };


  return (
    <Form style={{ marginTop: '2rem' }}>

      <div style={{ marginBottom: '2rem' }}>
        <TextInput
          required
          onChange={(e) => onUsernameChange(e.target.value)}
          {...UsernameTextInputProps} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <TextInput
          required
          onChange={(e) => onEmailChange(e.target.value)}
          {...EmailTextInputProps} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <TextInput
          type="password"
          required
          onChange={(e) => onPasswordChange(e.target.value)}

          {...PasswordProps}
        />
      </div>

      <TextInput
        type="password"
        required
        onChange={(e) => onRepeatPasswordChange(e.target.value)}

        {...RepeatPasswordProps}
      />
    </Form>
  )
};

export default SignUpForm;
