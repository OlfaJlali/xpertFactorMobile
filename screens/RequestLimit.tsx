import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { Tab } from '../components/Tab';
import { globalStyles } from '../styles/globalStyles';
import { Input } from '../components/TextInput';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components/Button';
import Header from '../components/Header';
type RequestLimitScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LimitForm'>;
const {height} = Dimensions.get('window')
const RequestLimit = () => {
    const navigation = useNavigation<RequestLimitScreenNavigationProp>();   
    const [selectedTab ,setSelectedTab] = useState('Financement') ;
    const [selectedType ,setSelectedType] = useState('Traite') ;
    const [limit, setLimit] = useState('') ;
    const [financementlimit,setFinancementlimit] = useState('') ;
    const [isOpenRequestDate, setIsOpenRequestDate] = useState(false);
    const [requestDate, setRequestDate] = useState(new Date());
    const [limitDate, setLimitDate] = useState(new Date());
    const [lastRequetDate, setLastRequestDate] = useState(new Date());
    const [isOpenLastRequestDate, setIsOpenLastRequestDate] = useState(false);
    const [isOpenlimitDate, setIsOpenlimitDate] = useState(false);
    const [delaiDemande , setDelaidemande] = useState('')
    const goToCongrats = () => {    
        navigation.navigate('Congratulations'); 
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

        <View >
                <Text style={globalStyles.inputTitle}>Request Date</Text>
                <TouchableOpacity onPress={() => setIsOpenRequestDate(!isOpenRequestDate)}>
                    <Text style={globalStyles.dateInput}>{`${requestDate.getDate()}/${requestDate.getMonth() + 1}/${requestDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenRequestDate}
                    date={requestDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setRequestDate(date);
                    setIsOpenRequestDate(false);
                    }}
                    onCancel={() => setIsOpenRequestDate(false)}
                    />
                </TouchableOpacity>
        </View>
        <View style={{gap: 10 , paddingBottom: height / 6}}>
            <View >
                <Text style={globalStyles.inputTitle}>Assurence Limit</Text>
                <Input placeholder="please enter Limit" value={limit} onChangeText={setLimit} keyboardType="numeric" />
            </View >
            <View >
                <Text style={globalStyles.inputTitle}>Financement Limit</Text>
                <Input placeholder="please enter Limit" value={financementlimit} onChangeText={setFinancementlimit} keyboardType="numeric" />
            </View >
            <View >
                <Text style={globalStyles.inputTitle}>Limit Date</Text>
                <TouchableOpacity onPress={() => setIsOpenlimitDate(!isOpenlimitDate)}>
                    <Text style={globalStyles.dateInput}>{`${limitDate.getDate()}/${limitDate.getMonth() + 1}/${limitDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenlimitDate}
                    date={limitDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setLimitDate(date);
                    setIsOpenlimitDate(false);
                    }}
                    onCancel={() => setIsOpenlimitDate(false)}
                    />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={globalStyles.inputTitle}>Last Request Date</Text>
                <TouchableOpacity onPress={() => setIsOpenLastRequestDate(!isOpenLastRequestDate)}>
                    <Text style={globalStyles.dateInput}>{`${lastRequetDate.getDate()}/${lastRequetDate.getMonth() + 1}/${lastRequetDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenLastRequestDate}
                    date={lastRequetDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setLastRequestDate(date);
                    setIsOpenLastRequestDate(false);
                    }}
                    onCancel={() => setIsOpenLastRequestDate(false)}
                    />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={globalStyles.inputTitle}>Requested delay</Text>
                <Input placeholder="please enter delay" value={delaiDemande} onChangeText={setDelaidemande} keyboardType="numeric" />
            </View >
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
        </ScrollView>
    </SafeAreaView>
  );
};
export default RequestLimit