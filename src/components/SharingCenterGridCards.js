import {
  FlatList,
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { SharingCenterCategoryList } from '../util/SharingCenterCategoryList';
import { SharingCenterImages } from '../../dummy data/SharingCenter/SharingCenterImages';

import CustomPriceText from './ui/CustomPriceText';
import CustomCategoryItem from './ui/CustomCategoryItem';
import ThemeColors from '../assets/theme/ThemeColors';

export default function SharingCenterGridCards({
  products,
  emptylistText,
  numCol,
  spacing,
  viewProductDetails,
  isAdmin,
  showAdminModal,
  getThemeColor,
  refresh,
  onRefresh,
}) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - spacing * (numCol + 1)) / numCol;

  // Temporary
  const getImage = (ID) => {
    let image = require('../assets/images/placeHolder.jpg');
    for (i = 0; i < SharingCenterImages.length; i++) {
      if (ID === SharingCenterImages[i].id) {
        image = SharingCenterImages[i].image;
      }
    }
    return image;
  };

  const getCategoryData = (category) => {
    const categoryData = SharingCenterCategoryList.filter(
      (item) => item.title === category
    );
    return categoryData;
  };
  // Temporary
  const emptylistComponent = () => {
    return (
      <View style={styles.emptyListTextContainer}>
        <Text style={styles.emptyListText}>{emptylistText}</Text>
      </View>
    );
  };
  return (
    <FlatList
      data={products}
      ListEmptyComponent={emptylistComponent}
      numColumns={numCol}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshing={refresh}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.ID.toString()}
      renderItem={(itemData) => {
        return (
          <View
            style={[
              styles.cardContainer,
              { width: itemWidth, marginLeft: spacing, marginBottom: spacing },
            ]}
          >
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.buttonPressed, styles.imageContainer]
                  : styles.imageContainer
              }
              onPress={() => viewProductDetails(itemData.item)}
              onLongPress={() =>
                isAdmin ? showAdminModal(itemData.item) : null
              }
            >
              <Image source={getImage(itemData.item.ID)} style={styles.image} />
            </Pressable>
            <View style={styles.category}>
              <CustomCategoryItem
                data={getCategoryData(itemData.item.category)}
              />
            </View>
            <CustomPriceText
              price={itemData.item.price}
              textSize={20}
              textColor={getThemeColor(itemData.item.category)}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{itemData.item.name}</Text>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  emptyListTextContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    alignItems: 'space-between',
  },
  cardContainer: {
    borderRadius: 5,
    backgroundColor: ThemeColors.White,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  category: {
    position: 'absolute',
    top: 5,
    right: 5,
    opacity: 0.8,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 5,
    marginHorizontal: 5,
  },
  name: {
    fontSize: 14,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
