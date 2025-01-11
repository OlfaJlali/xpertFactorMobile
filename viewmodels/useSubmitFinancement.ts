import { useState } from 'react';
import { Alert } from 'react-native';
import { FinancementRequest } from '../types/Financement';
import { useNavigation } from '@react-navigation/native';
import { DIContainer } from '../di/container';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
type RequestFinancementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RequestFinancement'>;

export const useSubmitFinancement = () => {
  const { user } = useGetCurrentUser();
  const navigation = useNavigation<RequestFinancementScreenNavigationProp>();   
  const [loading, setIsLoading] = useState(false);

  const submitRequestFinancement = async (
    data: FinancementRequest
  ) => {
    try {
      setIsLoading(true);

      const token = user?.token;
      if (!token) {
        Alert.alert('Error', 'Authentication token is missing');
        setIsLoading(false);
        return;
      }
      
      await DIContainer.requestFinancementUseCase.execute(data, token);
      navigation.navigate('Congratulations');
    } catch (error) {
      console.error('Error submitting financement request:', error);
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { submitRequestFinancement, loading };
};
