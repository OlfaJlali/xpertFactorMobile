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
  ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/TextInput';
import { DIContainer } from '../di/container';
import { Button } from '../components/Button';

const { width } = Dimensions.get('window');
type ChangeFirstPasswordProps = {
  route : any
}
const ChangeFirstPassword: React.FC<ChangeFirstPasswordProps> = ({ route }) => {
  const {email} = route.params;
  console.log(email)
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animated values for the container
  const fadeAnim = useRef(new Animated.Value(0)).current;

  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyScreen'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();

  useEffect(() => {
    // Password validation logic
    if (password.length === 0) {
      setErrorMessage('');
      setButtonEnabled(false);
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setButtonEnabled(false);
    } else if (!/\d/.test(password)) {
      setErrorMessage('Password must contain at least one number.');
      setButtonEnabled(false);
    } else {
      setErrorMessage('');
      setButtonEnabled(true);
    }
  }, [password]);

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
    if (!buttonEnabled) return;
    setLoading(true);
    try {
      await DIContainer.firstSignInUseCase.execute(email,password);
      navigation.navigate('SignIn');
    } catch (err: any) {
      setErrorMessage('couldnt change password');
    } finally {
      setLoading(false);
    }

  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
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
          <Text style={styles.title}>Create new password</Text>
          <Text style={styles.subtitle}>
            Please enter a new password.
          </Text>
          <Text style={styles.label}>Password</Text>
          <Input
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            secureTextEntry
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
        </Animated.View>
        <Button title='Create new password' onPress={handleRecoverPassword} loading={loading} disabled={!buttonEnabled} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: 'center',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-start',
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

export default ChangeFirstPassword;
