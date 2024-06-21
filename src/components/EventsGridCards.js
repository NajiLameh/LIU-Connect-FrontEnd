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
import { eventsImages } from '../../dummy data/Events/EventsImages';
import ThemeColors from '../assets/theme/ThemeColors';

import CustomCategoryItem from './ui/CustomCategoryItem';

export default function EventsGridCards({
  events,
  headerComponent,
  emptylistText,
  numCol,
  spacing,
  viewEventsDetails,
  isAdmin,
  showAdminModal,
  refresh,
  onRefresh,
}) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - spacing * (numCol + 1)) / numCol;

  // Temporary
  const getData = (eventDateAndTime) => {
    const data = [
      {
        title: eventDateAndTime,
        foregroundCol: ThemeColors.White,
        backgroundCol: ThemeColors.GoogleBlue,
        borderRad: 5,
        paddingHor: 5,
        buttonHeight: 'auto',
        textSize: 11,
        textWeight: '500',
      },
    ];
    return data;
  };
  const getImage = (ID) => {
    let image = require('../assets/images/placeHolder.jpg');
    for (i = 0; i < eventsImages.length; i++) {
      if (ID === eventsImages[i].id) {
        image = eventsImages[i].image;
      }
    }
    return image;
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
      data={events}
      ListHeaderComponent={headerComponent}
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
              onPress={() => viewEventsDetails(itemData.item)}
              onLongPress={() =>
                isAdmin ? showAdminModal(itemData.item) : null
              }
            >
              <Image source={getImage(itemData.item.ID)} style={styles.image} />
            </Pressable>
            <View style={styles.category}>
              <CustomCategoryItem
                data={getData(itemData.item.date + ' | ' + itemData.item.time)}
              />
            </View>
            <View style={styles.locationContainer}>
              <View style={{}}>
                <FontAwesomeIcon
                  icon="location-dot"
                  color={ThemeColors.GoogleYellow}
                  size={10}
                />
              </View>
              <Text style={styles.locationText}>{itemData.item.location}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{itemData.item.name}</Text>
            </View>
            <View style={styles.campusContainer}>
              <Text style={styles.campus}>{itemData.item.campus}</Text>
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
  locationContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  locationText: {
    flex: 1,
    fontSize: 11,
    color: ThemeColors.Primary,
    paddingStart: 2,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
  campusContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: ThemeColors.GoogleBlue,
  },
  campus: {
    fontWeight: '500',
    color: ThemeColors.White,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
