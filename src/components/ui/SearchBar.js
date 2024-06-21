import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function SearchBar({
  placeHol,
  value,
  setValue,
  filterResults,
}) {
  const filterSearchHandler = (value) => {
    setValue(value);
    filterResults(value);
  };
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon="magnifying-glass" color="black" size={16} />
      <TextInput
        placeholder={placeHol}
        placeholderTextColor="#8B8B8B"
        value={value}
        onChangeText={filterSearchHandler}
        cursorColor="#4285F4"
        selectionColor="#4285F4"
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    width: '100%',
    minWidth: 200,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#8B8B8B',
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  searchInput: {
    fontSize: 16,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
});
