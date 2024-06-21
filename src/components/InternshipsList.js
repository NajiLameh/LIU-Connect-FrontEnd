import { View, FlatList, Text, Pressable } from 'react-native';
import { styles } from '../assets/Styles/InternshipStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function InternshipsList({
  internships,
  isAdmin,
  goToInternship,
  showAdminModal,
  refresh,
  onRefresh,
}) {
  return (
    <>
      {internships && internships.length > 0 ? (
        <FlatList
          data={internships}
          refreshing={refresh}
          onRefresh={onRefresh}
          renderItem={(itemData) => {
            return (
              <View style={styles.internshipContainer}>
                <Pressable
                  onLongPress={() =>
                    isAdmin ? showAdminModal(itemData.item) : null
                  }
                  style={({ pressed }) =>
                    pressed && isAdmin && styles.buttonPressed
                  }
                >
                  <View style={styles.internshipDatePostedContainer}>
                    <Text style={styles.internshipDatePosted}>
                      {itemData.item.datePosted}
                    </Text>
                  </View>
                  <View style={styles.internshipInfoContainer}>
                    <View style={styles.iconContainer}>
                      <FontAwesomeIcon icon="briefcase" size={32} />
                    </View>
                    <View style={styles.internshipInfo}>
                      <Text style={styles.internshipName}>
                        {itemData.item.name}
                      </Text>
                      <Text style={styles.internshipCompany}>
                        {itemData.item.company} ({itemData.item.type})
                      </Text>
                      <Text style={styles.internshipLocation}>
                        {itemData.item.location}
                      </Text>
                      <Text style={styles.internshipDetails}>
                        {itemData.item.paid} . {itemData.item.remote} .{' '}
                        {itemData.item.duration}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={() => goToInternship(itemData.item.internshipLink)}
                    style={({ pressed }) => pressed && styles.buttonPressed}
                  >
                    <View style={styles.buttonContentContainer}>
                      <Text style={styles.buttonText}>For more info</Text>
                      <FontAwesomeIcon
                        icon="arrow-right"
                        color={ThemeColors.GoogleBlue}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyResultTextContainer}>
          <Text>No Internships Found</Text>
        </View>
      )}
    </>
  );
}
