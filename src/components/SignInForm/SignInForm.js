import React from 'react';
import {
  Form,
  TextInput
} from 'carbon-components-react'

const UserIdentifierTextInputProps = {
  id: 'useridentifier',
  labelText: 'Username or Email Address',

};

const PasswordProps = {
  id: 'password',
  labelText: 'Password',
};

const SignInForm = () => (
  <Form style={{ marginTop: '2rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <TextInput required {...UserIdentifierTextInputProps} />
    </div>

      <TextInput
        type="password"
        required
        {...PasswordProps}
      />
  </Form>
);
export default SignInForm;
