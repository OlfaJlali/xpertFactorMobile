import { Dispatch, SetStateAction, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import { useAuth } from '../context/AuthContext';

export const useSignIn = () => {
  const { setIsAuthed } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();
  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    setIsAuthed(true);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignIn,
    handleForgotPassword,
  };
};
