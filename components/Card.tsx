import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { DashboardScreenStyles } from '../styles/DashboardScreenStyles';

interface CardProps {
  title: string;
  amount: string;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ title, amount, style }) => {
  return (
    <View style={[DashboardScreenStyles.card, style]}>
      <Text style={DashboardScreenStyles.cardText}>{title}</Text>
      {amount && <Text style={DashboardScreenStyles.cardAmount}>{amount}</Text>}
    </View>
  );
};
