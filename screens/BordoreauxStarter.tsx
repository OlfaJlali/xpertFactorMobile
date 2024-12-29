import React, { useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useShow } from '../context/ShowContext';
import { useFocusEffect } from '@react-navigation/native';

type BordoreauxStarterProps = {
  title: string;
  descriptions?: string[];
  buttonText?: string;
  buttonAction: () => void;
};

const BordoreauxStarter: React.FC<BordoreauxStarterProps> = ({
  title ,
  descriptions = [
    'Choose the desired amount, number of documents, date, and year.',
    "Set every document's info and scan the document.",
  ],
  buttonText = 'Got it',
  buttonAction
}) => {
  const imageScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Trigger animations
    imageScale.value = withTiming(1, { duration: 1000 });
    textOpacity.value = withTiming(1, { duration: 1500 });
  }, []);
  const { setShow } = useShow();

  useFocusEffect(
    useCallback(() => {
      setShow(false);
    }, [setShow])
  );

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Animated Image */}
      <Animated.View style={[styles.illustrationContainer, animatedImageStyle]}>
        <Image source={require('../assets/men3.png')} style={styles.illustration} />
      </Animated.View>

      {/* Animated Title */}
      <Animated.Text style={[styles.title, animatedTextStyle]}>{title}</Animated.Text>

      {/* Descriptions */}
      {descriptions.map((description, index) => (
  <View key={index} style={styles.item}>
    <Text style={[styles.description, styles.bullet]}>
      • {description} {/* Bullet point with additional styling */}
    </Text>
  </View>
))}
      {/* Button */}
      <Button title={buttonText} onPress={buttonAction} disabled={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  bullet: {
    marginRight: 8, // Add spacing between the bullet and text
    fontSize: 18, // Customize bullet size
    color: '#666', // Customize bullet color
  },
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
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
});

export default BordoreauxStarter;
