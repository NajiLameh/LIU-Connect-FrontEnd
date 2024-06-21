import { View, Text, FlatList, Pressable } from 'react-native';
import { useState } from 'react';
import ThemeColors from '../assets/theme/ThemeColors';

export default function HorizontalScrollableCategory({ data, filterResults }) {
  const [activeButton, setActiveButton] = useState(0);
  const filterResultsHandler = (id, title) => {
    setActiveButton(id);
    filterResults(title);
  };
  return (
    <FlatList
      data={data}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ columnGap: 3 }}
      renderItem={(itemData) => {
        return (
          <Pressable
            onPress={() =>
              filterResultsHandler(itemData.item.id, itemData.item.title)
            }
          >
            <View>
              <Text
                style={
                  activeButton === itemData.item.id
                    ? {
                        color: itemData.item.foregroundCol,
                        backgroundColor: itemData.item.backgroundCol,
                        borderWidth: 1,
                        borderColor: itemData.item.backgroundCol,
                        borderRadius: itemData.item.borderRad,
                        paddingHorizontal: itemData.item.paddingHor,
                        height: itemData.item.buttonHeight,
                        fontSize: itemData.item.textSize,
                        fontWeight: itemData.item.textWeight,
                      }
                    : {
                        color: ThemeColors.Secondary,
                        backgroundColor: ThemeColors.White,
                        borderWidth: 1,
                        borderColor: ThemeColors.Secondary,
                        borderRadius: itemData.item.borderRad,
                        paddingHorizontal: itemData.item.paddingHor,
                        height: itemData.item.buttonHeight,
                        fontSize: itemData.item.textSize,
                        fontWeight: itemData.item.textWeight,
                      }
                }
              >
                {itemData.item.title}
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
