import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { globalStyles } from '../../styles/globalStyles';
import { Input } from '../../components/TextInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
import DateSelectorInput from '../../components/DateSelectorInput';
import TypeSelector from '../../containers/Financement/TypeSelector';
import { useSubmitLimit } from '../../viewmodels/useSubmitLimit';
import { Limit } from '../../types/Limit';
import { handleNumericInput } from '../../utils/handleNumericInput';
type RequestLimitScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LimitForm'>;
const {height} = Dimensions.get('window')
const RequestLimit = ({ route }: any) => {
    const navigation = useNavigation<RequestLimitScreenNavigationProp>();   
    const [selectedType, setSelectedType] = useState('Traite');
    const [limit, setLimit] = useState<number | null>(null);
    const [financementlimit, setFinancementlimit] = useState<number | null>(null);
    const [isOpenRequestDate, setIsOpenRequestDate] = useState(false);
    const [requestDate, setRequestDate] = useState(new Date());
    const [limitDate, setLimitDate] = useState(new Date());
    const [lastRequetDate, setLastRequestDate] = useState(new Date());
    const [isOpenLastRequestDate, setIsOpenLastRequestDate] = useState(false);
    const [isOpenlimitDate, setIsOpenlimitDate] = useState(false);
    const [delaiDemande, setDelaidemande] = useState<number | null>(null);
    const [disabled, setDisabled] = useState(true);
    const { submitLimit, loading } = useSubmitLimit();
  
    useEffect(() => {
        if (limit === null || financementlimit === null || delaiDemande === null) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }, [limit, financementlimit, delaiDemande]);
    
    
      const tabs = [
        { title: 'Traite', key: 'Traite' },
        { title: 'Virement', key: 'Virement' },
        { title: 'Cheque', key: 'Cheque' },
        { title: 'Cash', key: 'Cash' },
      ];

      const handleSubmit = () => {
        const buyerId = route.params


        const data: Limit = {
            buyerId,
            requestDate,
            assurenceLimit: limit || 0,
            financementLimit: financementlimit || 0,
            limitDate,
            lastRequestDate: lastRequetDate,
            requestedDelay: delaiDemande || 0,
            type: selectedType,
          };
          
        submitLimit(data);
      };

     
    
    
    
  return (
    
    <SafeAreaView style={{    flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    }}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
             <Header goBack={() => navigation.pop()} title='Limit' />
 <View style={{paddingHorizontal: 20}}>

         
        <View style={{gap: 10 , paddingBottom: height / 6}}>
            <DateSelectorInput
                label="Request Date"
                date={requestDate}
                isOpen={isOpenRequestDate}
                onOpen={() => setIsOpenRequestDate(true)}
                onConfirm={(date) => {
                    setRequestDate(date);
                    setIsOpenRequestDate(false);
                }}
                onCancel={() => setIsOpenRequestDate(false)}
                />
             
            <View >
                <Text style={globalStyles.inputTitle}>Assurence Limit</Text>
                <Input
                placeholder="Please enter Limit"
                value={limit !== null ? limit.toString() : ''}
                onChangeText={(text) => handleNumericInput(text, setLimit)}
                keyboardType="numeric"
              />
            </View >
            <View >
                <Text style={globalStyles.inputTitle}>Financement Limit</Text>
                <Input
                placeholder="Please enter Limit"
                value={financementlimit !== null ? financementlimit.toString() : ''}
                onChangeText={(text) => handleNumericInput(text, setFinancementlimit)}
                keyboardType="numeric"
              />
            </View >
            <DateSelectorInput
                label="Limit Date"
                date={limitDate}
                isOpen={isOpenlimitDate}
                onOpen={() => setIsOpenlimitDate(true)}
                onConfirm={(date) => {
                    setLimitDate(date);
                    setIsOpenlimitDate(false);
                }}
                onCancel={() => setIsOpenlimitDate(false)}
            />
                      <DateSelectorInput
                label="Last Request Date"
                date={lastRequetDate}
                isOpen={isOpenLastRequestDate}
                onOpen={() => setIsOpenLastRequestDate(true)}
                onConfirm={(date) => {
                    setLastRequestDate(date);
                    setIsOpenLastRequestDate(false);
                }}
                onCancel={() => setIsOpenLastRequestDate(false)}
            />
           
            <View >
                <Text style={globalStyles.inputTitle}>Requested delay</Text>
                <Input
                placeholder="Please enter delay"
                value={delaiDemande !== null ? delaiDemande.toString() : ''}
                onChangeText={(text) => handleNumericInput(text, setDelaidemande)}
                keyboardType="numeric"
              />
            </View >
            <TypeSelector
                    tabs={tabs}
                    selectedTab={selectedType}
                    onSelectTab={setSelectedType}
                    centred 
                />
            <Button title="Save" onPress={handleSubmit} disabled={disabled} loading={loading}/>
        </View>
      
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};
export default RequestLimit