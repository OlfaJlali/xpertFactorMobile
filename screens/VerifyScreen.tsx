import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLOR_BLACK } from '../styles/globalStyles';

const VerifyScreen: React.FC = () => {
  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyScreen'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();

  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const isCodeComplete = code.every((digit) => digit !== '');

  // Animation refs
  const bounceAnim = useRef(code.map(() => new Animated.Value(1))).current; // For each input
  const buttonSlideAnim = useRef(new Animated.Value(100)).current; // Slide-in for the button

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
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
    if (newCode.every((digit) => digit !== '')) {
      Animated.timing(buttonSlideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleVerifyCode = () => {
    console.log('Verification code entered:', code.join(''));
    navigation.navigate('ChangePasswordScreen');
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
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (
                    nativeEvent.key === 'Backspace' &&
                    index > 0 &&
                    code[index] === ''
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
              opacity: isCodeComplete ? 1 : 0.5,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.buttonInner,
              { backgroundColor: isCodeComplete ? '#3E77BC' : '#A0B9D9' },
            ]}
            onPress={handleVerifyCode}
            disabled={!isCodeComplete}
          >
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    borderColor: COLOR_BLACK,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 10,
  },
  button: {
    height: 50,
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
