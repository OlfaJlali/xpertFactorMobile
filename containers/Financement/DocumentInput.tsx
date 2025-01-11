// components/DocumentInput.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { globalStyles } from '../../styles/globalStyles';
import { Input } from '../../components/TextInput';

interface DocumentInputProps {
  amount: string;
  setAmount: (value: string) => void;
  date: Date;
  setDate: (value: Date) => void;
}

const DocumentInput: React.FC<DocumentInputProps> = ({ amount, setAmount, date, setDate }) => {
  const [isOpenDate, setIsOpenDate] = useState(false);

  return (
    <View style={{gap: 10}}>
      <View>
        <Text style={globalStyles.inputTitle}>Document Amount</Text>
        <Input placeholder="Please enter amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      </View>
      <View>
        <Text style={globalStyles.inputTitle}>Document Date</Text>
        <TouchableOpacity onPress={() => setIsOpenDate(true)}>
          <Text style={globalStyles.dateInput}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
          <DatePicker
            modal
            open={isOpenDate}
            date={date}
            mode="date"
            onConfirm={(selectedDate: Date) => {
              setDate(selectedDate);
              setIsOpenDate(false);
            }}
            onCancel={() => setIsOpenDate(false)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DocumentInput;
