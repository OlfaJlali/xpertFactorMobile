import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { RootStackParamList } from '../types/navigationTypes';
const { height,width } = Dimensions.get('window');
type CurrencyInputProps =  {
  showImage? : boolean
  step: number
}
type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const CurrencyInput = ({step, showImage = true}: CurrencyInputProps) => {
  const [amount, setAmount] = useState('50'); // Default value set to 50
  const increment = () => {
    setAmount((prev) => (parseInt(prev, 10) + 1).toString());
};

const decrement = () => {
    setAmount((prev) => Math.max(0, parseInt(prev, 10) - 1).toString());
};

  const handleChange = (text : string) => {
    const sanitizedText = text.replace(/[^0-9]/g, ''); // Only allow numbers
    setAmount(sanitizedText);
  };
  const navigation = useNavigation<VerifyScreenNavigationProp>();

  // const handleGoToForm = () => {
  //   navigation.navigate('BordoreauxForm', {
  //     totalAmount =,
  //     date,
  //     selectedYear,
  //     documentCount,  
  //   });
  // };
  const checkSource = (step : number) => {
    if(step === 0 ){
      return require('../../assets/men2.png');
    } else if (step === 1){
      return require('../../assets/men1.png');
    }else {
      return require('../../assets/men3.png');
    }
  }

  return (
    <View>
      <View style={{alignSelf:'flex-start', margin:20,gap:20, width: width / 2}}>
      <AnimatedCircularProgress
          size={width / 6}
          width={8}
          fill={step / 3 * 100} // 12% progress
          tintColor="#50E3C2"
          backgroundColor="#E6E6E6"
          rotation={0} // Starts from the top
        >
          {fill => <Text style={{fontSize: 18,
    fontWeight: 'bold',
    color: '#2E2E3A',}}>{`${fill.toFixed(0)}%`}</Text>}
        </AnimatedCircularProgress>
      {step === 0 && (
            <Text style={{ fontWeight:'bold',fontSize:23 }}>How much you want to
       invest today ?</Text>
      )}
       {step === 1 && (
            <Text style={{ fontWeight:'bold',fontSize:23 }}>How many documents ?</Text>
      )}
          {step === 2 && (
            <Text style={{ fontWeight:'bold',fontSize:23 }}>what about the date ?</Text>
      )}
         {step === 3 && (
            <Text style={{ fontWeight:'bold',fontSize:23 }}>what about the year ?</Text>
      )}
      </View>
     
        <View style={styles.container }>
        <Image
      //  source={src} 
        source={checkSource(step)}
        style={styles.overlayImage}
        resizeMode="contain"
      />
      
      {step === 0 && (
        <>
        <Text style={styles.label}>Enter Amount</Text>
               <View style={styles.inputContainer}>
               <Text style={styles.currencySymbol}>TND</Text>
               <TextInput
                 style={styles.input}
                 value={amount}
                 onChangeText={handleChange}
                 keyboardType="numeric"
                 placeholder="0"
               />
             </View>

        </>
               
      )}
        {step === 1 && (
                <>
                    <Text style={styles.label}>Enter docs number</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text onPress={decrement} style={styles.counterButton}>-</Text>
                        <View style={styles.inputCounterContainer}>
                            <TextInput
                                style={styles.input}
                                value={amount}
                                onChangeText={handleChange}
                                keyboardType="numeric"
                                placeholder="0"
                            />
                        </View>
                        <Text onPress={increment} style={styles.counterButton}>+</Text>
                    </View>
                </>
            )}
          {step === 2 && (
    <Text style={styles.label}>Enter date</Text>
  )}
         {step === 3 && (
    <Text style={styles.label}>Enter Year</Text>
  )}
   
  </View>
    </View>

  );
};

const styles = StyleSheet.create({
  counterButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    // Add any additional styles for the buttons
},

  container: {
    width:width * 0.8,
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:  0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputCounterContainer:{
    flexDirection: 'row',
    width: width / 5,
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '60%'
  },
  inputWrapper: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 100, // Leaves space for the overlay
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },

  currencySymbol: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 5,
  },
  input: {
    fontSize: 24,
    color: '#4CAF50',
    flex: 1,
  },
  overlayImage: {
    position:'absolute',
    width: height / 1.5,
    height: height / 1.5,
    bottom: -70,
    right: -250,


  },

});

export default CurrencyInput;

