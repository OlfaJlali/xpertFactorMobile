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
import { ProrogationStackNavigator } from './ProrogationStackNavigator';
import { BuyerStackNavigator } from './BuyerStackNavigator';
import StatisticsScreen from '../screens/StatisticsScreen';
import Intercom, { Visibility } from '@intercom/intercom-react-native';

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
    { icon: 'FileClock', label: 'Limit', component: LimitStackNavigator },
    { icon: 'UserPlus', label: 'Add buyer', component: BuyerStackNavigator },
    { icon: 'CalendarClock', label: 'Prorogation', component: ProrogationStackNavigator },
    { icon: 'ChartPie', label: 'Stats', component: StatisticsScreen },



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
  useEffect(() => {
    if(selectedIndex == 0){
      Intercom.loginUnidentifiedUser();
      Intercom.setLauncherVisibility(Visibility.VISIBLE);
      if(show){
        Intercom.setBottomPadding(80)
      }else {
        Intercom.setBottomPadding(200)

      }


    } else {
      Intercom.setLauncherVisibility(Visibility.GONE);

    }
  }, [selectedIndex , show]);

  return (
    <View style={{ flex: 1 }}>
      {renderingCurrent ? <CurrentScreen /> : <AdditionalScreensRenderer />}
      {show && (
        <Animated.View style={{   
          position: 'absolute',      
          bottom: 0,
          left: 0,
          right: 0,
   transform: [{ translateY: slideAnim }] }}>
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
