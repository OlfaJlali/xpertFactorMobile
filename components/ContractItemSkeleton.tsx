import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DashboardScreenStyles } from '../styles/DashboardScreenStyles';

export const ContractItemSkeleton = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={[DashboardScreenStyles.iconContainer, { backgroundColor: '#d3d3d3',borderColor: '#d3d3d3' }]}>
        <Text style={[DashboardScreenStyles.iconText, { color: '#d3d3d3' }]}>X</Text>
      </View>
      <View style={styles.skeletonLabel} />
      <View style={styles.skeletonAmount} />
    </View>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16, 
        borderColor: '#d3d3d3',
        borderWidth: 0.2
    },
  skeletonLabel: {
    width: '50%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonAmount: {
    width: 30,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});
