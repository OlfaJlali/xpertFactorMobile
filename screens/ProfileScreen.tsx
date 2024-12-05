import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import Icon from '../utils/Icons';

const ProfileScreen: React.FC = () => {
    type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const handleGotoMyAccount = () => {
      navigation.navigate('MyAccount'); 
    };
    const handleGotoSettings = () => {
    navigation.navigate('Settings');
  }
  
  return (
    <SafeAreaView style={styles.safeAreaContainer} >
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.profileImage}
          source={require('../assets/profile.png')}
        />
        <TouchableOpacity style={styles.editIcon} onPress={() => console.log('Edit profile image')}>
          <Icon name={'Camera'} size={24} color={ '#282534' } />
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>Jlali Olfa</Text>
      <Text style={styles.emailText}>olfajlali@gmail.com</Text>
    </View>

      {/* Menu Section */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleGotoMyAccount}>
          <View style={styles.iconContainer}>
          <Icon name={'User'} size={24} color={ '#282534' } />
          </View>
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleGotoSettings}>
          <View style={styles.iconContainer}>
          <Icon name={'Settings'} size={24} color={ '#282534' } />

          </View>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
          <Icon name={'Lock'} size={24} color={ '#282534' } />
          </View>
          <Text style={styles.menuText}>Policy privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <View style={styles.iconContainer}>
          <Icon name={'SquareArrowLeft'} size={24} color={ '#ED5757' } />
        </View>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
       </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 50,
    padding: 5,
    borderWidth:1,
    backgroundColor: '#F5F5F5'
    

  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color :'#000'
  },
  emailText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
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
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 25,
    height: 25,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000'
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#ED5757',
  },
});

export default ProfileScreen;
