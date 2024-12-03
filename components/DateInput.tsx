// components/DateInput.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from 'react-native-ui-datepicker';

interface DateInputProps {
  date: Date;
  open: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
}

const DateInput: React.FC<DateInputProps> = ({ date, open, onConfirm, onCancel }) => {
      const [isOpen, setisOpen] = useState(open);
    return  (
      <LinearGradient
      colors={['#FFF', '#FFF']} 
      style={styles.inputContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      

    >
      <TouchableOpacity onPress={() => setisOpen(!isOpen)}>
       
        <Text style={styles.label}>Bordereau date</Text>
        <Text style={styles.input}>{`${date.getDate()}.12 ${date.getFullYear()}`}</Text>
        <DatePicker
        modal
        open={isOpen}
        date={date}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
   
       
      </TouchableOpacity>
      </LinearGradient>


    );
};

const styles = StyleSheet.create({

  inputContainer: {
    // backgroundColor: '#9D70FF',
    padding: 16,
    width: 160,
    borderColor: '#ddd',
    borderWidth:.5,
    borderRadius: 10,
    marginBottom: 16,
    height:220
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1C162E',
    marginBottom: 8,
    },
  input: {
    backgroundColor: 'transparent',
    // borderRadius: 8,
    padding: 12,
    fontSize: 36,
    fontWeight: 'bold',
    // borderColor: '#200',
    // borderWidth: 1,
    color:'#1C162E'
  },
});

export default DateInput;
