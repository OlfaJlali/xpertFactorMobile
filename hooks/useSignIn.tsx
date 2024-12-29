// import { Dispatch, SetStateAction, useState } from 'react';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../types/navigationTypes';
// import { useAuth } from '../context/AuthContext';

// export const useSignIn = () => {
//   const { setIsAuthed } = useAuth();
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [step ,setStep] = useState(0)
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();
//   const handleSignIn = () => {
//     console.log('identifier:', identifier);
//     console.log('Password:', password);
//     setIsAuthed(true)
//     // if(step === 1){
//     //   setIsAuthed(true);

//     // } else {
//     //   setStep(1)
//     //   setPassword('')
//     //   navigation.navigate('ChangeFirstPassword');

//     // }
//   };

//   const handleForgotPassword = () => {
//     navigation.navigate('ForgotPassword');
//   };

//   return {
//     identifier,
//     setIdentifier,
//     password,
//     setPassword,
//     handleSignIn,
//     handleForgotPassword,
//     step,
//     setStep
//   };
// };
