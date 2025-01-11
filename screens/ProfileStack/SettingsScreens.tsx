import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import Header from '../../components/Header';
import SettingsMenu from '../../components/SettingsMenu';

const SettingsScreen = () => {
  type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
  const navigation = useNavigation<SettingScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{paddingTop: 20}}>
      <Header goBack={() => navigation.pop()} title='Settings' />
      </View>

      <View style={styles.container}>
        <SettingsMenu
          title="Reset Password"
          iconName="Settings"
          onPress={() => navigation.navigate('ResetPassword')}
        />
        <SettingsMenu
          title="Notifications"
          iconName="Bell"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen;
