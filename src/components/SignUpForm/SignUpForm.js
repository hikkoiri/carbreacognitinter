import React from 'react';
import {
  Form,
  TextInput,
} from 'carbon-components-react'

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

const SignUpForm = () => (

      <Form style={{ marginTop: '2rem' }}>

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

          <TextInput
            type="password"
            required
            {...RepeatPasswordProps}
          />
      </Form>

);

export default SignUpForm;
