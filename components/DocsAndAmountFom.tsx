import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from './TextInput';
import DatePicker from 'react-native-date-picker';
type DocsAndAmountFomProps = {
    documentRef: string
    setDocumentRef:React.Dispatch<React.SetStateAction<string>>
    dueDate: Date,
    setDueDate: React.Dispatch<React.SetStateAction<Date>>
    documentDate:Date
    setDocumentDate: React.Dispatch<React.SetStateAction<Date>>
    amount: string
    setAmount:React.Dispatch<React.SetStateAction<string>>
}
const DocsAndAmountFom = (doc : DocsAndAmountFomProps) => {
    const [isOpen  ,setIsOpen] = useState(false)
    const [isOpenDocDate  ,setIsOpenDocDate] = useState(false)
    
  return (
    <View style={styles.container}>
      <Text style={styles.label}>ُEnter amount</Text>
      <Input placeholder="please enter amount" value={doc.amount} onChangeText={doc.setAmount} keyboardType="numeric" />
      <Text style={styles.label}>Document ref</Text>
      <Input placeholder="2314 - 1341 - 4362 - 1234" value={doc.documentRef} onChangeText={doc.setDocumentRef} keyboardType="numeric" />
      <View style={styles.row}>
       <TouchableOpacity style={styles.cvvContainer} onPress={() => setIsOpen(!isOpen)}>  
       <Text style={styles.label}>Due date</Text>
       <Text style={styles.dateInput}>{`${doc.dueDate.getDate()}/${doc.dueDate.getMonth() + 1}/${doc.dueDate.getFullYear()}`}</Text>
       <DatePicker
       modal
       open={isOpen}
       date={doc.dueDate}
       mode="date"
       onConfirm={doc.setDueDate}
       onCancel={()=>{setIsOpen(false)}}
     />
     </TouchableOpacity>
        <TouchableOpacity style={styles.cvvContainer} onPress={() => setIsOpenDocDate(!isOpenDocDate)}>
       <Text style={styles.label}>document date</Text>
       <Text style={styles.dateInput}>{`${doc.documentDate.getDate()}/${doc.documentDate.getMonth() + 1}/${doc.documentDate.getFullYear()}`}</Text>
       <DatePicker
       modal
       open={isOpenDocDate}
       date={doc.documentDate}
       mode="date"
       onConfirm={doc.setDocumentDate}
       onCancel={()=>{setIsOpenDocDate(false)}}
     />
     </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    // width: 320,
    // alignSelf: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    marginBottom:20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'

  },
  dateInput : {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    color: '#000',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,

  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    color: '#000',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cvvContainer: {
    flex: 1,
    marginRight: 10,
  },
  dateContainer: {
    flex: 1,
  },
});

export default DocsAndAmountFom;
