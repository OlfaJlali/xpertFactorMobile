import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useShow } from '../context/ShowContext';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const BordoreauxStarter = () => {
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const { show, setShow } = useShow();

  const imageScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    setShow(false);

    // Trigger animations
    imageScale.value = withTiming(1, { duration: 1000 });
    textOpacity.value = withTiming(1, { duration: 1500 });
  }, []);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const goToBordoreaux = () => {
    navigation.navigate('Bordoreaux');
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animated.View style={[styles.illustrationContainer, animatedImageStyle]}>
        <Image source={require('../assets/men3.png')} style={styles.illustration} />
      </Animated.View>

      {/* Animated Title */}
      <Animated.Text style={[styles.title, animatedTextStyle]}>
        Start managing your bordereau and stay up to date.
      </Animated.Text>

      {/* Static Description */}
      <View style={styles.item}>
        <Text style={styles.description}>
          Choose the desired amount, number of documents, date, and year.
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.description}>Set every document's info and scan the document.</Text>
      </View>

      {/* Button */}
      <Button title={'Got it'} onPress={goToBordoreaux} disabled={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  illustration: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(62, 119, 188, 1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
});

export default BordoreauxStarter;
