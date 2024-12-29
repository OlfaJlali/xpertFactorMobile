import React from 'react';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from 'react-native';
import { inputStyles } from '../styles/inputStyles';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', onFocus = undefined }) => {
  return (
    <TextInput
      style={inputStyles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onFocus={onFocus}
      

    />
  );
};
