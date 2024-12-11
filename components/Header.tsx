import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/OnboardingStyle';
import { FooterProps } from '../types/onboardingTypes';
import Icon from '../utils/Icons';
import { globalStyles } from '../styles/globalStyles';
type HeaderProps = {
    goBack: () => void ;
    title : string
    padding?: boolean
}
const Header: React.FC<HeaderProps> = ({goBack , title , padding = true}) => {
  return (
    <TouchableOpacity onPress={goBack}>
    <View  style={{flexDirection : 'row' , paddingLeft:  padding ? 10 : 0 ,gap : 5}}>
    <Icon name={'ChevronLeft'} size={32} color={ '#3E77BC' } />
    <Text style={globalStyles.ProfilePageTitle}>{title}</Text>

    </View>

  </TouchableOpacity>
  );
};

export default Header;
