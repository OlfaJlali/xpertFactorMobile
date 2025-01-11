import { useState } from 'react';
import { isPasswordValid } from '../utils/validation';

export const usePasswordValidation = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRetype, setNewPasswordRetype] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordRetypeTouched, setNewPasswordRetypeTouched] = useState(false);

  const newPasswordErrorMessage =
  newPasswordTouched && !isPasswordValid(newPassword)
    ? newPassword.length < 6
      ? 'Password must be at least 6 characters long.'
      : 'Password must contain at least one number.'
    : newPassword === oldPassword
    ? 'New password cannot be the same as the old password.'
    : '';
  const newPasswordRetypeErrorMessage =
    newPasswordRetypeTouched && newPassword !== newPasswordRetype
      ? 'Passwords do not match.'
      : '';

  const isFormValid =
    isPasswordValid(newPassword) && newPassword === newPasswordRetype;

  return {
    oldPassword,
    newPassword,
    newPasswordRetype,
    newPasswordErrorMessage,
    newPasswordRetypeErrorMessage,
    isFormValid,
    setOldPassword,
    setNewPassword,
    setNewPasswordRetype,
    setNewPasswordTouched,
    setNewPasswordRetypeTouched,
  };
};
