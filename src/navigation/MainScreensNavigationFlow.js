import { View, Pressable, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RemoveLoginStorage } from '../asyncStorage/RemoveLoginStorage';
import { useContext } from 'react';
import AuthContext from '../util/AuthContext';
import CustomHeaderBackArrow from '../components/ui/CustomHeaderBackArrow';

import BottomTabsNavigationFlow from './BottomTabsNavigationFlow';
import ProfileScreen from '../screens/profile/Profile';
import ViewProfilePicture from '../screens/profile/ViewProfilePicture';
import ManageUsersScreen from '../screens/profile/ManageUsers';
import AddNewUserScreen from '../screens/profile/AddNewUser';
import ConfirmClubAdminDeletionScreen from '../screens/profile/ConfirmClubAdminDeletion';
import ClubPageNavigationFlow from './ClubPageNavigationFlow';
import AddNewClubScreen from '../screens/clubs/AddNewClub';
import EditClubScreen from '../screens/clubs/EditClub';
import AddNewEventScreen from '../screens/events/AddNewEvent';
import EditEventScreen from '../screens/events/EditEvent';
import ViewEventScreen from '../screens/events/ViewEvent';
import ViewPostScreen from '../screens/sharingCenter/ViewPost';
import ViewPostedItemsScreen from '../screens/sharingCenter/ViewPostedItems';
import PostNewItemScreen from '../screens/sharingCenter/PostNewItem';
import EditItemScreen from '../screens/sharingCenter/EditItem';
import DecoratedTitle from '../components/ui/DecoratedTitle';
import ThemeColors from '../assets/theme/ThemeColors';
import AddNewInternshipScreen from '../screens/internships/AddNewInternship';
import EditInternshipScreen from '../screens/internships/EditInternship';

const MainScreensFlow = createNativeStackNavigator();

export default function MainScreensNavigationFlow() {
  const { logoutHandler } = useContext(AuthContext);

  const appLogoutHandler = async () => {
    await RemoveLoginStorage();
    logoutHandler();
  };
  return (
    <MainScreensFlow.Navigator initialRouteName="MainScreens">
      <MainScreensFlow.Screen
        name="MainScreens"
        component={BottomTabsNavigationFlow}
        options={({ navigation }) => ({
          headerRight: () => (
            <View>
              <Pressable onPress={() => navigation.navigate('Profile')}>
                <FontAwesomeIcon
                  icon="circle-user"
                  color={ThemeColors.Secondary}
                  size={30}
                />
              </Pressable>
            </View>
          ),
          headerTitle: () => (
            <DecoratedTitle
              textWithFirstColor="LIU"
              textWithSecondColor="Connect"
              textSize={22}
              firstColor={ThemeColors.GoogleBlue}
              secondColor={ThemeColors.GoogleYellow}
              isUnderlined={false}
            />
          ),
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        })}
      />
      <MainScreensFlow.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerRight: () => (
            <Pressable onPress={appLogoutHandler}>
              <View style={styles.logoutContainer}>
                <Text style={styles.logoutText}>Log out</Text>
                <FontAwesomeIcon
                  icon="right-from-bracket"
                  color={ThemeColors.Primary}
                  size={24}
                />
              </View>
            </Pressable>
          ),
        })}
      />
      <MainScreensFlow.Screen
        name="ViewProfilePicture"
        component={ViewProfilePicture}
        options={({ navigation }) => ({
          headerLeft: () => (
            <CustomHeaderBackArrow
              navigation={navigation}
              color={ThemeColors.White}
            />
          ),
          headerTitle: 'Profile Picture',
          headerStyle: {
            backgroundColor: ThemeColors.Primary,
          },
          headerTintColor: ThemeColors.White,
        })}
      />
      <MainScreensFlow.Screen
        name="ManageUsers"
        component={ManageUsersScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <View>
              <Pressable onPress={() => navigation.navigate('AddNewUser')}>
                <FontAwesomeIcon
                  icon="user-plus"
                  color={ThemeColors.Primary}
                  size={24}
                />
              </Pressable>
            </View>
          ),
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Manage Users',
        })}
      />
      <MainScreensFlow.Screen
        name="AddNewUser"
        component={AddNewUserScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Add New User',
        })}
      />
      <MainScreensFlow.Screen
        name="ConfirmClubAdminDeletion"
        component={ConfirmClubAdminDeletionScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Confirm Club Admin Deletion',
        })}
      />

      <MainScreensFlow.Screen
        name="ClubPage"
        component={ClubPageNavigationFlow}
        options={({ navigation, route }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          title: route.params.title,
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        })}
      />
      <MainScreensFlow.Screen
        name="AddNewClub"
        component={AddNewClubScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Add New Club',
        })}
      />
      <MainScreensFlow.Screen
        name="EditClub"
        component={EditClubScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Edit Club',
        })}
      />
      <MainScreensFlow.Screen
        name="AddNewEvent"
        component={AddNewEventScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Add New Event',
        })}
      />
      <MainScreensFlow.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Edit Event',
        })}
      />
      <MainScreensFlow.Screen
        name="ViewEvent"
        component={ViewEventScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          title: route.params.title,
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        })}
      />
      <MainScreensFlow.Screen
        name="ViewPost"
        component={ViewPostScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          title: route.params.title,
        })}
      />
      <MainScreensFlow.Screen
        name="ViewPostedItems"
        component={ViewPostedItemsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'My Posted Items',
          headerBackButtonMenuEnabled: false,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        })}
      />
      <MainScreensFlow.Screen
        name="PostNewItem"
        component={PostNewItemScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Post New Item',
        })}
      />
      <MainScreensFlow.Screen
        name="EditItem"
        component={EditItemScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerTitle: 'Edit Item',
        })}
      />
      <MainScreensFlow.Screen
        name="AddNewInternship"
        component={AddNewInternshipScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
        })}
      />
      <MainScreensFlow.Screen
        name="EditInternship"
        component={EditInternshipScreen}
        options={({ navigation }) => ({
          headerLeft: () => <CustomHeaderBackArrow navigation={navigation} />,
          headerBackTitle: 'Edit Internship',
        })}
      />
    </MainScreensFlow.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    paddingEnd: 10,
    color: ThemeColors.Primary,
    fontWeight: '500',
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
