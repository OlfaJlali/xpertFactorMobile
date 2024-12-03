import { useState, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { SlideType } from '../types/onBoardingTypes';

const { width } = Dimensions.get('window');

export const useOnboarding = (slides: SlideType[]) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList<any>>(null);

  const updateCurrentSlideIndex = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return { currentSlideIndex, ref, updateCurrentSlideIndex, goToNextSlide, skip };
};
