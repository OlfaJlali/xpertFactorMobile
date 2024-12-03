import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../types/navigationTypes';

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
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://gravatar.com/avatar/828a6fbd5f1da66fd6ef3830e005f43a?s=400&d=mp&r=x' }} // Replace with the actual image source
        />
        <Text style={styles.nameText}>Jlali Olfa</Text>
        <Text style={styles.emailText}>olfajlali@gmail.com</Text>
      </View>

      {/* Menu Section */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleGotoMyAccount}>
          <View style={styles.iconContainer}>
          {/* < Icon name="user" size={30} color="blue" /> */}
          </View>
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleGotoSettings}>
          <View style={styles.iconContainer}>
          {/* < Icon name="gear" size={30} color="blue" /> */}
          </View>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconContainer}>
          {/* < Icon name="file-text" size={30} color="blue" /> */}
          </View>
          <Text style={styles.menuText}>Policy privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
          <View style={styles.iconContainer}>
         {/* < Icon name="close" size={30} color="red" /> */}
        </View>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
      </View>
       </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
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
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: 'red',
  },
});

export default ProfileScreen;
