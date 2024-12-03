import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const useScrollHandler = ( setCurrentIndex: (index: number) => void) => {
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };


  return { scrollX, onScrollHandler, onMomentumScrollEnd };
};
