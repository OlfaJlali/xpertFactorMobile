import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "../../utils/Icons"
import { COLOR_BLACK, COLOR_MAIN, H2_SIZE, H3_SIZE } from "../../styles/globalStyles";
import { Document } from "../../domain/entities/document";

interface DocumentContaierProps {
    item: Document,
    onPress:((item: Document) => void)
}
const DocumentContaier : React.FC<DocumentContaierProps> = ({item,onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.itemContainer}>
        <View style={styles.itemContent}>
        
          <Icon name='File' color={COLOR_MAIN} size={40}/>
          <View style={styles.textContent}>
            <View style={styles.textRow}>
              <Text style={styles.numberText}>{`${item.number}`}</Text>
              <Text style={styles.retenuText}>retenu: {`${item.retenu}`}</Text>
            </View>
            <Text style={styles.dateText}>{`${item.date.toString().slice(0,10)}`}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detailsText}>TTC: {`${item.ttc}`}</Text>
          <Text style={styles.detailsText}>OUVERT: {`${item.ouvert}`}</Text>
        </View>
      </TouchableOpacity>
    );

} 
export default DocumentContaier
const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      padding: 15,
    },
    itemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    textContent: {
      flex: 1,
      paddingLeft: 10
    },
    textRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    numberText: {
      color: COLOR_BLACK,
      fontSize: H2_SIZE,
      fontWeight: '500',
    },
    retenuText: {
      color: COLOR_BLACK,
      fontSize: H3_SIZE,
      fontWeight: '500',
    },
    dateText: {
      color: COLOR_BLACK,
      fontSize: H3_SIZE,
      fontWeight: '200',
      marginTop: 5,
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    detailsText: {
      color: COLOR_MAIN, 
      fontSize: H3_SIZE,
      fontWeight: '500',
    },
  });