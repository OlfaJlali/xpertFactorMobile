import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { Tab } from '../components/Tab';
import DatePicker from 'react-native-date-picker';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
type LitigeDateNavigationProp = StackNavigationProp<RootStackParamList, 'LitigeDate'>;

const LitigeDate = ({ route }: any) => {
    console.log(route.params)
    const[selectedType, setSelectedType] = useState('Achat')
    const [isOpenDate, setIsOpenDate] = useState(false);
    const [isOpenEchanceDate, setIsOpenEchanceDate] = useState(false);
    const [echanceDate, setEchanceDate] = useState(new Date());

    const [litigeDate, setLitigeDate] = useState(new Date());
        const navigation = useNavigation<LitigeDateNavigationProp>();   

    const goToCongrats = () => {    
        navigation.navigate('Congratulations'); // Navigate to the Bordoreaux screen
      };

  return (
    <SafeAreaView style={{    flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
        
    }}>
                  <Text style={globalStyles.PageTitle}>Litige</Text>

       <View style={{paddingHorizontal: 20}}>
       <View>
                <Text style={[globalStyles.inputTitle]}>Litige Type</Text>
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
        <View >
                <Text style={globalStyles.inputTitle}>Litige Date</Text>
                <TouchableOpacity onPress={() => setIsOpenDate(!isOpenDate)}>
                    <Text style={globalStyles.dateInput}>{`${litigeDate.getDate()}/${litigeDate.getMonth() + 1}/${litigeDate.getFullYear()}`}</Text>
                    <DatePicker
                    modal
                    open={isOpenDate}
                    date={litigeDate}
                    mode="date"
                    onConfirm={(date: Date) => {
                    setLitigeDate(date);
                    setIsOpenDate(false);
                    }}
                    onCancel={() => setIsOpenDate(false)}
                    />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={globalStyles.inputTitle}>Litige Echance Date</Text>
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

export default LitigeDate;
