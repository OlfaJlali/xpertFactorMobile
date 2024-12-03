import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Counter = () => {
  const [amount, setAmount] = useState('50'); // Default value set to 50

  const handleChange = (text : string) => {
    const sanitizedText = text.replace(/[^0-9]/g, ''); // Only allow numbers
    setAmount(sanitizedText);
  };

  return (
    <>
   
    <View style={styles.container}>
      {/* <Text style={styles.label}>Enter Amount</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder="0"
        />
      </View> */}
      <Text style={styles.label}>Enter number of documents</Text>
      <View style={{flexDirection:'row' , alignSelf:'center', gap: 20 , alignItems:'center'}}>
      <Text>+</Text>
      <View style={styles.CounterContainer}>
        
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder="0"
        />
      </View>
      <Text>-</Text>
      </View>
    </View>

    </>
  );
};

const styles = StyleSheet.create({
    CounterContainer:{
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        borderRadius: 10,
        padding: 10,
        width: 50,
        height:50
       
    },
  container: {
    padding: 20,
    backgroundColor:'#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    borderRadius:5,
    marginBottom:20
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    width : '70%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#4CAF50',
    marginRight: 5,
  },
  input: {
    fontSize: 24,
    color: '#4CAF50',
    flex: 1,
  },
});

export default Counter;
