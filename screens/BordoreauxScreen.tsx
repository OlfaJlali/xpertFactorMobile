import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useBordereauxForm } from '../hooks/useBordereauxForm';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TransactionList from '../components/DocumentsNumber';
import InterestPayment from '../components/InterestPayment';
import Counter from './counter';
import DocsAndAmountFom from '../components/DocsAndAmountFom';
import { globalStyles } from '../styles/globalStyles';
import Header from '../components/Header';
type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const BordereauxScreen: React.FC = () => {
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const {
    totalAmount,
    setTotalAmount,
    selectedYear,
    setSelectedYear,
    documentCount,
    setDocumentCount,
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
    console.log('totalAmount:', totalAmount )
    let docsCount = parseInt(documentCount)
    console.log('documentCount:', docsCount )
    console.log('selectedYear:', selectedYear )
    console.log('date:', date )

    navigation.navigate('BordoreauxForm', {
      totalAmount,
      date,
      selectedYear,
      documentCount : docsCount ,  
    });
  };
  const renderYear = ({ item }: { item: number }) => (
    <TouchableOpacity onPress={() => setSelectedYear(item)}>
      <Text style={[styles.yearText, item === selectedYear && styles.selectedYear]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

    {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}> */}
    <Text style={globalStyles.PageTitle}>Bordereau</Text>


    <View style={styles.container}>

    <Text style={styles.sectionTitle}>Mode of Payment</Text>
      <View style={styles.inputContainer} >
        <Text style={styles.label}>Enter amount</Text>
        <View style={styles.AmountinputContainer}>
          <TextInput
            style={styles.input}
            value={totalAmount}
            onChangeText={setTotalAmount}
            keyboardType="numeric"
            
          />
          <Text style={styles.input}>TND</Text>

        </View>
        <Text style={styles.label}>Enter documents number</Text>
        <View style={styles.AmountinputContainer}>
          <TextInput
            style={styles.input}
            value={documentCount}
            onChangeText={setDocumentCount}
            keyboardType="numeric"
            
          />
          <Text style={styles.input}>Document</Text>

        </View>
        </View>

    {/* <DocsAndAmountFom /> */}
    <Text style={styles.sectionTitle}>Year and date</Text>

  <InterestPayment     
    selectedYear={selectedYear}
    setSelectedYear={setSelectedYear}
    date={date}
    setDate={setDate}
 />
     
      <TouchableOpacity style={styles.saveButton} onPress={handleGoToForm}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity> 
    </View>

     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 110,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    // paddingTop: 40,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
   backgroundColor: '#FFF',
   opacity: 1,
    padding: 16,
    // borderColor: '#ddd',
    // borderWidth:2,
    borderRadius: 12,
    marginBottom: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:  0.19,
    shadowRadius: 5.62,
    elevation: 6
    },
  AmountinputContainer: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E77BC',
    marginBottom: 8,
  },
  input: {
    // backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 26,
    color: '#000',
    fontWeight: '500'
    
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

export default BordereauxScreen;
