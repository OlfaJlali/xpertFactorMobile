import React from 'react';
import { View, Text } from 'react-native';
import { DashboardScreenStyles } from '../styles/DashboardScreenStyles';

interface ListItemProps {
  item: {
    code: string;
    label: string;
    amount: string;
    color: string;
  };
}

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <View style={DashboardScreenStyles.itemContainer}>
      <View style={DashboardScreenStyles.iconContainer}>
        <Text style={DashboardScreenStyles.iconText}>{item.code}</Text>
      </View>
      <Text style={DashboardScreenStyles.itemLabel}>{item.label}</Text>
      {/* <View style={DashboardScreenStyles.itemAmountContainer}> */}
      <Text style={[DashboardScreenStyles.itemAmount, { color: item.color }]}>{item.amount}</Text>
      {/* </View> */}
    </View>
  );
};
