import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, Animated } from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import Progress from '../components/CompletedDocs';
import DocsAndAmountFom from '../components/DocsAndAmountFom';
import Header from '../components/Header';
import DocumentScanner from 'react-native-document-scanner-plugin';
import mime from "mime";
import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera, ImageLibraryOptions, MediaType } from 'react-native-image-picker';
import { Alert } from 'react-native';
import { useShow } from '../context/ShowContext';
import TypeSelector from '../containers/Financement/TypeSelector';
import { Button } from '../components/Button';
import axios from 'axios';

type BordoreauxFormRouteProp = RouteProp<RootStackParamList, 'BordoreauxForm'>;

interface BordereauxFormProps {
  route: BordoreauxFormRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'BordoreauxForm'>;
}
const BordoreauxFormScreen: React.FC<BordereauxFormProps> = ({ route }) => {
  const { totalAmount, date, selectedYear, documentCount } = route.params;
  const parsedDate = new Date(date); 

  const [progress, setProgress] = useState(1);
  const [documentsData, setDocumentsData] = useState<any[]>([]);
  const [documentType, setDocumentType] = useState('Facture');
  const [paymentMode, setPaymentMode] = useState('Traite');
  const [documentRef, setDocumentRef] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [documentDate, setDocumentDate] = useState(new Date);
  const [amount, setAmount] = useState<number | null>(null);
  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BordoreauxForm'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const [disabled,setDisabled]= useState(false)
  const [maxDocuments,setMaxDocuments] = useState(documentCount);
  const [scannedDocs , setScannedDocs] = useState<string[]>([])
  const scanDocument = async () => {
    console.log('scanning...');
    console.log(maxDocuments , 'first')
    // start the document scanner
    const { scannedImages, status } = await DocumentScanner.scanDocument({
      maxNumDocuments: maxDocuments
      
    });
    // get back an array with scanned image file paths
    if (scannedImages) {
        // set the img src, so we can view the first scanned image
        setScannedDocs((prevDocs) => [...prevDocs, ...scannedImages]);
        const total = maxDocuments - scannedDocs.length
        setMaxDocuments(total)
        if (status === 'success' && scannedDocs?.length) {
          if (validateScannedDocuments(scannedDocs)) {
            navigation.navigate('Congratulations');
          }
        } else if (status === 'cancel') {
          Alert.alert('Scan Cancelled', 'Please complete the scanning process.');
        }

    }
   
  }
  const validateScannedDocuments = (scannedDocs: string[] | never[] | undefined) => {
    const totalScanned = scannedDocs ? scannedDocs.length : 0
    console.log(maxDocuments , 'maxDocuments' ,documentCount , 'documentCount' )
    if (totalScanned < maxDocuments) {
      Alert.alert(
        'Incomplete Scanning',
        `You have scanned ${totalScanned} documents. Please scan ${maxDocuments - totalScanned} more.`,
        [{ text: 'Scan More', onPress: scanDocument }]
      );
      return false;
    }
    const stillTogo = maxDocuments - totalScanned
    setMaxDocuments(stillTogo);
    return true;
  };
  const scrollViewRef = useRef<ScrollView>(null);

 
  
  useEffect(() => {
    if (amount === null || documentRef.length < 6 || amount < 100) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [amount, documentRef]);


  
  // Ensure to initialize the state properly
  
  const handleNext = async () => {
    const newDocument = {
      documentType,
      paymentMode,
      reference: documentRef,
      dueDate,
      documentDate,
      amount,
    };
  
    setDocumentsData((prev) => [...prev, newDocument]);
  
    if (progress < documentCount) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      setProgress(progress + 1);
      setDocumentType('Facture');
      setPaymentMode('Traite');
      setDocumentRef('');
      setDueDate(new Date());
      setDocumentDate(new Date());
      setAmount(null);
    } else {
      const allDocuments = [...documentsData, newDocument];
      console.log('All documents:', allDocuments);
  
      // Start document scanning
      const { scannedImages, status } = await scanDocuments(documentCount);
  
      if (status === 'success' && scannedImages && validateScannedDocuments(scannedImages)) {
        const documentsWithScans = allDocuments.map((doc, index) => ({
          ...doc,
          scannedImage: scannedImages[index] || '', // Attach scanned image paths
        }));
        uploadBordereau(documentsWithScans);
      } else if (status === 'cancel') {
        Alert.alert('Scan Cancelled', 'Please complete the scanning process.');
      }
    }
  };
  
  const scanDocuments = async (maxDocs: number) => {
    try {
      console.log('Starting document scanning...');
      const { scannedImages, status } = await DocumentScanner.scanDocument({
        maxNumDocuments: maxDocs,
      });
  
      if (status === 'success' && scannedImages) {
        // Ensure scannedImages is defined before updating state
        setScannedDocs((prevDocs) => [...prevDocs, ...scannedImages]);
        return { scannedImages, status };
      } else if (status === 'cancel') {
        Alert.alert('Scan Cancelled', 'Please complete the scanning process.');
        return { scannedImages: [], status: 'cancel' };
      }
  
      return { scannedImages: [], status: 'error' };
    } catch (error) {
      console.error('Error during document scanning:', error);
      Alert.alert('Scanning Error', 'Something went wrong during scanning.');
      return { scannedImages: [], status: 'error' };
    }
  };
    
  const uploadBordereau = async (documents: any[]) => {
    console.log('Documents passed to uploadBordereau:', documents);
    try {
      const formData = new FormData();
  
      // Append bordereau details
      formData.append('bordereauAmount', totalAmount.toString());
      formData.append('bordereauYear', selectedYear.toString());
      formData.append('bordereauDate', parsedDate.toISOString());
  
      documents.forEach((doc, index) => {
        const newImageUri = "file:///" + doc.scannedImage.split("file:/").join("");
        console.log('New Image URI:', newImageUri);
        // Append each document's metadata
        formData.append(`docs[${index}][docType]`, doc.documentType);
        formData.append(`docs[${index}][paymentMode]`, doc.paymentMode);
        formData.append(`docs[${index}][reference]`, doc.reference);
        formData.append(`docs[${index}][dueDate]`, doc.dueDate );
        formData.append(`docs[${index}][docDate]`, doc.documentDate );
                formData.append(`docs[${index}][amount]`, doc.amount.toString());
  
        // Append the scanned image file
        formData.append(
          `docs[${index}][scannedImage]`,
          {
            uri: newImageUri,
            type: mime.getType(newImageUri) || 'image/jpeg',
            name: newImageUri.split('/').pop(),
          }
        );
      });
  
      console.log('Payload to be sent:', formData);
  
      const response = await axios.post('https://shamash.onrender.com/api/add-bordereau', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('API Response:', response.data);
      Alert.alert('Success', 'Bordereau created successfully!');
      navigation.navigate('Congratulations');
    } catch (error) {
      console.error('Error uploading bordereau:', error);
      Alert.alert('Error', 'Failed to create bordereau. Please try again.');
    }
  };
  
  
  const {  setShow } = useShow();  
  const typeOfDocTabs = [
    { title: 'Facture', key: 'Facture' },
    { title: 'Bon de commande', key: 'Bon de commande' },
    { title: 'Marche', key: 'Marche' },
  ];
  const modeOfPayment = [
    { title: 'Traite', key: 'Traite' },
    { title: 'Virement', key: 'Virement' },
    { title: 'Cheque', key: 'Cheque' },
  ];



  return (
   <SafeAreaView style={styles.safeAreaContainer}>
    <ScrollView 
      ref={scrollViewRef} 
      onScroll={() => setShow(false)}
      onMomentumScrollEnd={() => setShow(true)}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.scrollViewContent}
      >
      <Header goBack={() => navigation.pop()} title='Bordereau' />

      <View style={styles.container}>
        <Progress documentCount={documentCount} progress={progress} />

        <View style={styles.typeAndMode}>
          <Text style={styles.sectionTitle}>Type of document</Text>
          <TypeSelector tabs={typeOfDocTabs} selectedTab={documentType} onSelectTab={setDocumentType} centred />
          <Text style={styles.sectionTitle}>Mode of Payment</Text>
          <TypeSelector tabs={modeOfPayment} selectedTab={paymentMode} onSelectTab={setPaymentMode} centred />
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
  
        <Button title={progress < documentCount ? 'Next' : 'Scan documents'} onPress={handleNext} disabled={disabled} />
      </View>
      </ScrollView>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  typeAndMode:{
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    marginBottom:20
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 110,
  },
  container: {
    backgroundColor: '#FFF' ,
    flex: 1,
    paddingHorizontal: 20
    // backgroundColor: '#F9F9F9',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
});

export default BordoreauxFormScreen;
