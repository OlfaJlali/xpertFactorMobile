import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Input } from '../components/TextInput';
import { Button } from '../components/Button';
import { isValidEmail } from '../utils/validation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
// import Icon from 'react-native-vector-icons/FontAwesome';

const MyAccountScreen = () => {
    
  // Example states to hold user info
  const [name, setName] = useState('Jlali Olfa');
  const [email, setEmail] = useState('olfajlali@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+21652693684');
  const [Disabled ,setDisabled] = useState(false)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'MyAccount'>>();


  const handleSave = () => {
    console.log("Saved");
    navigation.navigate('Profile');
  };

  const isDisabled = () => {
    if(name == '' || email == '' || phoneNumber == '' || !isValidEmail(email)) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }
  useEffect(()=> {
    isDisabled()
  })

  return (
     <SafeAreaView style={styles.safeAreaContainer} >
    <View style={styles.container}>
      {/* Header */}
  

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
        source={require('../assets/profile.png')}
          style={styles.profileImage}
        />
       
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <Input  placeholder={name} value={name} onChangeText={setName} />
       
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <Input  placeholder={email} value={email} onChangeText={setEmail} keyboardType='email-address' />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <Input  placeholder={phoneNumber} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType='phone-pad' />
      </View>

      {/* Save Button */}
      <Button title={'Save'} onPress={handleSave} disabled={Disabled} />
      
      </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: '#fff',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue'
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 130,
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;
