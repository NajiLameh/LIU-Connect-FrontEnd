import { View, Text } from 'react-native';

export default function CustomCategoryItem({ data }) {
  return (
    <View>
      <Text
        style={{
          color: data[0].foregroundCol,
          backgroundColor: data[0].backgroundCol,
          borderWidth: 1,
          borderColor: data[0].backgroundCol,
          borderRadius: data[0].borderRad,
          paddingHorizontal: data[0].paddingHor,
          height: data[0].buttonHeight,
          fontSize: data[0].textSize,
          fontWeight: data[0].textWeight,
        }}
      >
        {data[0].title}
      </Text>
    </View>
  );
}
