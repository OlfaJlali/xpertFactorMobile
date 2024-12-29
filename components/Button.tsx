import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress,disabled, loading=false }) => {
  return (
    <TouchableOpacity style={disabled ? styles.buttonDisabled : styles.button} onPress={onPress} disabled={disabled}>
       {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ): (
            <Text style={styles.buttonText}>{title}</Text>
          )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3E77BC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonDisabled: {
    width: '100%',
    height: 50,
    backgroundColor: '#A0B9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
