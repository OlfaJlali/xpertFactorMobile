import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input } from '../../../components/TextInput';
import { Button } from '../../../components/Button';
import { usePasswordValidation } from '../../../hooks/usePasswordValidation';
import { useChangePassword } from '../../../hooks/useChangePassword';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/navigationTypes';

const ResetPasswordForm: React.FC = () => {
  const {
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
  } = usePasswordValidation();

  const { loading, errorMessage, isError, changePassword } = useChangePassword();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();

  const handleSave = async () => {
        await changePassword(oldPassword, newPassword);
        navigation.navigate('Profile');
    }
  



  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter old password"
        onChangeText={setOldPassword}
        secureTextEntry
        value={oldPassword}
      />
      <Input
        placeholder="Enter new password"
        onChangeText={setNewPassword}
        onFocus={() => setNewPasswordTouched(true)}
        secureTextEntry
        value={newPassword}
      />
      {newPasswordErrorMessage && newPassword.length > 0 ? (
        <Text style={styles.errorText}>{newPasswordErrorMessage}</Text>
      ) : null}
      <Input
        placeholder="Retype new password"
        onChangeText={setNewPasswordRetype}
        onFocus={() => setNewPasswordRetypeTouched(true)}
        secureTextEntry
        value={newPasswordRetype}
      />
      {newPasswordRetypeErrorMessage ? (
        <Text style={styles.errorText}>{newPasswordRetypeErrorMessage}</Text>
      ) : null}
         {isError ? (
        <Text style={[styles.errorText, {alignSelf:'center'}]}>{errorMessage}</Text>
      ) : null}
      <Button title="Save" onPress={handleSave} disabled={!isFormValid} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
      errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default ResetPasswordForm;
