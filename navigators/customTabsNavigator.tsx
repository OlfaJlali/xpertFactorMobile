import React, { useState } from 'react';
import { View } from 'react-native';
import { TabsNavigator,  } from '../components/BottomSheet'; 
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BordoreauxScreen from '../screens/BordoreauxScreen';
import { BordereauxStackNavigator } from './BordoreauxStackNavigator';
import { TabItem } from '../types/BottomSheetTypes';
const CustomTabsNavigator: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const screens: TabItem[] = [
    { icon: 'LayoutDashboard', label: 'Dashboard', component: DashboardScreen },

    { icon: 'User', label: 'Profile', component: ProfileScreen },
    { icon: 'Plus', label: '', component: ProfileScreen}, 

    { icon: 'File', label: 'Bordereaux', component: BordereauxStackNavigator}, 

    { icon: 'Sailboat', label: 'Sailboat', component: BordoreauxScreen }, 
  ];

  const CurrentScreen = screens[selectedIndex].component;

  return (
    <View style={{ flex: 1 }}>
      <CurrentScreen />
      <TabsNavigator
        data={screens}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
    </View>
  );
};

export default CustomTabsNavigator;
