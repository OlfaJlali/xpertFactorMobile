import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { RootStackParamList } from '../../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/TextInput';
import { isValidEmail } from '../../utils/validation';
import { Button } from '../../components/Button';
import { DIContainer } from '../../di/container';
const { width } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState('');
  const [error, setError] = useState<string | null>(null); // To store error messages

  // Animated values for the container
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity animation

  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyScreen'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();

  useEffect(() => {
    setButtonEnabled(isValidEmail(email));
  }, [email]);

  useEffect(() => {
    // Animate the container when the screen loads
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  const handleRecoverPassword = async () => {
    setLoading(true);
    try {
      await DIContainer.recoverPasswordUseCase.execute(email);
      navigation.navigate('VerifyScreen',{email: email});
    } catch (err: any) {
      setError('could not find email adress');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust behavior for iOS or Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Offset for iOS devices
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.innerContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Please enter your email to recover your password.
          </Text>
          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {error && <Text style={styles.errorText}>{error}</Text>} 

        </Animated.View>
      <Button title='Recover Password' disabled={!buttonEnabled} onPress={handleRecoverPassword} loading={loading} />
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: 'center', // Centers content horizontally
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  button: {
    width: width * 0.9,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
