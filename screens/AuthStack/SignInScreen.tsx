import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, Keyboard, SafeAreaView, Text, View } from 'react-native';
// import { useSignIn } from '../hooks/useSignIn';
import { Input } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { TextLink } from '../../components/TextLink';
import { signInScreenStyles } from '../../styles/signInScreenStyles';
import { globalStyles } from '../../styles/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignInUseCase } from '../../domain/usecases/SignInUseCase';
import { useSignInViewModel } from '../../viewmodels/SignInViewModel';
import { useAuth } from '../../context/AuthContext';
import { LocalStorageService } from '../../data/storage/LocalStorageService';
import { User } from '../../domain/entities/User';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
interface SignInScreenProps {
  signInUseCase: SignInUseCase;
}
const storageService = new LocalStorageService();
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;
export const SignInScreen: React.FC<SignInScreenProps> = ({ signInUseCase }) => {
  const { signIn, loading, error } = useSignInViewModel(signInUseCase);
  const {setIsAuthenticated} = useAuth()
  const { width } = Dimensions.get('window');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<SignInScreenNavigationProp>();
    const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignIn = async () => {
    const user: User | null = await signIn(identifier, password);
    if (user) {
      if(user.firstlogin === true){
        console.log('first login:', user);
        navigation.navigate('ChangeFirstPassword',{email: user.email})

      }else {
        console.log('Signed in user:', user);
        await storageService.save<User>('user', user); // Save user data after login
        setIsAuthenticated(true);  
      }
    }
  };

  // Animated values for the components
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current; // Start slightly below the screen

  useEffect(() => {
    // Animate components on initial render
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, // Move to original position
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="never">
        <Text style={signInScreenStyles.title}>Sign into your account</Text>
        <Animated.View
          style={[
            signInScreenStyles.centeredContainer,
            { opacity, transform: [{ translateY }] }, // Apply animation
          ]}
        >

        <Image source={require('../../assets/login.png')} style={{ height: '50%', width: width }} />
       
          <Input placeholder="identifier" value={identifier} onChangeText={setIdentifier} keyboardType='default' />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <Button  title="Sign In" onPress={handleSignIn} disabled={!identifier.trim() || !password.trim()} loading={loading}  />
          <Text>Have you forgotten your password?</Text>
          <TextLink text="Click here to recover it" onPress={handleForgotPassword} />
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignInScreen;
