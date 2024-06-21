import { Linking, View, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useContext, useCallback } from 'react';
import { actions } from '../../util/InternshipsFloatingButtonActions';
import { styles } from '../../assets/Styles/InternshipStyles';
import AuthContext from '../../util/AuthContext';

import { GetUserRoleFromDataBase } from '../../BackEnd/UsersQueries/GetUserRoleFromDataBase';
import { GetAllInternshipsFromDataBase } from '../../BackEnd/InternshipQueries/GetAllInternshipsFromDataBase';
import { DeleteInternshipFromDataBase } from '../../BackEnd/InternshipQueries/DeleteInternshipFromDataBase';

import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import ModifyModal from '../../components/ModifyModal';
import MessageModal from '../../components/MessageModal';
import SearchBar from '../../components/ui/SearchBar';
import InternshipsList from '../../components/InternshipsList';
import FloatingButton from '../../components/ui/FloatingButton';

export default function Internships({ navigation }) {
  const { userID } = useContext(AuthContext);
  let userId = '';
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [modifyModalVisibility, setModifyModalVisibility] = useState(false);
  const [internshipInfo, setInternshipInfo] = useState(null);
  const [search, setSearch] = useState();
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getInternshipsHandler();
    }, [])
  );

  const onRefreshHandler = () => {
    setRefresh(true);
    getInternshipsHandler();
    setRefresh(false);
  };

  const getInternshipsHandler = async () => {
    try {
      setLoading(true);
      userId = await userID();
      const checkUserRole = await GetUserRoleFromDataBase(userId);
      if (
        checkUserRole.success &&
        (checkUserRole.message === 'Global Admin' ||
          checkUserRole.message === 'Internship Admin')
      ) {
        setIsAdmin(true);
      }
      const response = await GetAllInternshipsFromDataBase();
      if (response.success) {
        setInternships(response.data);
        setFilteredInternships(response.data);
      } else {
        if (response.message === 'No internships Found') {
          setInternships(null);
          setFilteredInternships(null);
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

  const deleteIntershipHandler = async (id) => {
    try {
      setLoading(true);
      const response = await DeleteInternshipFromDataBase(id);
      if (response.success) {
        setMessageText('Internship Deleted Succesfully');
        setMessageType('Info');
        setMessageModalVisibility(true);
        const response = await GetAllInternshipsFromDataBase();
        if (response.success) {
          setInternships(response.data);
          setFilteredInternships(response.data);
        } else {
          if (response.message === 'No internships Found') {
            setInternships(null);
            setFilteredInternships(null);
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

  const showAdminModal = (internships) => {
    setInternshipInfo(internships);
    setModifyModalVisibility(true);
  };

  const goToInternship = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setMessageText('Cannot Open URL');
        setMessageType('Error');
        setMessageModalVisibility(true);
      }
    } catch (error) {
      setMessageText('Cannot Open URL');
      setMessageType('Error');
      setMessageModalVisibility(true);
    }
  };

  const floatingButtonActions = (name) => {
    setSearch('');
    navigation.navigate('AddNewInternship');
  };

  const showfilteredResultsByName = (item) => {
    setFilteredInternships(internships);
    if (item === '') {
      return;
    }
    setFilteredInternships((currentInternships) => {
      return currentInternships.filter((internship) =>
        internship.name.toLowerCase().includes(item.toLowerCase())
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
            data={internshipInfo}
            navigation={navigation}
            isVisible={modifyModalVisibility}
            setVisibility={setModifyModalVisibility}
            onDelete={deleteIntershipHandler}
            onEdit="EditInternship"
          />
          <View style={styles.searchContainer}>
            <SearchBar
              placeHol="What are you looking for"
              value={search}
              setValue={setSearch}
              filterResults={showfilteredResultsByName}
            />
          </View>
          <InternshipsList
            internships={filteredInternships}
            goToInternship={goToInternship}
            isAdmin={isAdmin}
            showAdminModal={showAdminModal}
            refresh={refresh}
            onRefresh={onRefreshHandler}
          />
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
