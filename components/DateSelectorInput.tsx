import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { globalStyles } from '../styles/globalStyles';

interface DateSelectorInputProps {
  label: string;
  date: Date;
  isOpen: boolean;
  onOpen: () => void;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DateSelectorInput: React.FC<DateSelectorInputProps> = ({
  label,
  date,
  isOpen,
  onOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <View>
      <Text style={globalStyles.inputTitle}>{label}</Text>
      <TouchableOpacity onPress={onOpen}>
        <Text style={globalStyles.dateInput}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
        <DatePicker
          modal
          open={isOpen}
          date={date}
          mode="date"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </TouchableOpacity>
    </View>
  );
};


export default DateSelectorInput;
