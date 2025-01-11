import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useShow } from '../../context/ShowContext';
import ProfileMenuContainer from '../../containers/profile/ProfileMenuContainer';
import UserProfilePictureContainer from '../../containers/profile/UserProfilePictureContainer';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';

const ProfileScreen: React.FC = () => {
    const {setShow} = useShow();
    const {user , loading, fetchUser} = useGetCurrentUser();
    useFocusEffect(
      useCallback(() => {
        fetchUser()
      }, [])
    );
    useFocusEffect(
      useCallback(() => {
        setShow(true);
      }, [setShow])
    );

  return (
    <SafeAreaView style={styles.safeAreaContainer} >
      <View style={styles.container}>
        <UserProfilePictureContainer loading={loading} user={user}/>
        <ProfileMenuContainer />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
