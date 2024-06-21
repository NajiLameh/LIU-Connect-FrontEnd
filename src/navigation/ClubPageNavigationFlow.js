import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubInfoScreen from '../screens/clubs/ClubInfo';
import ClubEventsScreen from '../screens/clubs/ClubEvents';
import ClubContext from '../util/ClubContext';
import ThemeColors from '../assets/theme/ThemeColors';

const TopTabs = createMaterialTopTabNavigator();

export default function ClubPageNavigationFlow({ route }) {
  const { club, themeColor } = route.params;
  return (
    <ClubContext.Provider value={{ club, themeColor }}>
      <TopTabs.Navigator>
        <TopTabs.Screen
          name="ClubInfo"
          component={ClubInfoScreen}
          options={{
            title: 'About Club',
            tabBarActiveTintColor: ThemeColors.Primary,
            tabBarInactiveTintColor: ThemeColors.Secondary,
            tabBarLabelStyle: { fontWeight: '700' },
            tabBarIndicatorStyle: { backgroundColor: ThemeColors.Primary },
          }}
        />
        <TopTabs.Screen
          name="ClubEvents"
          component={ClubEventsScreen}
          options={{
            title: 'Club Events',
            tabBarActiveTintColor: ThemeColors.Primary,
            tabBarInactiveTintColor: ThemeColors.Secondary,
            tabBarLabelStyle: { fontWeight: '700' },
            tabBarIndicatorStyle: { backgroundColor: ThemeColors.Primary },
          }}
        />
      </TopTabs.Navigator>
    </ClubContext.Provider>
  );
}
