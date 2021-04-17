import React from 'react';
import {
    ProgressIndicator,
    ProgressStep,
    Form,
    TextInput,
    InlineNotification,
} from 'carbon-components-react';


const ResetPasswordForm = ({ onUsernameChange,
    onVerificationCodeChange,
    onPasswordChange,
    onRepeatPasswordChange,
    resetPasswordProgress }) => {

    const UsernameTextInputProps = {
        id: 'username',
        labelText: 'Username',
        placeholder: 'john_doe',
    };

    const VerificationCodeTextInputProps = {
        id: 'verification_code',
        labelText: 'Verification Code',
        placeholder: 'XXXXXX',
    };

    const PasswordProps = {
        id: 'password',
        labelText: 'New Password',
    };

    const RepeatPasswordProps = {
        id: 'repeat_password',
        labelText: 'Repeat New Password',
    };



    return (
        <>

            <ProgressIndicator
                currentIndex={resetPasswordProgress}
                spaceEqually={true}
            >
                <ProgressStep
                    label='Step 1: Send reset code via email'
                    description="Step 1: Send reset code via email"
                />
                <ProgressStep
                    label="Step 2: Reset password"
                    description="Step 2: Reset password"
                />

            </ProgressIndicator>

            <Form style={{ marginTop: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <TextInput
                        required
                        disabled={resetPasswordProgress !== 0 ? true : false}
                        onChange={(e) => onUsernameChange(e.target.value)}
                        {...UsernameTextInputProps} />
                </div>

                {resetPasswordProgress !== 0 &&
                    <>
                        <InlineNotification
                            kind="success"
                            subtitle={<span>Please check the inbox of the associated email account.</span>}
                            title="Verification Code Sent"
                            hideCloseButton={true}
                            lowContrast={true}
                        />

                        <div style={{ marginBottom: '2rem' }}>
                            <TextInput
                                required
                                onChange={(e) => onVerificationCodeChange(e.target.value)}
                                {...VerificationCodeTextInputProps} />
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
                    </>
                }
            </Form>

        </>

    )
}

export default ResetPasswordForm;
