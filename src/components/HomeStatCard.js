import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ThemeColors from '../assets/theme/ThemeColors';

export default function HomeStatCard({ data }) {
  return (
    <View style={styles.card}>
      <View style={styles.section}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{data.usersCount}</Text>
          <FontAwesomeIcon icon="user" color={ThemeColors.White} size={10} />
        </View>
        <Text style={styles.text}>Members</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{data.clubsCount}</Text>
          <FontAwesomeIcon icon="users" color={ThemeColors.White} size={11} />
        </View>
        <Text style={styles.text}>Clubs</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{data.eventsCount}</Text>
          <FontAwesomeIcon
            icon="calendar-check"
            color={ThemeColors.White}
            size={11}
          />
        </View>
        <Text style={styles.text}>Events</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{data.itemsCount}</Text>
          <FontAwesomeIcon icon="box" color={ThemeColors.White} size={11} />
        </View>
        <Text style={styles.text}>Products</Text>
      </View>
      <View style={styles.section}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{data.internshipsCount}</Text>
          <FontAwesomeIcon
            icon="briefcase"
            color={ThemeColors.White}
            size={11}
          />
        </View>
        <Text style={styles.text}>Internships</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingVertical: 20,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    paddingRight: 2,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: 'white',
  },
});
