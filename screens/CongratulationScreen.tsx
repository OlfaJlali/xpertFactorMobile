import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { Button } from '../components/Button';
import { useShow } from '../context/ShowContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useTab } from '../context/TabContext';
import ConfettiCannon from 'react-native-confetti-cannon';

const { height } = Dimensions.get('window');

type CongratulationsScreenProps = {
  onPress: () => void;
  text: string;
};

const CongratulationsScreen: React.FC<CongratulationsScreenProps> = ({ onPress, text }) => {
  const { setShow } = useShow();

  const characterAnim = useRef(new Animated.Value(0)).current;
  const bottomSectionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setShow(false);
    Animated.timing(characterAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(bottomSectionAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

  }, [characterAnim, bottomSectionAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.characterWrapper,
          {
            transform: [
              {
                translateY: characterAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Image source={require('../assets/men2.png')} style={styles.characterImage} />
      </Animated.View>

      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: height * 0.2 }}
        fallSpeed={3000}
        explosionSpeed={500}
        fadeOut={true}
        autoStart={true}
      />

      <Animated.View
        style={[
          styles.bottomSection,
          {
            opacity: bottomSectionAnim,
            transform: [
              {
                translateY: bottomSectionAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>{text}</Text>
        <Button title="Done" onPress={onPress} disabled={false} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3249', 
  },
  characterWrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.1, 
    left: 0,
    right: 0,
    zIndex: 1, 
  },
  characterImage: {
    height: height / 2,
    resizeMode: 'contain',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.5, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    color: '#282534',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    maxWidth: '70%',
    lineHeight: 23,
  },
  button: {
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CongratulationsScreen;
