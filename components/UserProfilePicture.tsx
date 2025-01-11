import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageURISource } from 'react-native';
import Icon from '../utils/Icons';

interface UserProfilePictureProps {
  profileImage?: string;
  name: string;
  email: string;
  onEdit: () => void;
}

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({ profileImage, name, email, onEdit }) => {
  console.log(profileImage)
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.profileImage}
          source={profileImage ? { uri: profileImage } : require('../assets/profile.png')}
        />
        <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
          <Icon name={'Camera'} size={24} color="#282534" />
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.emailText}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
});

export default UserProfilePicture;
