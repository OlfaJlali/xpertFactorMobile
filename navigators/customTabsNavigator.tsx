import React, { useEffect } from 'react';
import { View, Animated, Text } from 'react-native';
import { TabsNavigator } from '../components/BottomSheet';
import { useTab } from '../context/TabContext';
import { useAdditionalTab } from '../context/AdditionalTabContext';
import { useShow } from '../context/ShowContext';
import { useRendering } from '../context/RenderingContext';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { BordereauxStackNavigator } from './BordoreauxStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { RequestFinancementStackNavigator } from './RequestFinancementStackNavigator';
import { LitigeStackNavigator } from './LitigeStackNavigator';
import { LimitStackNavigator } from './LimitStackNavigator';
import { TabItem } from '../types/BottomSheetTypes';

const CustomTabsNavigator: React.FC = () => {
  const { selectedIndex, setSelectedIndex } = useTab();
  const { selectedIndexBis, setSelectedIndexBis } = useAdditionalTab();
  const { show } = useShow();
  const { renderingCurrent,setRenderingCurrent } = useRendering();

  const screens: TabItem[] = [
    { icon: 'LayoutDashboard', label: 'Dashboard', component: DashboardScreen },
    { icon: 'User', label: 'Profile', component: ProfileStackNavigator },
    { icon: 'Plus', label: '', component: ProfileScreen },
    { icon: 'File', label: 'Bordereaux', component: BordereauxStackNavigator },
    { icon: 'HandCoins', label: 'HandCoins', component: RequestFinancementStackNavigator },
  ];
  const AdditionalScreens: TabItem[] = [
    { icon: 'ListRestart', label: 'Litige', component: LitigeStackNavigator },
    { icon: 'CalendarClock', label: 'Limit', component: LimitStackNavigator },
    { icon: 'UserPlus', label: 'Add buyer', component: LimitStackNavigator },
    { icon: 'FileClock', label: 'Prorogation', component: LimitStackNavigator },


  ];

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
      {renderingCurrent ? <CurrentScreen /> : <AdditionalScreensRenderer />}
      {show && (
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <TabsNavigator
            data={screens}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
            AdditionalSelectedIndex={selectedIndexBis}
            onAdditionalChange={setSelectedIndexBis}
            additionalScreens={AdditionalScreens}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default CustomTabsNavigator;
