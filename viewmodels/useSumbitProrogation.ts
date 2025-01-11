import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DIContainer } from '../di/container';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { Prorogation } from '../types/Prorogation';
type RequestProrogationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProrogationDate'>;

export const useSubmitProrogation = () => {
  const { user } = useGetCurrentUser();
  const navigation = useNavigation<RequestProrogationScreenNavigationProp>();   
  const [loading, setIsLoading] = useState(false);

  const submitProrogation = async (
    data: Prorogation
  ) => {
    try {
      setIsLoading(true);

      const token = user?.token;
      if (!token) {
        Alert.alert('Error', 'Authentication token is missing');
        setIsLoading(false);
        return;
      }
      
      await DIContainer.requestProrogationUseCase.execute(data, token);
      navigation.navigate('Congratulations');
    } catch (error) {
      console.error('Error submitting financement request:', error);
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { submitProrogation, loading };
};
