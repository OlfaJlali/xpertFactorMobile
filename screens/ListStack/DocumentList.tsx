import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Animated } from 'react-native';
import { SearchList } from '../../components/SearchList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes'; 
import { useSearch } from '../../hooks/useSearch';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { Document } from '../../domain/entities/document';
import { useFetchDocuments } from '../../viewmodels/FetchDocumentViewModel';
import DocumentContaier from '../../containers/document/DocumentContainer';

const DocumentList = ({ route  }: any ) => {
  const { id, title } = route.params;
  // Correctly typed navigation prop
  type DocumentListNavigationProp = StackNavigationProp<RootStackParamList, 'LitigeDocument'>;
  const navigation = useNavigation<DocumentListNavigationProp>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1); 

  const slideAnim = useRef(new Animated.Value(50)).current; // Start off-screen (50px below)
  const { documents, pagination, fetchDocuments, loading, error } = useFetchDocuments();

  const handlePress = (document: Document) => {
    if(title === "Litige") {
      navigation.navigate('LitigeDate', { documentId: document.id });
    }else {
      navigation.navigate('ProrogationDate', { documentId: document.id });

    }
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setPage(1);
    }
  };


  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);
  const { filteredData } = useSearch<Document>(
    documents,
    ['number'],
    searchQuery,
    fetchDocuments,
    id,
  );
  useEffect(() => {
    fetchDocuments(1, '',id); 
  }, [searchQuery, fetchDocuments]);
  const handleLoadMore = () => {
    if (loading || pagination.currentPage >= pagination.totalPages) return;
    setPage(prevPage => prevPage + 1); 
    fetchDocuments(page + 1, searchQuery,id);
  };


  return (
    <SafeAreaView style={styles.container}>
    <Header padding={false} goBack={() => navigation.pop()} title={title} />
      <SearchList
      text='please select a document'
        data={filteredData}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onEndReached={handleLoadMore} 
        onEndReachedThreshold={0.25} 
        renderItem={({ item }) => (
          <Animated.View style={ { transform: [{ translateY: slideAnim }]}}>
              <DocumentContaier onPress={handlePress} item={item} />
          </Animated.View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 20,
  }});

export default DocumentList;
