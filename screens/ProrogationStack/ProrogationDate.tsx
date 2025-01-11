import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Tab } from '../../components/Tab';
import DatePicker from 'react-native-date-picker';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../../components/Header';
import { Input } from '../../components/TextInput';
import TypeSelector from '../../containers/Financement/TypeSelector';
import DateSelectorInput from '../../components/DateSelectorInput';
import { useSubmitProrogation } from '../../viewmodels/useSumbitProrogation';
import { Prorogation } from '../../types/Prorogation';
type ProrogationDateNavigationProp = StackNavigationProp<RootStackParamList, 'ProrogationDate'>;

const ProrogationDate = ({ route }: any) => {
    console.log(route.params)
    const[selectedType, setSelectedType] = useState('Achat')
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenEchanceDate, setIsOpenEchanceDate] = useState(false);
    const [echanceDate, setEchanceDate] = useState(new Date());
    const [motif , setMotif] = useState('');
    const [disabled, setDisabled] = useState(true)

    const [ProrogationDate, setProrogationDate] = useState(new Date());
    const navigation = useNavigation<ProrogationDateNavigationProp>();   
   const { submitProrogation, loading } = useSubmitProrogation();
   const handleSubmit = () => {
    const {documentId} = route.params
    console.log(documentId,selectedType,ProrogationDate,motif, echanceDate)

    const data: Prorogation = {
      documentId,
      type: selectedType,
      dueDate: ProrogationDate,
      motif,
      echeanceDate: echanceDate
    };
    submitProrogation(data);
  };

  useEffect(()=>{
    if(motif.length > 0){
        setDisabled(false)
    } else  {
        setDisabled(true)
    }
  },[motif])

      const tabs = [
        { title: 'Achat', key: 'Achat' },
        { title: 'Sond', key: 'Sond' },
        { title: 'P Dir', key: 'P Dir' },
        { title: 'Other', key: 'Other' },
      ];


  return (
    <SafeAreaView style={{    flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
        
    }}>
    <Header goBack={() => navigation.pop()} title='Prorogation' />
    <View style={{paddingHorizontal: 20}}>
        <View>
            <Text style={[globalStyles.inputTitle]}>Prorogation Type</Text>
            <TypeSelector
                tabs={tabs}
                selectedTab={selectedType}
                onSelectTab={setSelectedType}
                centred 
            />                
        </View>

        <DateSelectorInput
            label="Due date"
            date={ProrogationDate}
            isOpen={isOpenDate}
            onOpen={() => setIsOpenDate(true)}
            onConfirm={(date) => {
            setProrogationDate(date);
            setIsOpenDate(false);
            }}
            onCancel={() => setIsOpenDate(false)}
        />

        <View>
            <Text style={[globalStyles.inputTitle, {paddingTop: 10}]}>Prorogation Motif</Text>
            <Input  placeholder="Prorogation Motif" value={motif} onChangeText={setMotif} keyboardType='default' />   
        </View>

        <View style={{paddingTop:20}}>
            <DateSelectorInput
            label="Prorogation Echance Date"
            date={echanceDate}
            isOpen={isOpenEchanceDate}
            onOpen={() => setIsOpenEchanceDate(true)}
            onConfirm={(date) => {
                setEchanceDate(date);
                setIsOpenEchanceDate(false);
            }}
            onCancel={() => setIsOpenEchanceDate(false)}
            />
        </View>

        <Button title="Save" onPress={handleSubmit} disabled={disabled}  loading={loading}/>
    </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 20,
  },
});

export default ProrogationDate;
