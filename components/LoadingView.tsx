import { ActivityIndicator, Text, View } from "react-native"
import { COLOR_MAIN } from "../styles/globalStyles"


const LoadingView : React.FC = () => {
    return <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5'
    }}
  >
    <ActivityIndicator
      size="large" 
      color={COLOR_MAIN} 
    />
    <Text
      style={{
        marginTop: 16,
        color: COLOR_MAIN,
        fontSize: 16,
        fontWeight: '500'
      }}
    >
      Loading...
    </Text>
  </View>

} 
export default LoadingView