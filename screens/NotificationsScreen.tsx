import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/globalStyles';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const NotificationsScreen = () => {
  const [isEnabledAll, setIsEnabledAll] = useState(false);
  const [isEnabledBordereauState, setIsEnabledBordereauState] = useState(false);
  const [isEnabledLimitState, setIsEnabledLimitState] = useState(false);
  const [isEnabledLitigeState, setIsEnabledLitigeState] = useState(false);
  const [isEnabledProrogationState, setIsEnabledProrogationState] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Notifications'>>();
  const ToggleAll = () => {
    setIsEnabledAll(prev => {
      setIsEnabledBordereauState(!prev)
      setIsEnabledLimitState(!prev)
      setIsEnabledLitigeState(!prev)
      setIsEnabledProrogationState(!prev)

      return !prev
    })
  }
  useEffect(()=> {
    if ( isEnabledBordereauState && isEnabledLimitState && isEnabledLitigeState && isEnabledProrogationState ) {
      setIsEnabledAll(true)
    }else {
      setIsEnabledAll(false)
    }
  }, [ isEnabledBordereauState , isEnabledLimitState , isEnabledLitigeState, isEnabledProrogationState])

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{paddingTop: 20}}>
      <Header goBack={() => navigation.pop()} title='Notifications' />
      </View>


    <View style={styles.container}>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>All notifications</Text>
        <Switch
          value={isEnabledAll}
          onValueChange={ToggleAll}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Bordereau state</Text>
        <Switch
          value={isEnabledBordereauState}
          onValueChange={setIsEnabledBordereauState}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Limit State</Text>
        <Switch
          value={isEnabledLimitState}
          onValueChange={setIsEnabledLimitState}
        />
      </View>

      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Litige State</Text>
        <Switch
          value={isEnabledLitigeState}
          onValueChange={setIsEnabledLitigeState}
        />
      </View>
      <View style={styles.notificationRow}>
        <Text style={styles.notificationText}>Prorogation State</Text>
        <Switch
          value={isEnabledProrogationState}
          onValueChange={setIsEnabledProrogationState}
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
