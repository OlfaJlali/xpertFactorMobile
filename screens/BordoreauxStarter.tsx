import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const BordoreauxStarter = () => {
    const navigation = useNavigation<VerifyScreenNavigationProp>();
    const goToBordoreaux = () => {
        navigation.navigate('Bordoreaux');
      };
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../assets/men3.png')}
          style={styles.illustration}
        />
      </View>

      {/* Content */}
      <Text style={styles.title}>Start managing your bordoreaux and stay up to date.</Text>
      <View style={styles.item}>
        {/* <Icon name="zap" size={18} color="#FFC107" style={styles.icon} /> */}
        <Text style={styles.description}>
          choose and the desired amount, number of documents date and year
        </Text>
      </View>
      <View style={styles.item}>
        {/* <Icon name="zap" size={18} color="#FFC107" style={styles.icon} /> */}
        <Text style={styles.description}>
          Set every document infos and scan the document
        </Text>
      </View> 
      <Button title={'got it'} onPress={goToBordoreaux} disabled={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap:20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 20,
    
  },
  illustration: {
    width: 250,
    height: 250,
    borderRadius: 250,
    backgroundColor: 'rgba(62, 119, 188, 1)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
});

export default BordoreauxStarter;
