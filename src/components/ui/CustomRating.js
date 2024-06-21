// Rating.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Rating = ({ onRatingSelected }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onRatingSelected(rate);
  };

  return (
    <View style={styles.container}>
      {Array(5)
        .fill()
        .map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
            {/* <Icon
              name={index < rating ? 'star' : 'star-o'}
              size={30}
              color="#FFD700"
              style={styles.star}
            /> */}
            <Icon
              name={'star-o'}
              size={30}
              color="#FFD700"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
});

export default Rating;
