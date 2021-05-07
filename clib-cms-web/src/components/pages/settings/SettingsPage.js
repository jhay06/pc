import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import usePasswordStandard from '../../../hooks/usePasswordStandard';
import FlashMessages from '../../../lib/utils/FlashMessages';
import PasswordInput from '../../PasswordInput';
import LabelTitle from '../customers/LabelTitle';
import './SettingsPage.css';
import { useMutation } from '@apollo/react-hooks';
import PASSWORD from '../../../api/mutations/Password';

function SettingsPage() {
  const [passwordForm, setPasswordForm] = useState({
    oldPass: '',
    newPass: '',
    confirmNewPass: '',
  });
  const { checkErrors, errors } = usePasswordStandard(passwordForm.newPass);
  const [updatePassword] = useMutation(PASSWORD.UPDATE_PASSWORD);

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [id]: value }));
  };

  const changePassword = async () => {
    if (!checkErrors(passwordForm)) {
      try {
        const { oldPass, newPass, confirmNewPass } = passwordForm;
        const payload = {
          oldPassword: oldPass,
          newPassword: newPass,
          passwordConfirmation: confirmNewPass,
        };
        const res = await updatePassword({
          variables: payload,
        });
        const { user, errors } = res.data.updatePassword;

        if (user) {
          FlashMessages.success('Password changed!');
          setTimeout(() => {
            window.location.replace('/customers');
          }, 2000);
        } else {
          errors.forEach((err) => {
            FlashMessages.errors(err);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="page-header">
        <LabelTitle label="Settings" />
      </div>

      <div className="page-section">
        <h4 className="section-title">Change Password</h4>
        <div className="password-form">
          <PasswordInput
            label="Old Password"
            onChange={handleFieldChange}
            id="oldPass"
            value={passwordForm.old}
          />
          <div className="password-form-row">
            <PasswordInput
              label="New Password"
              id="newPass"
              onChange={handleFieldChange}
              value={passwordForm.new}
              errors={errors.length > 0 ? errors : null}
            />
            <PasswordInput
              label="Confirm New Password"
              id="confirmNewPass"
              onChange={handleFieldChange}
              value={passwordForm.confirmNew}
            />
          </div>
          <div className="button-container">
            <Button block variant="primary" onClick={changePassword}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <div className="section-divider">
        <hr />
      </div>
    </div>
  );
}

export default SettingsPage;
