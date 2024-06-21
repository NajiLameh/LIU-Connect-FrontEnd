import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { ClubsfilterList } from '../../util/ClubsFilterList';
import { actions } from '../../util/ClubsFloatingButtonActions';
import { styles } from '../../assets/Styles/SharingCenterStyles';
import ThemeColors from '../../assets/theme/ThemeColors';
import AuthContext from '../../util/AuthContext';

import { GetUserRoleFromDataBase } from '../../BackEnd/UsersQueries/GetUserRoleFromDataBase';
import { GetAllClubsFromDataBase } from '../../BackEnd/ClubQueries/GetAllClubsFromDataBase';
import { DeleteClubFromDataBase } from '../../BackEnd/ClubQueries/DeleteClubFromDataBase';

import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import ModifyModal from '../../components/ModifyModal';
import MessageModal from '../../components/MessageModal';
import SearchBar from '../../components/ui/SearchBar';
import HorizontalScrollableCategory from '../../components/HorizontalScrollableCategory';
import ClubsGridCards from '../../components/ClubsGridCards';
import FloatingButton from '../../components/ui/FloatingButton';

export default function Clubs({ navigation }) {
  const { userID } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [modifyModalVisibility, setModifyModalVisibility] = useState(false);
  const [clubInfo, setClubInfo] = useState(null);
  const [search, setSearch] = useState('');
  const [clubs, setClubs] = useState(null);
  const [filteredClubs, setFilteredClubs] = useState(null);
  const { width } = useWindowDimensions();
  const numColumns = width < 550 ? 2 : 3;

  useFocusEffect(
    useCallback(() => {
      getClubsHandler();
    }, [])
  );

  const onRefreshHandler = () => {
    setRefresh(true);
    getClubsHandler();
    setRefresh(false);
  };
  const getClubsHandler = async () => {
    try {
      setLoading(true);
      let userId = await userID();
      const checkUserRole = await GetUserRoleFromDataBase(userId);
      if (checkUserRole.success && checkUserRole.message === 'Global Admin') {
        setIsAdmin(true);
      }
      const response = await GetAllClubsFromDataBase();
      if (response.success) {
        setClubs(response.data);
        setFilteredClubs(response.data);
      } else {
        if (response.message === 'No Clubs Found') {
          setClubs(null);
          setFilteredClubs(null);
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

  const deleteClubHandler = async (id) => {
    try {
      setLoading(true);
      const response = await DeleteClubFromDataBase(id);
      if (response.success) {
        const response = await GetAllClubsFromDataBase();
        if (response.success) {
          setClubs(response.data);
          setFilteredClubs(response.data);
        } else {
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

  const showAdminModal = (club) => {
    setClubInfo(club);
    setModifyModalVisibility(true);
  };

  const getThemeColor = (category) => {
    let themeColor = ThemeColors.Primary;
    for (i = 0; i < ClubsfilterList.length; i++) {
      if (category === ClubsfilterList[i].title) {
        themeColor = ClubsfilterList[i].backgroundCol;
      }
    }
    return themeColor;
  };

  const viewClubsDetails = (club) => {
    setSearch('');
    const title = club.name;
    const themeColor = getThemeColor(club.department);
    navigation.navigate('ClubPage', { club, title, themeColor });
  };

  const floatingButtonActions = () => {
    setSearch('');
    navigation.navigate('AddNewClub');
  };

  const showfilteredResultsByDepartment = (item) => {
    setFilteredClubs(clubs);
    if (item === 'All') {
      return;
    }
    setFilteredClubs((currentClubs) => {
      return currentClubs.filter((club) => club.department === item);
    });
  };

  const showfilteredResultsByName = (item) => {
    setFilteredClubs(clubs);
    if (item === '') {
      return;
    }
    setFilteredClubs((currentClubs) => {
      return currentClubs.filter((club) =>
        club.name.toLowerCase().includes(item.toLowerCase())
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
            data={clubInfo}
            navigation={navigation}
            isVisible={modifyModalVisibility}
            setVisibility={setModifyModalVisibility}
            onDelete={deleteClubHandler}
            onEdit="EditClub"
          />
          <View style={styles.searchContainer}>
            <SearchBar
              placeHol="What are you looking for"
              value={search}
              setValue={setSearch}
              filterResults={showfilteredResultsByName}
            />
          </View>
          <View style={styles.horizontalScrollableCategoryContainer}>
            <HorizontalScrollableCategory
              data={ClubsfilterList}
              filterResults={showfilteredResultsByDepartment}
            />
          </View>
          <View style={styles.resultListContainer}>
            <ClubsGridCards
              clubs={filteredClubs}
              numCol={numColumns}
              spacing={5}
              viewClubDetails={viewClubsDetails}
              isAdmin={isAdmin}
              showAdminModal={showAdminModal}
              getThemeColor={getThemeColor}
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
