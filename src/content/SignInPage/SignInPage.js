import React from 'react';
import {
  Form,
  TextInput,
  ModalWrapper
} from 'carbon-components-react'
import { Link } from 'react-router-dom';

const UserIdentifierTextInputProps = {
  id: 'useridentifier',
  labelText: 'Username or Email Address',

};

const PasswordProps = {
  id: 'password',
  labelText: 'Password',
};

const SignInPage = () => (
  <div>
    <ModalWrapper
      modalHeading="Sign In"
      modalLabel="User action"
      primaryButtonText="Sign In"
      secondaryButtonText="Cancel"
    >
      <div style={{ marginBottom: '2rem' }}>
        <p> Don't have an account? <Link to="/signup">Create one</Link></p>
      </div>
      <Form>
        <div style={{ marginBottom: '2rem' }}>
          <TextInput required {...UserIdentifierTextInputProps} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <TextInput
            type="password"
            required
            {...PasswordProps}
          />
        </div>
      </Form>
    </ModalWrapper>
  </div>
);
export default SignInPage;
