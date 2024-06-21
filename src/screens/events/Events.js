import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { actions } from '../../util/EventsFloatingButtonActions';
import { styles } from '../../assets/Styles/SharingCenterStyles';
import AuthContext from '../../util/AuthContext';

import { GetUserRoleFromDataBase } from '../../BackEnd/UsersQueries/GetUserRoleFromDataBase';
import { GetAllEventsFromDataBase } from '../../BackEnd/EventQueries/GetAllEventsFromDataBase';
import { DeleteEventFromDataBase } from '../../BackEnd/EventQueries/DeleteEventFromDataBase';

import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import ModifyModal from '../../components/ModifyModal';
import MessageModal from '../../components/MessageModal';
import SearchBar from '../../components/ui/SearchBar';
import EventsGridCards from '../../components/EventsGridCards';
import FloatingButton from '../../components/ui/FloatingButton';

export default function Events({ navigation }) {
  const { userID } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [modifyModalVisibility, setModifyModalVisibility] = useState(false);
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const { width } = useWindowDimensions();
  const numColumns = width < 550 ? 2 : 3;

  useFocusEffect(
    useCallback(() => {
      getEventsHandler();
    }, [])
  );

  const onRefreshHandler = () => {
    setRefresh(true);
    getEventsHandler();
    setRefresh(false);
  };
  const getEventsHandler = async () => {
    try {
      setLoading(true);
      let userId = await userID();
      const checkUserRole = await GetUserRoleFromDataBase(userId);
      if (checkUserRole.success && checkUserRole.message === 'Global Admin') {
        setIsAdmin(true);
      }
      const response = await GetAllEventsFromDataBase();
      if (response.success) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      } else {
        if (response.message === 'No Events Found') {
          setEvents(null);
          setFilteredEvents(null);
        } else {
          showErrorMessage();
          console.log(response);
        }
      }
    } catch (error) {
      showErrorMessage();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEventHandler = async (id) => {
    try {
      setLoading(true);
      const response = await DeleteEventFromDataBase(id);
      if (response.success) {
        setMessageText('Event Deleted Successfully');
        setMessageType('Info');
        setMessageModalVisibility(true);
        const response = await GetAllEventsFromDataBase();
        if (response.success) {
          setEvents(response.data);
          setFilteredEvents(response.data);
        } else {
          if (response.message === 'No Events Found') {
            setEvents(null);
            setFilteredEvents(null);
          }
          showErrorMessage();
          console.log(response);
        }
      } else {
        showErrorMessage();
        console.log(response);
      }
    } catch (error) {
      showErrorMessage();
      console.log(error);
    } finally {
      setLoading(false);
      setModifyModalVisibility(false);
    }
  };

  const showErrorMessage = () => {
    setMessageText('Something went wrong, please try again later');
    setMessageType('Error');
    setMessageModalVisibility(true);
  };

  const showAdminModal = (event) => {
    setEventInfo(event);
    setModifyModalVisibility(true);
  };

  const viewEventDetails = (event) => {
    setSearch('');
    const title = event.name;
    navigation.navigate('ViewEvent', { event, title });
  };

  const floatingButtonActions = () => {
    setSearch('');
    navigation.navigate('AddNewEvent');
  };

  const showfilteredResultsByName = (input) => {
    setFilteredEvents(events);
    if (input === '') {
      return;
    }
    setFilteredEvents((currentEvents) => {
      return currentEvents.filter((event) =>
        event.name.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  return (
    <>
      {loading ? (
        <LoadingStateOpaque />
      ) : (
        <SafeAreaView style={styles.screenContainer}>
          <MessageModal
            isVisible={messageModalVisibility}
            onPress={() => setMessageModalVisibility(false)}
            type={messageType}
            message={messageText}
          />
          <ModifyModal
            data={eventInfo}
            navigation={navigation}
            isVisible={modifyModalVisibility}
            setVisibility={setModifyModalVisibility}
            onDelete={deleteEventHandler}
            onEdit="EditEvent"
          />
          <View style={styles.searchContainer}>
            <SearchBar
              placeHol="What are you looking for"
              value={search}
              setValue={setSearch}
              filterResults={showfilteredResultsByName}
            />
          </View>
          <View style={styles.resultListContainer}>
            <EventsGridCards
              events={filteredEvents}
              emptylistText="No Events Found"
              numCol={numColumns}
              spacing={5}
              viewEventsDetails={viewEventDetails}
              isAdmin={isAdmin}
              showAdminModal={showAdminModal}
              refresh={refresh}
              onRefresh={onRefreshHandler}
            />
          </View>
          {isAdmin && (
            <FloatingButton
              actions={actions}
              executeAction={floatingButtonActions}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
}
