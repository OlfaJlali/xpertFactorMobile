import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { Tab } from '../components/Tab';
import { listDashboardTabsStyles } from '../styles/listDashboardTabsStyles';
import { COLOR_MAIN, globalStyles } from '../styles/globalStyles';
import { Input } from '../components/TextInput';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components/Button';
import Icon from '../utils/Icons';
import { useShow } from '../context/ShowContext';
type RequestFinancementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RequestFinancement'>;

const RequestFinancement = () => {
    const navigation = useNavigation<RequestFinancementScreenNavigationProp>();   
    const [selectedTab ,setSelectedTab] = useState('Financement') ;
    const [selectedType ,setSelectedType] = useState('Traite') ;

    
    const [amout, setAmount] = useState('') ;
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [docDate, setDocDate] = useState(new Date());

    const goToCongrats = () => {    
        navigation.navigate('Congratulations'); // Navigate to the Bordoreaux screen
      };
    const {setShow} = useShow()
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
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    justifyContent: 'space-between', // Distributes items to the edges
    alignItems: 'center',           // Vertically centers items
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

        <Text style={globalStyles.inputTitle}>Financement type</Text>

      <View style={listDashboardTabsStyles.tabContainer}>
            <Tab
                title="Financement"
                isActive={selectedTab === 'Financement'}
                onPress={() => setSelectedTab('Financement')}
                />
            <Tab
                title="FDG liberation"
                isActive={selectedTab === 'FDG liberation'}
                onPress={() => setSelectedTab('FDG liberation')}
                />
        </View >
        <View style={{gap: 10}}>
            <View >
                <Text style={globalStyles.inputTitle}>Document Amount</Text>
                <Input placeholder="please enter amount" value={amout} onChangeText={setAmount} keyboardType="numeric" />
            </View >
            <View >
                <Text style={globalStyles.inputTitle}>Document Date</Text>
                <TouchableOpacity onPress={() => setIsOpenDate(!isOpenDate)}>
                    <Text style={globalStyles.dateInput}>{`${docDate.getDate()}/${docDate.getMonth() + 1}/${docDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenDate}
                    date={docDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setDocDate(date);
                    setIsOpenDate(false);
                    }}
                    onCancel={() => setIsOpenDate(false)}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[globalStyles.inputTitle]}>Financement Type</Text>
                    <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }} 
                    style={globalStyles.HorizontalScrollView}>
                        <View style={{ gap: 16 , display: 'flex' , flexDirection:'row' }}>
                        <Tab
                        title="Traite"
                        isActive={selectedType === 'Traite'}
                        onPress={() => setSelectedType('Traite')}
                        
                        />
                        <Tab
                            title="Virement"
                            isActive={selectedType === 'Virement'}
                            onPress={() => setSelectedType('Virement')}
                            />
                        <Tab
                            title="cheque"
                            isActive={selectedType === 'cheque'}
                            onPress={() => setSelectedType('cheque')}
                        />
                        <Tab
                            title="cash"
                            isActive={selectedType === 'cash'}
                            onPress={() => setSelectedType('cash')}
                        />
                        </View>
                        
                    </ScrollView>
                    

            </View>
            <Button title="Save" onPress={goToCongrats} disabled={false} />
        </View>
      
        </View>
        
     
 
        

      
    </SafeAreaView>
  );
};
export default RequestFinancement