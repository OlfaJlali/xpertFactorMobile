import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from '../utils/Icons';
import { IconNames } from '../types/BottomSheetTypes';

interface ProfileMenuProps {
  icon: IconNames;
  label: string;
  onPress: () => void;
  iconColor?: string;
  textColor?: string;
  containerStyle?: object;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  icon,
  label,
  onPress,
  iconColor = '#282534',
  textColor = '#000',
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity style={[styles.menuItem, containerStyle]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={iconColor} />
      </View>
      <Text style={[styles.menuText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    menuContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
      },
      menuText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#000'
      },    
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
      },
      iconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

export default ProfileMenu;
