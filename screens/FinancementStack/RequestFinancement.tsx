import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { COLOR_MAIN, globalStyles } from '../../styles/globalStyles';
import { Button } from '../../components/Button';
import Icon from '../../utils/Icons';
import { useShow } from '../../context/ShowContext';
import TypeSelector from '../../containers/Financement/TypeSelector';
import DocumentInput from '../../containers/Financement/DocumentInput';
import { FinancementRequest } from '../../types/Financement';
import { validateAmount } from '../../utils/validation';
import { useSubmitFinancement } from '../../viewmodels/useSubmitFinancement';
type RequestFinancementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RequestFinancement'>;

const RequestFinancement = () => {
    const navigation = useNavigation<RequestFinancementScreenNavigationProp>();   
    const [type ,setType] = useState('Financement') ;
    const [financementType ,setFinancementType] = useState('Traite') ;
    const [amount, setAmount] = useState('') ;
    const [docDate, setDocDate] = useState(new Date());
    const { submitRequestFinancement, loading } = useSubmitFinancement();
    const {setShow} = useShow()
    const handleSubmit = () => {
      const data: FinancementRequest = {
        type,
        document_amount: amount,
        document_date: docDate,
        financement_type: financementType,
      };
  
      submitRequestFinancement(data);
    };
    useFocusEffect(
      useCallback(() => {
        setShow(true);
      }, [setShow])
    );
      
  return (
    <SafeAreaView style={{    flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    }}>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            paddingBottom: 30,
            paddingLeft: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',          
          }}
        >
  
          <Text style={globalStyles.PageTitle}>Financement</Text>
          <TouchableOpacity
            onPress={() => {
            navigation.navigate('BordoreauxStarter')}}
          >
          <Icon name='Info' color={COLOR_MAIN} size={24}   />
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.inputTitle}>type</Text>
        <TypeSelector
          tabs={[
            { title: 'Financement', key: 'Financement' },
            { title: 'FDG liberation', key: 'FDG liberation' },
          ]}
          selectedTab={type}
          onSelectTab={setType}
        />
        <View style={{gap: 10}}>
          <DocumentInput amount={amount} setAmount={setAmount} date={docDate} setDate={setDocDate} />              
          <Text style={[globalStyles.inputTitle]}>Financement Type</Text>
          <TypeSelector
              tabs={[
                { title: 'Traite', key: 'Traite' },
                { title: 'Virement', key: 'Virement' },
                { title: 'Cheque', key: 'cheque' },
                { title: 'Cash', key: 'cash' },
              ]}
              selectedTab={financementType}
              onSelectTab={setFinancementType}
            />
          <Button title="Save" onPress={handleSubmit} disabled={!validateAmount(amount)} loading={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RequestFinancement