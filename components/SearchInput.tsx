import { View } from "react-native";
import Icon from "../utils/Icons";
import { TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const SearchInput = ({ searchQuery, onSearch }: any) => {
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%', 
        paddingHorizontal:20 ,
        paddingVertical:10 ,
        gap:20,
    }}>
      <Icon
        name="Search"
        size={30}
        color="#3E77BC"
      />
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        style={globalStyles.searchInput}
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchInput;
