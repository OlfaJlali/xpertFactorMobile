import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../utils/Icons';
import { IconNames } from '../types/BottomSheetTypes';

interface SettingsMenuProps {
  title: string;
  iconName: IconNames;
  onPress: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
      <Icon name={iconName} size={24} color={'#282534'} />
      <Text style={styles.optionText}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 20,
    flex: 1,
  },
  arrow: {
    fontSize: 24,
    color: '#000',
  },
});

export default SettingsMenu;
