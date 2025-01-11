import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import Header from '../../components/Header';
import ResetPasswordForm from '../../containers/profile/ResetPassword/ResetPasswordForm';

const ResetPasswordScreen = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();


  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ paddingTop: 20 }}>
        <Header goBack={() => navigation.pop()} title="Reset Password" />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/login2.png')}
                style={{ width: width / 3, height: width * 0.5 }} 
              />
            </View>
            {/* reset password form */}
            <ResetPasswordForm  />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    gap: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ResetPasswordScreen;
