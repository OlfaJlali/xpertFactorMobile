import React from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import Slide from '../components/Slide';
import Footer from '../components/Footer';
import { useOnboarding } from '../hooks/useOnboarding';
import { slides } from '../data/Slides';
const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const { currentSlideIndex, ref, updateCurrentSlideIndex, goToNextSlide, skip } = useOnboarding(slides);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff' }}>
      <StatusBar backgroundColor='#fff' />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        // contentContainerStyle={{ height: '75%'   , alignSelf:'center'}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer
        currentSlideIndex={currentSlideIndex}
        slides={slides}
        skip={skip}
        goToNextSlide={goToNextSlide}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
