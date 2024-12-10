import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,  } from 'react-native';
import { Button } from '../components/Button';
import { useShow } from '../context/ShowContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import { useTab } from '../context/TabContext';
const { height } = Dimensions.get('window');
type CongratulationsScreenProps = {
  onPress : () => void
  text: string
}
const CongratulationsScreen : React.FC<CongratulationsScreenProps> = ({onPress , text}) => {
  const { setShow } = useShow();  
  useEffect(()=> {
    setShow(false)
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.characterWrapper}>
        <Image
          source={require('../assets/men2.png')} 
          style={styles.characterImage}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>
           {text}
        </Text>
        <Button title="Done" onPress={onPress} disabled={false} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A3249', 
  },
  characterWrapper: {
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.1, 
    left: 0,
    right: 0,
    zIndex: 1, 
  },
  characterImage: {
    height: height / 2,
    resizeMode: 'contain',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.5, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    color: '#282534',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    maxWidth: '70%',
    lineHeight: 23,
  },
  button: {
    width: '80%',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default CongratulationsScreen;
