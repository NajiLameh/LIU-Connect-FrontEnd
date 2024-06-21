import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import HomeScreen from '../screens/home/Home';
import ClubsScreen from '../screens/clubs/Clubs';
import EventsScreen from '../screens/events/Events';
import SharingCenterScreen from '../screens/sharingCenter/SharingCenter';
import InternshipsScreen from '../screens/internships/Internships';

const BottomTabsFlow = createBottomTabNavigator();

export default function BottomTabsNavigationFlow() {
  return (
    <BottomTabsFlow.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconColor;
          switch (route.name) {
            case 'Home':
              iconName = 'house';
              break;
            case 'Clubs':
              iconName = 'users';
              break;
            case 'Events':
              iconName = 'calendar-check';
              break;
            case 'Sharing Center':
              iconName = 'cart-shopping';
              break;
            case 'Internships':
              iconName = 'briefcase';
              break;
            default:
              iconName = null;
              iconColor = 'black';
          }
          iconColor = focused ? '#020403' : '#8B8B8B';
          return (
            <FontAwesomeIcon icon={iconName} color={iconColor} size={25} />
          );
        },
        tabBarActiveTintColor: '#020403',
        tabBarInactiveTintColor: '#8B8B8B',
        tabBarStyle: { height: 50 },
        tabBarIconStyle: { marginTop: 5 },
        tabBarLabelStyle: { marginBottom: 5 },
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}
    >
      <BottomTabsFlow.Screen name="Home" component={HomeScreen} />
      <BottomTabsFlow.Screen name="Clubs" component={ClubsScreen} />
      <BottomTabsFlow.Screen name="Events" component={EventsScreen} />
      <BottomTabsFlow.Screen
        name="Sharing Center"
        component={SharingCenterScreen}
      />
      <BottomTabsFlow.Screen name="Internships" component={InternshipsScreen} />
    </BottomTabsFlow.Navigator>
  );
}
