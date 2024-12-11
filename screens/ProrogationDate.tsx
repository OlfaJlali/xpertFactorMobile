import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Tab } from '../components/Tab';
import DatePicker from 'react-native-date-picker';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';
import { Input } from '../components/TextInput';
type ProrogationDateNavigationProp = StackNavigationProp<RootStackParamList, 'ProrogationDate'>;

const ProrogationDate = ({ route }: any) => {
    console.log(route.params)
    const[selectedType, setSelectedType] = useState('Achat')
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenEchanceDate, setIsOpenEchanceDate] = useState(false);
    const [echanceDate, setEchanceDate] = useState(new Date());
    const [motif , setMotif] = useState('')

    const [ProrogationDate, setProrogationDate] = useState(new Date());
        const navigation = useNavigation<ProrogationDateNavigationProp>();   

    const goToCongrats = () => {    
        navigation.navigate('Congratulations'); // Navigate to the Bordoreaux screen
      };

  return (
    <SafeAreaView style={{    flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
        
    }}>
                     <Header goBack={() => navigation.pop()} title='Prorogation' />


       <View style={{paddingHorizontal: 20}}>
       <View>
                <Text style={[globalStyles.inputTitle]}>Prorogation Type</Text>
                    <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }} 
                    style={globalStyles.HorizontalScrollView}>
                        <View style={{ gap: 16 , display: 'flex' , flexDirection:'row' }}>
                        <Tab
                        title="Achat"
                        isActive={selectedType === 'Achat'}
                        onPress={() => setSelectedType('Achat')}
                        
                        />
                        <Tab
                            title="Sond"
                            isActive={selectedType === 'Sond'}
                            onPress={() => setSelectedType('Sond')}
                            />
                        <Tab
                            title="P Dir"
                            isActive={selectedType === 'P Dir'}
                            onPress={() => setSelectedType('P Dir')}
                        />
                        <Tab
                            title="Other"
                            isActive={selectedType === 'Other'}
                            onPress={() => setSelectedType('Other')}
                        />
                        </View>
                        
                    </ScrollView>
                    

        </View>
        <View>
        <Text style={[globalStyles.inputTitle, {paddingTop: 10}]}>Due date</Text>

        <TouchableOpacity onPress={() => setIsOpenDate(!isOpenDate)}>
                    <Text style={globalStyles.dateInput}>{`${ProrogationDate.getDate()}/${ProrogationDate.getMonth() + 1}/${ProrogationDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenDate}
                    date={ProrogationDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setProrogationDate(date);
                    setIsOpenDate(false);
                    }}
                    onCancel={() => setIsOpenDate(false)}
                    />
                </TouchableOpacity>
        </View>
        <View >
                <Text style={[globalStyles.inputTitle, {paddingTop: 10}]}>Prorogation Motif</Text>
                <Input  placeholder="Prorogation Motif" value={motif} onChangeText={setMotif} keyboardType='default' />
               
            </View>
            <View >
                <Text style={[globalStyles.inputTitle, {paddingTop: 20}]}>Prorogation Echance Date</Text>
                <TouchableOpacity onPress={() => setIsOpenEchanceDate(!isOpenEchanceDate)}>
                    <Text style={globalStyles.dateInput}>{`${echanceDate.getDate()}/${echanceDate.getMonth() + 1}/${echanceDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenEchanceDate}
                    date={echanceDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setEchanceDate(date);
                    setIsOpenEchanceDate(false);
                    }}
                    onCancel={() => setIsOpenEchanceDate(false)}
                    />
                </TouchableOpacity>
            </View>
            <Button title="Save" onPress={goToCongrats} disabled={false} />
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
