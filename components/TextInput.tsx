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
  isDisabled?: boolean
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', onFocus = undefined, isDisabled = false}) => {
  return (
    <TextInput
      style={isDisabled ? inputStyles.disabledInput : inputStyles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={isDisabled ? undefined : onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      onFocus={isDisabled ? undefined : onFocus}
      editable={!isDisabled} 
      selectTextOnFocus={!isDisabled} 
    />
  );
};
