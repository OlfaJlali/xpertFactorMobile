import { Alert, StyleSheet, Text, View } from "react-native"
import { Input } from "../../../components/TextInput"
import { Button } from "../../../components/Button"
import { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { useGetCurrentUser } from "../../../hooks/useGetCurrentUser";
import { DIContainer } from "../../../di/container";
import { isValidEmail } from "../../../utils/validation";

const AccountInputContainer = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'MyAccount'>>();
    const {user } = useGetCurrentUser();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (user) {
          setName(user.name);
          setEmail(user.email );
          setPhoneNumber(user.phoneNumber);
        }
      }, [user]);
    

      const handleSave = async () => {
        try {
          setIsLoading(true); 
          const token = user?.token;
          if (!token) {
            Alert.alert('Error', 'Authentication token is missing');
            setIsLoading(false); 
            return;
          }
      
            await DIContainer.updateUserProfileUseCase.execute(
            { email, phoneNumber },
            token
          );
            navigation.navigate('Profile');
        } catch (error) {
          console.error('Error updating profile:', error);
          Alert.alert('Error', 'Failed to update profile. Please try again.');
        } finally {
          setIsLoading(false)
        }
      };
      
    
      useEffect(() => {
        setIsDisabled(
          !name || !email || !phoneNumber || phoneNumber.length < 12 || !isValidEmail(email)
        );
      }, [name, email, phoneNumber]);
        
      const phoneNumberChange = (text: string) => {
        if (!text.startsWith('+216')) {
          setPhoneNumber(`+216`);
        } else {
          setPhoneNumber(text);
        }
      }
    
  
    return (
        <View style={styles.container}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <Input  
                placeholder={'please enter your name'} 
                value={name} 
                onChangeText={()=>{}}
                isDisabled={true} 
            />
        </View>
  
        {/* Email Input */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Input  
                placeholder={'please enter your email'} 
                value={email} 
                onChangeText={setEmail} 
                keyboardType='email-address'
            />
        </View>
  
        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <Input  
                placeholder={'please enter your phone number'} 
                value={phoneNumber} 
                onChangeText={phoneNumberChange} 
                keyboardType='phone-pad' 
            />
        </View>
  
        {/* Save Button */}
        <Button 
            title={'Save'} 
            onPress={handleSave} 
            disabled={isDisabled} 
            loading={isLoading}
        />
        
        </View>
    )
}
export default AccountInputContainer

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 15,
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#000',
      },
    
})  