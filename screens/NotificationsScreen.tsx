import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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
  },
});

export default NotificationsScreen;
