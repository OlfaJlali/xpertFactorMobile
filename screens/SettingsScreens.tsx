import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const SettingsScreen = () => {
 type SettingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
    const navigation = useNavigation<SettingScreenNavigationProp>();
    return (
       <SafeAreaView style={styles.safeAreaContainer} >
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.optionRow} 
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.optionText}>Reset Password</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.optionRow} 
        onPress={() => navigation.navigate('Notifications')}
      >
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default SettingsScreen;
