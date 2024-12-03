import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useBordereauxForm } from '../hooks/useBordereauxForm';
import DateInput from '../components/DateInput';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TransactionList from '../components/DocumentsNumber';
import InterestPayment from '../components/InterestPayment';
import CurrencyInput from '../components/CurrencyInput';
type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
const { height,width } = Dimensions.get('window');

const BordereauxScreenDraft: React.FC = () => {
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const {
    totalAmount,
    setTotalAmount,
    selectedYear,
    setSelectedYear,
    documentCount,
    // incrementCount,
    // decrementCount,
    date,
    isDatePickerOpen,
    closeDatePicker,
    setDate,
    flatListRef,
    years,
  } = useBordereauxForm();

useEffect(() => {
  const selectedYearIndex = years.findIndex((year) => year === selectedYear);
  if (flatListRef.current) {
    flatListRef.current.scrollToIndex({
      index: selectedYearIndex,
      animated: false,
      viewPosition: 1.5, 
    });
  }
}, [selectedYear]);

  const handleGoToForm = () => {
    navigation.navigate('BordoreauxForm', {
      totalAmount,
      date,
      selectedYear,
      documentCount : 10,  
    });
  };
  const renderYear = ({ item }: { item: number }) => (
    <TouchableOpacity onPress={() => setSelectedYear(item)}>
      <Text style={[styles.yearText, item === selectedYear && styles.selectedYear]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const [step , setStep] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}> 
      <View style={{
          alignSelf:'flex-start',
                justifyContent: 'center',
                alignItems: 'center',
                 padding: 20
            }}>

    

      </View>
      <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height / 10
            }}>


    <CurrencyInput step={step} showImage={true} />
    {/* <CurrencyInput src={require('../../assets/men1.png')} showImage={false}/> */}
    {/* <CurrencyInput src={require('../../assets/men3.png')} showImage={true}/> */}


           <TouchableOpacity style={styles.saveButton} onPress={() => {
           
            setStep((prevState)=> {

              return prevState + 1;
           })}}>
         <Text style={styles.saveButtonText}>Next</Text>
     </TouchableOpacity> 
     

           </View>
    

        </SafeAreaView>
   
    
//     <View style={styles.container}>
//                 <Text style={styles.sectionTitle}>Mode of Payment</Text>
//                 <CurrencyInput />

//       <View
//         // colors={['#1C162E', '#1C162E']} 
//         style={styles.inputContainer}
//         // start={{x: 0, y: 0}}
//         // end={{x: 1, y: 0}}
//       >
//         <Text style={styles.label}>Enter amount</Text>
//         <View style={styles.AmountinputContainer}>
//           <TextInput
//             style={styles.input}
//             value={totalAmount}
//             onChangeText={setTotalAmount}
//             keyboardType="numeric"
            
//           />
//           <Text style={styles.input}>TND</Text>
//         </View>
//         </View>
//       {/* </LinearGradient> */}
//       {/* <Text style={{color: '#1C162E',fontWeight:'bold',fontSize:14}}>Documents number</Text> */}
//       <TransactionList />

//       <InterestPayment />
//       {/* <View style={[styles.counterContainer, styles.flexItem]}>
//           <Text style={styles.label}>Documents number</Text>
//           <View style={styles.counter}>
//             <TouchableOpacity onPress={decrementCount} style={styles.counterButton}>
//               <Text style={styles.counterText}>-</Text>
//             </TouchableOpacity>
//             <Text style={styles.documentCount}>{documentCount}</Text>
//             <TouchableOpacity onPress={incrementCount} style={styles.counterButton}>
//               <Text style={styles.counterText}>+</Text>
//             </TouchableOpacity>
//           </View>
//         </View> */}


//       {/* <DateInput
//         date={date}
//         open={isDatePickerOpen}
        
//         onConfirm={(date: Date) => {
//           setDate(date);
//           closeDatePicker();
//         }}
//         onCancel={closeDatePicker}
//       />

//       <View style={styles.horizontalContainer}>
//         <View style={[styles.yearContainer, styles.flexItem]}>
//           <Text style={styles.label}>Bordereau year</Text>
//           <FlatList
//             ref={flatListRef}
//             data={years}
//             keyExtractor={(item) => item.toString()}
//             renderItem={renderYear}
//             contentContainerStyle={styles.yearSelector}
//             showsVerticalScrollIndicator={false}
//             getItemLayout={(data, index) => ({
//               length: 50,
//               offset: 55 * index,
//               index,
//             })}
//             onScrollToIndexFailed={(info) => {
//               console.error('Scroll to index failed', info);
//             }}
//           />
//         </View>

     
//       </View>
// */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleGoToForm}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity> 
//     </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',

    // gap: height,
    // paddingHorizontal: 16,
    // alignItems: 'center', // Centers everything inside the ScrollView
  },
  container: {
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'space-between',
  },

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
   backgroundColor: '#1C162E',
   opacity: 0.9,
    padding: 16,
    // borderColor: '#ddd',
    // borderWidth:2,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#3E77BC",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:  .5,
    shadowRadius: 5.62,
    elevation: 6
    },
  AmountinputContainer: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 8,
  },
  input: {
    // backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 26,
    color: '#1AD5AD',
    fontWeight: 'regular'
    // borderColor: '#ddd',
    // borderWidth: 1,
  },
  yearContainer: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    height: 200,
  },
  yearSelector: {
    alignItems: 'center',
  },
  yearText: {
    color: '#999',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  selectedYear: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterContainer: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  documentCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  counterButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#3E77BC',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width:'70%'
  },
  flexItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BordereauxScreenDraft;
