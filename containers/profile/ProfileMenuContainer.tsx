import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileMenu from '../../components/ProfileMenu'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { LocalStorageService } from '../../data/storage/LocalStorageService';
import { useAuth } from '../../context/AuthContext';
import { useShow } from '../../context/ShowContext';
import Intercom from '@intercom/intercom-react-native';

const storageService = new LocalStorageService();
const ProfileMenuContainer = () => {
    type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { setIsAuthenticated } = useAuth();
    const {setShow} = useShow();


    const handleGotoMyAccount = () => {
        navigation.navigate('MyAccount'); 
    };

    const handleGotoSettings = () => {
        navigation.navigate('Settings');
    };

    const handlePrivacyPolicy = () => {
        setShow(false)
        navigation.navigate("PrivacyPolicy")
    };

    const logout = async () => {
      Intercom.logout()
        await storageService.remove('user');
        setIsAuthenticated(false);
    };

  return (
    <View style={styles.menuContainer}>
      <ProfileMenu
        icon="User"
        label="My Account"
        onPress={handleGotoMyAccount}
      />
      <ProfileMenu
        icon="Settings"
        label="Settings"
        onPress={handleGotoSettings}
      />
      <ProfileMenu
        icon="Lock"
        label="Privacy Policy"
        onPress={handlePrivacyPolicy}
      />
      <ProfileMenu
        icon="SquareArrowLeft"
        label="Logout"
        onPress={logout}
        iconColor="#ED5757"
        textColor="#ED5757"
        containerStyle={styles.logoutItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
});

export default ProfileMenuContainer;
