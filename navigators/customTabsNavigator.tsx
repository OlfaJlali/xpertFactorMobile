import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { TabsNavigator } from '../components/BottomSheet'; 
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BordoreauxScreen from '../screens/BordoreauxScreen';
import { BordereauxStackNavigator } from './BordoreauxStackNavigator';
import { TabItem } from '../types/BottomSheetTypes';
import { useShow } from '../context/ShowContext';
import { useTab } from '../context/TabContext';

const CustomTabsNavigator: React.FC = () => {
  const { selectedIndex, setSelectedIndex } = useTab();
  const { show } = useShow();  

  const screens: TabItem[] = [
    { icon: 'LayoutDashboard', label: 'Dashboard', component: DashboardScreen },
    { icon: 'User', label: 'Profile', component: ProfileScreen },
    { icon: 'Plus', label: '', component: ProfileScreen}, 
    { icon: 'File', label: 'Bordereaux', component: BordereauxStackNavigator}, 
    { icon: 'Sailboat', label: 'Sailboat', component: BordoreauxScreen }, 
  ];

  const CurrentScreen = screens[selectedIndex].component;

  const slideAnim = new Animated.Value(100); 
  useEffect(() => {
    if (show) {
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 100, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [show]);

  return (
    <View style={{ flex: 1 }}>
      <CurrentScreen />
      {show && (
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <TabsNavigator
            data={screens}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CustomTabsNavigator;
