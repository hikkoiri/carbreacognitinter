import React from 'react';
import {
    ProgressIndicator,
    ProgressStep,
    Form,
    TextInput,
    InlineNotification,
} from 'carbon-components-react';
import { useTranslation } from 'react-i18next';


const ResetPasswordForm = ({ onUsernameChange,
    onVerificationCodeChange,
    onPasswordChange,
    onRepeatPasswordChange,
    resetPasswordProgress }) => {

    const { t } = useTranslation();


    const UsernameTextInputProps = {
        id: 'username',
        labelText: t("resetpasswordform.inputlabel.username"),
        placeholder: 'john_doe',
    };

    const VerificationCodeTextInputProps = {
        id: 'verification_code',
        labelText: t("resetpasswordform.inputlabel.verificationcode"),
        placeholder: 'XXXXXX',
    };

    const PasswordProps = {
        id: 'password',
        labelText: t("resetpasswordform.inputlabel.password"),
    };

    const RepeatPasswordProps = {
        id: 'repeat_password',
        labelText: t("resetpasswordform.inputlabel.repeatpassword"),
    };



    return (
        <>

            <ProgressIndicator
                currentIndex={resetPasswordProgress}
                spaceEqually={true}
            >
                <ProgressStep
                    label={t("resetpasswordform.progressindicator.step1")}
                    description={t("resetpasswordform.progressindicator.step1")}
                />
                <ProgressStep
                    label={t("resetpasswordform.progressindicator.step2")}
                    description={t("resetpasswordform.progressindicator.step2")}
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
                            subtitle={t("resetpasswordform.notification.subtitle")}
                            title={t("resetpasswordform.notification.title")}
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
