import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Input } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import Header from '../../components/Header';
import UserProfilePictureContainer from '../../containers/profile/UserProfilePictureContainer';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import { DIContainer } from '../../di/container';
import AccountInputContainer from '../../containers/profile/MyAccount/AccountInputContainer';
const MyAccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'MyAccount'>>();
  const {user, loading } = useGetCurrentUser();



  return (
     <SafeAreaView style={styles.safeAreaContainer} >
            {/* Header */}
      <View style={{paddingTop: 20}}>
      <Header goBack={() => navigation.pop()} title='My Account' />
      </View>
      

      {/* Profile Image */}
        <UserProfilePictureContainer user={user} loading={loading} showNameAndEmail={false} />

      <AccountInputContainer />
   
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 130,
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;
