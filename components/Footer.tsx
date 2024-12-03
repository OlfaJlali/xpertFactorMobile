import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/OnboardingStyle';
import { FooterProps } from '../types/onboardingTypes';

const Footer: React.FC<FooterProps> = ({ currentSlideIndex, slides, skip, goToNextSlide, navigation }) => {
  return (
    <View style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingBottom: 20 }}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && {
                backgroundColor: '#282534',
                width: 25,
              },
            ]}
          />
        ))}
      </View>

      <View style={{ marginBottom: 20 }}>
        {currentSlideIndex === slides.length - 1 ? (
          <View style={{ height: 50 }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace('SignIn')}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.btn, { borderColor: '#282534', borderWidth: 1, backgroundColor: 'transparent' }]}
              onPress={skip}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#282534' }}>SKIP</Text>
            </TouchableOpacity>
            <View style={{ width: 15 }} />
            <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide} style={styles.btn}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Footer;
