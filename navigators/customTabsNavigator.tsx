import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import { TabsNavigator } from '../components/BottomSheet'; 
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BordereauxStackNavigator } from './BordoreauxStackNavigator';
import { TabItem } from '../types/BottomSheetTypes';
import { useShow } from '../context/ShowContext';
import { useTab } from '../context/TabContext';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { RequestFinancementStackNavigator } from './RequestFinancementStackNavigator';
import { LitigeStackNavigator } from './LitigeStackNavigator';
import { useAdditionalTab } from '../context/AdditionalTabContext';
import { LimitStackNavigator } from './LimitStackNavigator';

const CustomTabsNavigator: React.FC = () => {
  const { selectedIndex, setSelectedIndex } = useTab();
  const {selectedIndexBis , setSelectedIndexBis} = useAdditionalTab()
  
  const { show } = useShow();  

  const screens: TabItem[] = [
    { icon: 'LayoutDashboard', label: 'Dashboard', component: DashboardScreen },
    { icon: 'User', label: 'Profile', component: ProfileStackNavigator },
    { icon: 'Plus', label: '', component: ProfileScreen}, 
    { icon: 'File', label: 'Bordereaux', component: BordereauxStackNavigator}, 
    { icon: 'Sailboat', label: 'Sailboat', component: RequestFinancementStackNavigator }, 
    
  ];
  const AdditionalScreens:  TabItem[] = [
    { icon: 'Database', label: 'Litige', component: LitigeStackNavigator },
    { icon: 'Minus', label: 'Limit', component: LimitStackNavigator },

  ];
  const [renderingCurrent , setRenderingCurrent] = useState(true)
  const CurrentScreen = screens[selectedIndex].component;
  const AdditionalScreensRenderer = AdditionalScreens[selectedIndexBis].component;
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
      {renderingCurrent ?  <CurrentScreen /> :  <AdditionalScreensRenderer />}
      {show && (
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <TabsNavigator
            data={screens}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            AdditionalSelectedIndex={selectedIndexBis}
            onAdditionalChange={setSelectedIndexBis}
            additionalScreens={AdditionalScreens} // Navigate to a new View
            setRenderingCurrent={setRenderingCurrent}
            renderingCurrent={renderingCurrent}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CustomTabsNavigator;
