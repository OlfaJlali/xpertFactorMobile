import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const NotificationsScreen = () => {
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Notifications'>>();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{paddingTop: 20}}>
      <Header goBack={() => navigation.pop()} title='Notifications' />
      </View>


    <View style={styles.container}>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Notification type 1</Text>
        <Switch
          value={isEnabled1}
          onValueChange={setIsEnabled1}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Notification type 2</Text>
        <Switch
          value={isEnabled2}
          onValueChange={setIsEnabled2}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Notification type 3</Text>
        <Switch
          value={isEnabled3}
          onValueChange={setIsEnabled3}
        />
      </View>
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
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  notificationText: {
    fontSize: 16,
    color : '#000'
  },
});

export default NotificationsScreen;
