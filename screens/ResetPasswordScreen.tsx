import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter old password" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Enter new password" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Retype new password" secureTextEntry={true} />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    fontSize: 14,
    color: '#999',
  },
  saveButton: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ResetPasswordScreen;
