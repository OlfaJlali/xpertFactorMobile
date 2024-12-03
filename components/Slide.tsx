import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { styles } from '../styles/OnboardingStyle';
import { SlideType } from '../types/onBoardingTypes';

const Slide = ({ item }: { item: SlideType }) => {
  const {width} = Dimensions.get('window');

  return (
    <View style={{ alignItems: 'center'}}>
      <Image source={item.image} style={{ height: '75%', width: width }} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

export default Slide;
