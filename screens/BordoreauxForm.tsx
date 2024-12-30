import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated } from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Progress from '../components/CompletedDocs';
import { DashboardScreenStyles } from '../styles/DashboardScreenStyles';
import DatePicker from 'react-native-date-picker';
import BordorauxDates from '../components/BordorauxDates';
import { Input } from '../components/TextInput';
import Counter from './counter';
import DocsAndAmountFom from '../components/DocsAndAmountFom';
import { globalStyles } from '../styles/globalStyles';
import Header from '../components/Header';
import DocumentScanner from 'react-native-document-scanner-plugin';

import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera, ImageLibraryOptions, MediaType } from 'react-native-image-picker';
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;
interface DocumentImages {
  uri: string;
}
import { Alert } from 'react-native';
import { useShow } from '../context/ShowContext';

type BordoreauxFormRouteProp = RouteProp<RootStackParamList, 'BordoreauxForm'>;
const { width } = Dimensions.get('window');

interface BordereauxFormProps {
  route: BordoreauxFormRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'BordoreauxForm'>;
}
const BordoreauxFormScreen: React.FC<BordereauxFormProps> = ({ route }) => {
  const { totalAmount, date, selectedYear, documentCount } = route.params;
  const [takingPics,setTakingPics] = useState(0)
  const [progress, setProgress] = useState(1);
  const [documentsData, setDocumentsData] = useState<any[]>([]);
  const [documentType, setDocumentType] = useState('Facture');
  const [paymentMode, setPaymentMode] = useState('Traite');
  const [documentRef, setDocumentRef] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [documentDate, setDocumentDate] = useState(new Date);
  const [amount, setAmount] = useState('');
const [selectedScanType, setSelectedScanType] = useState('');
const [scannedImages , setScannedImages] = useState<string[]>([])
  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BordoreauxForm'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const [scannedImage, setScannedImage] = useState<string | undefined>(undefined);

  const scanDocument = async () => {
    console.log('scanning...')
    // start the document scanner
    const { scannedImages, status } = await DocumentScanner.scanDocument({
      maxNumDocuments: 2
    });
    // get back an array with scanned image file paths
    if (scannedImages && scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        const total = takingPics + scannedImages.length
        setTakingPics(total)
        setScannedImage(scannedImages[0]);
        if (status === 'success' && scannedImages?.length) {
          if (validateScannedDocuments(scannedImages)) {
            navigation.navigate('Congratulations');
          }
        } else if (status === 'cancel') {
          Alert.alert('Scan Cancelled', 'Please complete the scanning process.');
        }

    }
   
  }
  const validateScannedDocuments = (scannedImages: string[]) => {
    const totalScanned = takingPics + scannedImages.length;
    console.log(totalScanned , 'totalScanned' ,documentCount , 'documentCount' )
    if (totalScanned < documentCount) {
      Alert.alert(
        'Incomplete Scanning',
        `You have scanned ${totalScanned} documents. Please scan ${documentCount - totalScanned} more.`,
        [{ text: 'Scan More', onPress: scanDocument }]
      );
      return false;
    }
  
    setTakingPics(totalScanned);
    return true;
  };
  



  const handleDocumentTypeChange = (type: string) => setDocumentType(type);
  const handlePaymentModeChange = (mode: string) => setPaymentMode(mode);
  const scrollViewRef = useRef<ScrollView>(null);
  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: documentCount, // Allow selecting multiple images up to the document count
    };
  
    launchImageLibrary(options, handleResponse);
  };
  
  const handleCameraLaunch = () => {
    if (takingPics >= documentCount) {
      Alert.alert(
        'Limit Reached',
        `You can only take up to ${documentCount} pictures.`
      );
      return;
    }
  
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled the camera.');
      } else if (response.errorMessage) {
        console.log('Camera error:', response.errorMessage);
      } else {
  
        setTakingPics((prevCount) => {
          const newImageCount = prevCount + 1; // Correctly increment the state
  
          console.log(`Picture taken! Current count: ${newImageCount}`);
  
          if (newImageCount < documentCount) {
            // Automatically reopen the camera if more pictures are needed
            handleCameraLaunch();
          } else {
            console.log('All pictures taken.');
            setTimeout(() => {
              navigation.navigate('Congratulations');
            }, 100); // Add a slight delay to avoid conflicts
        
          }
  
          return newImageCount; // Return the updated state
        });
  
  
      }
    });
  };
  
  
  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('Image picker error: ', response.errorMessage);
    } else {
      const selectedImages = response.assets || [response]; // Ensure assets array exists
      const imageUris = selectedImages.map((asset: any) => asset.uri); // Extract URIs
  
      const newImageCount = takingPics + imageUris.length;
  
      if (newImageCount <= documentCount) {
        setTakingPics(newImageCount); // Update taken/selected pictures count
        console.log('Images selected:', imageUris);
  
        if (newImageCount === documentCount) {
          console.log('All images captured or selected.');
          navigation.navigate('Congratulations'); // Proceed to next screen
        }
      } else {
        console.log(
          `Exceeded document count. Maximum allowed is ${documentCount}, but ${newImageCount} images were selected.`
        );
        Alert.alert('Error', `You can only select up to ${documentCount} images.`);
      }
    }
  };
  
  const openImagePickerOptions = () => {
    Alert.alert(
      'Choose an Option',
      'Select how you want to scan your documents',
      [
        {
          text: 'Camera',
          onPress: handleCameraLaunch, // Opens the camera
        },
        {
          text: 'Gallery',
          onPress: openImagePicker, // Opens the gallery
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  
  // Ensure to initialize the state properly
  
  const handleNext = () => {
    // Save the current document data
    const newDocument = {
      documentType,
      paymentMode,
      documentRef,
      dueDate,
      documentDate,
      amount,
    };


    // Update documents array
    setDocumentsData((prev) => [...prev, newDocument]);
    // Increment progress
    if (progress < documentCount) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      setProgress(progress + 1);
      setDocumentType('Facture');
      setPaymentMode('Traite');
      setDocumentRef('');
      setDueDate(new Date());
      setDocumentDate(new Date());
      setAmount('');
    } else {
      const allDocuments = [...documentsData, newDocument]; // Manually append the new document to the previous ones
    console.log('All documents:', allDocuments);
    // openImagePickerOptions()
    scanDocument()

    }
  };
  const {  setShow } = useShow();  


  return (
   <SafeAreaView style={styles.safeAreaContainer}>
    <ScrollView ref={scrollViewRef} 
     onScroll={() => setShow(false)}
     onMomentumScrollEnd={() => setShow(true)}
     scrollEventThrottle={16}

    showsVerticalScrollIndicator={false} 
    contentContainerStyle={styles.scrollViewContent}>
    {/* <View style={{paddingTop: 20}}>
      </View> */}
      <Header goBack={() => navigation.pop()} title='Bordereau' />

      <View style={styles.container}>


        <Progress documentCount={documentCount} progress={progress} />
<View style={{ backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    marginBottom:20}}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type of document</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}   >
          <View style={DashboardScreenStyles.tabContainer}>
            <TouchableOpacity
              style={[DashboardScreenStyles.tab, documentType === 'Facture' && DashboardScreenStyles.activeTab]}
              onPress={() => handleDocumentTypeChange('Facture')}
            >
              <Text style= {documentType === 'Facture' ?  DashboardScreenStyles.tabTextSelected : DashboardScreenStyles.tabText}>Facture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[DashboardScreenStyles.tab, documentType === 'Bon de commande' && DashboardScreenStyles.activeTab]}
              onPress={() => handleDocumentTypeChange('Bon de commande')}
            >
              <Text style={documentType === 'Bon de commande' ?  DashboardScreenStyles.tabTextSelected : DashboardScreenStyles.tabText}>Bon de commande</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[DashboardScreenStyles.tab, documentType === 'Marche' && DashboardScreenStyles.activeTab]}
              onPress={() => handleDocumentTypeChange('Marche')}
            >
              <Text style= {documentType === 'Marche' ?  DashboardScreenStyles.tabTextSelected : DashboardScreenStyles.tabText}>Marche</Text>
              </TouchableOpacity>
          </View>
          </ScrollView>
        
        </View>
      
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode of Payment</Text>
          <View style={DashboardScreenStyles.tabContainer}>
            <TouchableOpacity
              style={[DashboardScreenStyles.tab, paymentMode === 'Traite' && DashboardScreenStyles.activeTab]}
              onPress={() => handlePaymentModeChange('Traite')}
            >
              <Text style= {paymentMode === 'Traite' ?  DashboardScreenStyles.tabTextSelected : DashboardScreenStyles.tabText}>Traite</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={[DashboardScreenStyles.tab, paymentMode === 'Virement' && DashboardScreenStyles.activeTab]}
              onPress={() => handlePaymentModeChange('Virement')}
            >
              <Text style= {paymentMode === 'Virement' ?  DashboardScreenStyles.tabTextSelected : DashboardScreenStyles.tabText}>Virement</Text>
              </TouchableOpacity>
            <TouchableOpacity
              style={[DashboardScreenStyles.tab, paymentMode === 'Cheque' && DashboardScreenStyles.activeTab]}
              onPress={() => handlePaymentModeChange('Cheque')}
            >
              <Text style= {paymentMode === 'Cheque' ?  DashboardScreenStyles.tabTextSelected : DashboardScreenStyles.tabText}>Cheque</Text>
              </TouchableOpacity>
          </View>
        </View>
        </View>

        <DocsAndAmountFom 
          documentRef={documentRef}
          setDocumentRef={setDocumentRef}
          dueDate={dueDate}
          setDueDate={setDueDate}
          documentDate={documentDate}
          setDocumentDate={setDocumentDate}
          amount={amount}
          setAmount={setAmount}
        />
        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{progress < documentCount ? 'Next' : 'Scan documents'} </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 110,
  },
  plainCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  card: {
    width: width / 2.4,
    height: width / 2,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity:  0.19,
    shadowRadius: 5.62,
    elevation: 6
  },
  subtitleDark: {
    fontSize: 14,
    color: '#2E2E3A',
    fontWeight: 'bold'
  },

  YearTextDark: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#3E77BC',
  },
  DateTextDark: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#2E2E3A',
  },
  container: {
    backgroundColor: '#FFF' ,
    flex: 1,
    paddingHorizontal: 20
    // backgroundColor: '#F9F9F9',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },

  section: {
    // paddingTop:20,
    // marginBottom: 20,
    

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
  documentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  documentTypeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  paymentModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentModeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#3E77BC',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BordoreauxFormScreen;
