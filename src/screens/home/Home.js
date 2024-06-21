import { ImageBackground, View, SafeAreaView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import ThemeColors from '../../assets/theme/ThemeColors';
import AuthContext from '../../util/AuthContext';

import { GetStatsFromDataBase } from '../../BackEnd/GetStatsFromDataBase';
import { GetAllUpcomingEventsFromDataBase } from '../../BackEnd/EventQueries/GetAllUpcomingEventsFromDataBase';

import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import MessageModal from '../../components/MessageModal';
import HomeStatCard from '../../components/HomeStatCard';
import DecoratedTitle from '../../components/ui/DecoratedTitle';
import EventsGridCards from '../../components/EventsGridCards';

const Home = ({ navigation }) => {
  const { userID } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, SetStats] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const { width, height } = useWindowDimensions();
  const numColumns = width < 550 ? 2 : 3;

  useFocusEffect(
    useCallback(() => {
      getStatsHandler();
      getAllUpcomingEventsHandler(new Date());
    }, [])
  );
  const onRefreshHandler = () => {
    setRefresh(true);
    getStatsHandler();
    setRefresh(false);
  };
  const getStatsHandler = async () => {
    try {
      setLoading(true);
      const response = await GetStatsFromDataBase();
      if (response.success) {
        SetStats(response);
      } else {
        showErrorMessage();
        console.log(response);
      }
    } catch (error) {
      showErrorMessage();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getAllUpcomingEventsHandler = async (selectedDateTime) => {
    try {
      setLoading(true);
      let day = selectedDateTime.toLocaleDateString('default', {
        day: '2-digit',
      });
      let month = selectedDateTime.toLocaleDateString('default', {
        month: 'long',
      });
      let year = selectedDateTime.toLocaleDateString('default', {
        year: 'numeric',
      });
      let formattedDate = day + ' ' + month + ' ' + year;
      let hours = selectedDateTime.getHours().toString().padStart(2, '0');
      let minutes = selectedDateTime.getMinutes().toString().padStart(2, '0');
      let formattedTime = `${hours}:${minutes}`;
      let userId = await userID();
      const response = await GetAllUpcomingEventsFromDataBase(
        userId,
        '1 April 2024',
        '18:00'
      );
      if (response.success) {
        setUpcomingEvents(response.data);
      } else {
        if (response.message === 'No Upcoming Events') {
          setUpcomingEvents(null);
        } else {
          showErrorMessage();
          console.log(response.message);
        }
      }
    } catch (error) {
      showErrorMessage();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const showErrorMessage = () => {
    setMessageText('Something went wrong, please try again later');
    setMessageType('Error');
    setMessageModalVisibility(true);
  };
  const viewEventDetails = (event) => {
    const title = event.name;
    navigation.navigate('ViewEvent', { event, title });
  };

  const HomeScreenHeader = () => {
    return (
      <>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.3)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.2)',
            'rgba(0,0,0,0.3)',
            'rgba(0,0,0,0.4)',
            'rgba(0,0,0,0.5)',
            'rgba(0,0,0,0.6)',
            'rgba(0,0,0,0.7)',
          ]}
          style={styles.linearGradient}
        >
          <ImageBackground
            source={require('../../assets/images/HomePicture.jpg')}
            style={[
              styles.homePictureContainer,
              { width: width, height: height / 2 },
            ]}
            imageStyle={styles.homePicture}
          >
            <HomeStatCard data={stats} />
          </ImageBackground>
        </LinearGradient>
        <View style={styles.titleContainer}>
          {upcomingEvents && (
            <DecoratedTitle
              textWithFirstColor="Upcoming Events"
              textWithSecondColor=""
              textSize={16}
              firstColor={ThemeColors.Primary}
              secondColor={ThemeColors.Primary}
              isUnderlined={true}
              underlineColor={ThemeColors.Primary}
            />
          )}
        </View>
      </>
    );
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

          <EventsGridCards
            events={upcomingEvents}
            headerComponent={HomeScreenHeader}
            emptylistText="No Upcoming Events"
            numCol={numColumns}
            spacing={5}
            viewEventsDetails={viewEventDetails}
            showAdminModal={() => {}}
            refresh={refresh}
            onRefresh={onRefreshHandler}
          />
        </SafeAreaView>
      )}
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: ThemeColors.White_Smoke,
  },
  linearGradient: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  homePictureContainer: {
    borderRadius: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  homePicture: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    opacity: 0.5,
  },
  titleContainer: { paddingTop: 5, paddingBottom: 10 },
  emptyListTitleContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productListContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: ThemeColors.White_Smoke,
    paddingHorizontal: 3,
    borderRadius: 10,
  },
});
