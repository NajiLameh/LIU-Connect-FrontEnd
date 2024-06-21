import { Text, View, SafeAreaView, FlatList, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState, useCallback } from 'react';

import { GetAllUsersFromDataBase } from '../../BackEnd/UsersQueries/GetAllUsersFromDataBase';
import { DeleteUserFromDataBase } from '../../BackEnd/UsersQueries/DeleteUserFromDataBase';
import { UpdateUserRoleInDataBase } from '../../BackEnd/UsersQueries/UpdateUserRoleInDataBase';

import ThemeColors from '../../assets/theme/ThemeColors';
import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import MessageModal from '../../components/MessageModal';
import SearchBar from '../../components/ui/SearchBar';
import CustomPicker from '../../components/CustomPicker';

export default function ManageUsers({ navigation }) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [search, setSearch] = useState();
  const [userName, setUserName] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const roleOptions = [
    'Student',
    'Sharing Center Admin',
    'Internship Admin',
    'Global Admin',
  ];

  useFocusEffect(
    useCallback(() => {
      getUsersHandler();
    }, [])
  );

  const onRefreshHandler = () => {
    setRefresh(true);
    getUsersHandler();
    setRefresh(false);
  };

  const getUsersHandler = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsersFromDataBase();
      if (response.success) {
        setUsers(response.data);
        setFilteredUsers(response.data);
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

  const userDeletionConfirmation = (id, role) => {
    if (role === 'Club Admin') {
      navigation.navigate('ConfirmClubAdminDeletion', { id });
    } else {
      deleteUserHandler(id);
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      setLoading(true);
      const response = await DeleteUserFromDataBase(id);
      if (response.success) {
        const response = await GetAllUsersFromDataBase();
        if (response.success) {
          setMessageText('User Deleted Succesfully');
          setMessageType('Info');
          setMessageModalVisibility(true);
          setUsers(response.data);
          setFilteredUsers(response.data);
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
    }
  };

  const updateUserRoleHandler = async (email, role) => {
    try {
      setLoading(true);
      const response = await UpdateUserRoleInDataBase(email, role);
      if (response.success) {
        const response = await GetAllUsersFromDataBase();
        if (response.success) {
          setMessageText('User Updated Succesfully');
          setMessageType('Info');
          setMessageModalVisibility(true);
          setUsers(response.data);
          setFilteredUsers(response.data);
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
    }
  };

  const showErrorMessage = () => {
    setMessageText('Something went wrong, please try again later');
    setMessageType('Error');
    setMessageModalVisibility(true);
  };

  const getUserName = (firstName, lastName) => {
    setUserName(firstName, ' ', lastName);
    return userName;
  };

  const showfilteredResultsByName = (name) => {
    setFilteredUsers(users);
    if (name === '') {
      return;
    }
    const filteredUsers = users.filter((users) => {
      const fullName = `${users.firstName.toLowerCase()} ${users.lastName.toLowerCase()}`;
      return fullName.includes(name.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <>
      {loading ? (
        <LoadingStateOpaque />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <MessageModal
            isVisible={messageModalVisibility}
            onPress={() => setMessageModalVisibility(false)}
            type={messageType}
            message={messageText}
          />
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          >
            <SearchBar
              placeHol="Search For a User"
              value={search}
              setValue={setSearch}
              filterResults={showfilteredResultsByName}
            />
          </View>
          <FlatList
            data={filteredUsers}
            refreshing={refresh}
            onRefresh={onRefreshHandler}
            renderItem={(itemData) => {
              return (
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: ThemeColors.Grey_Light,
                  }}
                >
                  <View
                    style={{
                      paddingBottom: 5,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {itemData.item.firstName} {itemData.item.lastName}
                    </Text>
                  </View>
                  <View style={{ paddingBottom: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>
                      {itemData.item.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ width: '85%' }}>
                      {itemData.item.role === 'Global Admin' ? (
                        <View
                          style={{
                            height: 50,
                            minHeight: 50,
                            maxHeight: 50,
                            width: '100%',
                            maxWidth: 500,
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: ThemeColors.Secondary,
                            borderRadius: 10,
                            backgroundColor: ThemeColors.White,
                          }}
                        >
                          <Text
                            style={{ fontSize: 16, color: ThemeColors.Primary }}
                          >
                            {itemData.item.role}
                          </Text>
                        </View>
                      ) : (
                        <CustomPicker
                          data={roleOptions}
                          value={itemData.item.role}
                          setValue={(role) =>
                            updateUserRoleHandler(itemData.item.email, role)
                          }
                          marginV={0}
                          textSize={16}
                        />
                      )}
                    </View>
                    {itemData.item.role != 'Global Admin' && (
                      <Pressable
                        onPress={() =>
                          userDeletionConfirmation(
                            itemData.item.email,
                            itemData.item.role
                          )
                        }
                      >
                        <FontAwesomeIcon
                          icon="trash-can"
                          color="red"
                          size={25}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}
