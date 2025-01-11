import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfilePictureSkeleton: React.FC = () => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageWrapper}>
        <View style={styles.profileImageSkeleton} />
        <View style={styles.editIconSkeleton} />
      </View>
      <View style={styles.nameTextSkeleton} />
      <View style={styles.emailTextSkeleton} />
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
  profileImageSkeleton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  editIconSkeleton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  nameTextSkeleton: {
    width: 150,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
  emailTextSkeleton: {
    width: 180,
    height: 16,
    backgroundColor: '#e0e0e0',
    marginTop: 5,
  },
});

export default UserProfilePictureSkeleton;
