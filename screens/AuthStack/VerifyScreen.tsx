import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { RootStackParamList } from '../../types/navigationTypes';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLOR_BLACK } from '../../styles/globalStyles';
import { DIContainer } from '../../di/container';
import { Button } from '../../components/Button';

type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyScreen'>;
type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'VerifyScreen'>;

interface VerifyScreenProps {
  route?: any;
}

const VerifyScreen: React.FC<VerifyScreenProps> = ({ route }) => {
  const { email } = route.params;
  console.log(email)
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const [loading,setLoading]=useState(false)
  const [error, setError] = useState<string | null>(null);

  const [code, setCode] = useState<(number | null)[]>([null, null, null, null]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const isCodeComplete = code.every((digit) => digit !== null);

  // Animation refs
  const bounceAnim = useRef(code.map(() => new Animated.Value(1))).current; // For each input
  const buttonSlideAnim = useRef(new Animated.Value(100)).current; // Slide-in for the button
  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value ? parseInt(value, 10) : null;
    setCode(newCode);

    // Bounce animation on focus
    Animated.sequence([
      Animated.timing(bounceAnim[index], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Slide in button animation when code is complete
    if (newCode.every((digit) => digit !== null)) {
      Animated.timing(buttonSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleVerifyCode = async () => {
    const otp = parseInt(code.join(''), 10);
    console.log('Verification code entered:', otp);
    setLoading(true);
    try {
      await DIContainer.verifyOtpUseCase.execute(email,otp);
      navigation.navigate('ChangePasswordScreen',{email: email});

    } catch (err: any) {
      setError('please enter a correct OTP code');
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Verify Account</Text>
        <Text style={styles.subtitle}></Text>

      </View>
      
      <View style={styles.middleContainer}>

        <View style={styles.codeContainer}>

          {code.map((digit, index) => (
            <Animated.View
              key={index}
              style={{ transform: [{ scale: bounceAnim[index] }] }} // Bounce effect
            >
              <TextInput
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[styles.codeInput,{borderColor:  error ? 'red' :  COLOR_BLACK}]}
                keyboardType="numeric"
                maxLength={1}
                value={digit !== null ? digit.toString() : ''}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === 'Backspace' &&
                    index > 0 &&
                    (code[index] === null || code[index] === 0)
                  ) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            </Animated.View>
          ))}
        </View>
        <Animated.View
          style={[
            styles.button,
            {
              transform: [{ translateY: buttonSlideAnim }],
            },
          ]}
        >
                {error && <Text style={styles.errorText}>{error}</Text>} 
          <Button title='Verify Code' disabled={!isCodeComplete} loading={loading} onPress={handleVerifyCode} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'center',
    paddingBottom: 20
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 10,
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  buttonInner: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerifyScreen;
