import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import Icon from '../utils/Icons';
import { globalStyles } from '../styles/globalStyles';
import Header from '../components/Header';

const SettingsScreen = () => {
  type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
  const navigation = useNavigation<SettingScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{paddingTop: 20}}>
      <Header goBack={() => navigation.pop()} title='Settings' />
      </View>

      <View style={styles.container}>

        <TouchableOpacity 
          style={styles.optionRow} 
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Icon name={'Settings'} size={24} color={'#282534'} />
          <Text style={styles.optionText}>Reset Password</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionRow} 
          onPress={() => navigation.navigate('Notifications')}
        >
          <Icon name={'Bell'} size={24} color={'#282534'} />
          <Text style={styles.optionText}>Notifications</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
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
  headerText: {
    fontSize: 16,
    color: '#808080',
    marginTop: 20,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    paddingLeft: 20,
    flex: 1,  
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  arrow: {
    fontSize: 24,
    color: '#000',
  },
});

export default SettingsScreen;
