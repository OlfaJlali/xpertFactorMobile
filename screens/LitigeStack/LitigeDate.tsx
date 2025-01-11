import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Tab } from '../../components/Tab';
import DatePicker from 'react-native-date-picker';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../../components/Header';
import TypeSelector from '../../containers/Financement/TypeSelector';
import DateSelectorInput from '../../components/DateSelectorInput';
import { Litige } from '../../types/Litige';
import { useSubmitLitige } from '../../viewmodels/useSubmitLitige';
type LitigeDateNavigationProp = StackNavigationProp<RootStackParamList, 'LitigeDate'>;

const LitigeDate = ({ route }: any) => {
    // console.log(route.params)
    const[selectedType, setSelectedType] = useState('Achat')
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenEchanceDate, setIsOpenEchanceDate] = useState(false);
    const [echanceDate, setEchanceDate] = useState(new Date());
    const { submitLitige, loading } = useSubmitLitige();

    const [litigeDate, setLitigeDate] = useState(new Date());
        const navigation = useNavigation<LitigeDateNavigationProp>();   
        const tabs = [
            { title: 'Achat', key: 'Achat' },
            { title: 'Sond', key: 'Sond' },
            { title: 'P Dir', key: 'P Dir' },
            { title: 'Other', key: 'Other' },
          ];
        


      const handleSubmit = () => {
        const {documentId} = route.params
        console.log(documentId,selectedType,litigeDate,echanceDate)

        const data: Litige = {
          documentId,
          type: selectedType,
          litigeDate,
          echeanceDate: echanceDate
        };
    
        submitLitige(data);
      };
  


  return (
    <SafeAreaView style={{    flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
        
    }}>
    <Header goBack={() => navigation.pop()} title='Litige' />
       <View style={{paddingHorizontal: 20}}>
       <View>
       <Text style={[globalStyles.inputTitle]}>Litige Type</Text>
            <TypeSelector
                    tabs={tabs}
                    selectedTab={selectedType}
                    onSelectTab={setSelectedType}
                    centred 
                />
            </View>
        <DateSelectorInput
            label="Litige Date"
            date={litigeDate}
            isOpen={isOpenDate}
            onOpen={() => setIsOpenDate(true)}
            onConfirm={(date) => {
            setLitigeDate(date);
            setIsOpenDate(false);
            }}
            onCancel={() => setIsOpenDate(false)}
      />

      <DateSelectorInput
        label="Litige Echance Date"
        date={echanceDate}
        isOpen={isOpenEchanceDate}
        onOpen={() => setIsOpenEchanceDate(true)}
        onConfirm={(date) => {
          setEchanceDate(date);
          setIsOpenEchanceDate(false);
        }}
        onCancel={() => setIsOpenEchanceDate(false)}
      />

            <Button title="Save" onPress={handleSubmit} disabled={false} loading={loading}/>
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

export default LitigeDate;
