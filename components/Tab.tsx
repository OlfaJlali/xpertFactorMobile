import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { DashboardScreenStyles } from '../styles/DashboardScreenStyles';

interface TabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

export const Tab: React.FC<TabProps> = ({ title, isActive, onPress }) => {
  return (
    
    <TouchableOpacity
      style={[DashboardScreenStyles.tab, isActive && DashboardScreenStyles.activeTab]}
      onPress={onPress}
    >
      <Text style={isActive ? DashboardScreenStyles.tabTextSelected  :  DashboardScreenStyles.tabText}>{title}</Text>
    </TouchableOpacity>
  );
};
