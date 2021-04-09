import React from 'react';
import {
  Form,
  TextInput,
  ModalWrapper
} from 'carbon-components-react'
import { Link } from 'react-router-dom';

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

const SignUpPage = () => (
  <div>
    <ModalWrapper
      modalHeading="Sign Up"
      modalLabel="User action"
      primaryButtonText="Sign Up"
      secondaryButtonText="Cancel"
    >
      <div style={{ marginBottom: '2rem' }}>
        <p> Already have an account? <Link to="/signin">Try signing in</Link></p>
      </div>

      <Form>

        <div style={{ marginBottom: '2rem' }}>
          <TextInput required {...UsernameTextInputProps} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <TextInput required {...EmailTextInputProps} />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <TextInput
            type="password"
            required
            {...PasswordProps}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <TextInput
            type="password"
            required
            {...RepeatPasswordProps}
          />
        </div>
      </Form>
    </ModalWrapper>
  </div>
);

export default SignUpPage;
