import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const { height } = Dimensions.get('window');
type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const BottomSheet: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(height * 0.15)).current;
  const navigation = useNavigation<SignInScreenNavigationProp>(); // Use typed navigation

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animatedHeight, {
      toValue: expanded ? height * 0.15 : height * 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const goToBordoreaux = () => {
    navigation.navigate('Bordoreaux'); // Navigate to the Bordoreaux screen
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  const goToDashboard = () => {
    navigation.navigate('Dashboard');
  }

  return (
    <Animated.View style={[styles.bottomSheet, { height: animatedHeight }]}>

      {/* Large Button Positioned Higher */}

      {/* Row of Smaller Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={goToBordoreaux}>
          <Text style={styles.buttonText}>Bourderaux</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={goToProfile}>
          <Text style={styles.buttonText}>Accounts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleExpand}>
        <Text style={styles.buttonText}>Main</Text>
      </TouchableOpacity>


        {/* Spacer for extra space between Accounts and Cards */}

        <TouchableOpacity style={styles.button} onPress={goToDashboard} >
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

        

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Litige</Text>
        </TouchableOpacity>
      </View>

      {/* Hidden buttons, shown when expanded */}
      {expanded && (
        <View style={styles.expandedContent}>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Option 2</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
  },
  largeButton: {
    position: 'absolute', // Position large button separately from button row
    top: -20, // Move the large button above the bottom sheet
    left: Dimensions.get('window').width / 2 - 45, // Horizontally center the large button
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 45,
    elevation: 8, // Stronger shadow for floating effect
    shadowColor: '#007BFF',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    zIndex: 10, // Make sure the large button appears above everything
  },
  largeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Even spacing between buttons
    alignItems: 'center', // Center align vertically
    paddingVertical: 20,
    gap:5,
    borderRadius:35,
    shadowColor:'#000',
    shadowOffset:{width:0,height:10},
    shadowRadius:10,
    shadowOpacity:0.1
  },
  button: {
    // width: 60,
    // height: 60,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:5
    // backgroundColor: '#f7f7f7',
    // borderRadius: 30,
    // elevation: 3, // for shadow on Android
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  expandedContent: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  smallButton: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  smallButtonText: {
    fontSize: 16,
    color: '#333',
  },
  spacer: {
    width: 30, // Adjust this value to increase or decrease the space
  },
});

export default BottomSheet;
