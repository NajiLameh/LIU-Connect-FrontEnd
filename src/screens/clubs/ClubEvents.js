import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { actions } from '../../util/EventsFloatingButtonActions';
import { styles } from '../../assets/Styles/SharingCenterStyles';
import ThemeColors from '../../assets/theme/ThemeColors';
import AuthContext from '../../util/AuthContext';

import { GetUserRoleFromDataBase } from '../../BackEnd/UsersQueries/GetUserRoleFromDataBase';
import { GetClubEventsFromDataBase } from '../../BackEnd/ClubQueries/GetClubEventsFromDataBase';
import { DeleteEventFromDataBase } from '../../BackEnd/EventQueries/DeleteEventFromDataBase';

import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import ModifyModal from '../../components/ModifyModal';
import MessageModal from '../../components/MessageModal';
import EventsGridCards from '../../components/EventsGridCards';
import FloatingButton from '../../components/ui/FloatingButton';
import { getClubAdminFromDataBase } from '../../BackEnd/ClubQueries/GetClubAdminFromDataBase';
import ClubContext from '../../util/ClubContext';

export default function ClubEvents({ navigation }) {
  const { userID } = useContext(AuthContext);
  const { club } = useContext(ClubContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [modifyModalVisibility, setModifyModalVisibility] = useState(false);
  const [clubEvents, setClubEvents] = useState();
  const [eventInfo, setEventInfo] = useState(null);
  const { width } = useWindowDimensions();
  const numColumns = width < 550 ? 2 : 3;

  useFocusEffect(
    useCallback(() => {
      getClubEventsHandler();
    }, [])
  );

  const onRefreshHandler = () => {
    setRefresh(true);
    getClubEventsHandler();
    setRefresh(false);
  };
  const getClubEventsHandler = async () => {
    try {
      setLoading(true);
      let userId = await userID();
      const checkUserRole = await GetUserRoleFromDataBase(userId);
      if (
        (checkUserRole.success && checkUserRole.message === 'Global Admin') ||
        checkUserRole.message === 'Club Admin'
      ) {
        const response = await getClubAdminFromDataBase(club.ID);
        if (
          (response.success && response.clubAdminEmail === userId) ||
          checkUserRole.message === 'Global Admin'
        ) {
          setIsAdmin(true);
        }
      }
      const response = await GetClubEventsFromDataBase(club.ID);
      if (response.success) {
        setClubEvents(response.data);
      } else {
        if (response.message === 'No Events Found') {
          setClubEvents(null);
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
        const response = await GetClubEventsFromDataBase(club.ID);
        if (response.success) {
          setEvents(response.data);
          setFilteredEvents(response.data);
        } else {
          if (response.message === 'No Events Found') {
            setClubEvents(null);
          } else {
            showErrorMessage();
            console.log(response);
          }
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
    event.clubEventID = club.name + '/' + club.ID;
    setEventInfo(event);
    setModifyModalVisibility(true);
  };

  const viewEventDetails = (event) => {
    setSearch('');
    const title = event.name;
    navigation.navigate('ViewEvent', { event, title });
  };

  const floatingButtonActions = () => {
    const clubID = club.name + '/' + club.ID;
    navigation.navigate('AddNewEvent', { clubID });
  };

  return (
    <>
      {loading ? (
        <LoadingStateOpaque isVisible={loading} />
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
          <View style={styles.resultListContainer}>
            <EventsGridCards
              events={clubEvents}
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
