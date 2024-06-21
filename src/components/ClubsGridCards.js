import {
  FlatList,
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ClubsCategoryList } from '../util/ClubsCategoryList';
import { clubImages } from '../../dummy data/Clubs/ClubsImages';
import ThemeColors from '../assets/theme/ThemeColors';

import CustomCategoryItem from './ui/CustomCategoryItem';
import PillButton from './ui/PillButton';

export default function ClubsGridCards({
  clubs,
  numCol,
  spacing,
  viewClubDetails,
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
    for (i = 0; i < clubImages.length; i++) {
      if (ID === clubImages[i].id) {
        image = clubImages[i].image;
      }
    }
    return image;
  };

  const getDepartmentData = (department) => {
    const departmentData = ClubsCategoryList.filter(
      (item) => item.title === department
    );
    return departmentData;
  };
  // Temporary

  const emptylistComponent = () => {
    return (
      <View style={styles.emptyListTextContainer}>
        <Text style={styles.emptyListText}>No Clubs Found</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={clubs}
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
              {
                width: itemWidth,
                marginLeft: spacing,
                marginBottom: spacing,
              },
            ]}
          >
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.buttonPressed, styles.imageContainer]
                  : styles.imageContainer
              }
              onPress={() => viewClubDetails(itemData.item)}
              onLongPress={() =>
                isAdmin ? showAdminModal(itemData.item) : null
              }
            >
              <Image source={getImage(itemData.item.ID)} style={styles.image} />
            </Pressable>
            <View style={styles.category}>
              <CustomCategoryItem
                data={getDepartmentData(itemData.item.department)}
              />
            </View>
            <View style={styles.campusAndRatingContainer}>
              <Text
                style={[
                  styles.campus,
                  { color: getThemeColor(itemData.item.department) },
                ]}
              >
                {itemData.item.campus}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{itemData.item.rating}</Text>
                <FontAwesomeIcon
                  icon="star"
                  color={ThemeColors.GoogleYellow}
                  size={18}
                />
              </View>
            </View>

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
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.White_Smoke,
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
  campusAndRatingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  campus: {
    fontSize: 18,
    fontWeight: '700',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: ThemeColors.Primary,
    paddingRight: 1,
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
