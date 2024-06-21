import { View, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { ClubsCategoryList } from '../../util/ClubsCategoryList';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';
import ThemeColors from '../../assets/theme/ThemeColors';
import MessageModal from '../../components/MessageModal';
import KeyboardAvoidingViewWrapper from '../../util/KeyboardAvoidingViewWrapper';

import { UpdateClubInDataBase } from '../../BackEnd/ClubQueries/UpdateClubInDataBase';
import { getClubAdminFromDataBase } from '../../BackEnd/ClubQueries/GetClubAdminFromDataBase';
import { GetAllUsersEmailsFromDataBase } from '../../BackEnd/UsersQueries/GetAllUsersEmailsFromDataBase';

import InputField from '../../components/ui/InputField';
import TextArea from '../../components/ui/TextArea';
import PillButton from '../../components/ui/PillButton';
import CustomPicker from '../../components/CustomPicker';

export default function EditClub({ route, navigation }) {
  const { data } = route.params;
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [clubAdminEmail, setClubAdminEmail] = useState('Choose Club Admin');
  const [department, setDepartment] = useState(data.department);
  const [status, setStatus] = useState(data.status);
  const [campus, setCampus] = useState(data.campus);
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [adminOptions, setAdminOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const statusOptions = ['Active', 'Inactive'];
  const campusOptions = [
    'Beirut',
    'Bekaa',
    'Nabatieh',
    'Rayak',
    'Saida',
    'Tripoli',
  ];

  useEffect(() => {
    getUsersEmailsHandler();
    getAdminEmailHandler();
  }, []);

  const getUsersEmailsHandler = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsersEmailsFromDataBase();
      if (response.success) {
        setAdminOptions(response.data.map((item) => item.email));
        let fetchedDepartmentOptions = ClubsCategoryList.map(
          (item) => item.title
        );
        fetchedDepartmentOptions = fetchedDepartmentOptions.slice(1);
        setDepartmentOptions(fetchedDepartmentOptions);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAdminEmailHandler = async () => {
    try {
      setLoading(true);
      const response = await getClubAdminFromDataBase(data.ID);
      if (response.success) {
        setClubAdminEmail(response.clubAdminEmail);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const EditClubHandler = async () => {
    const invalidEntry = !name || !description;

    if (invalidEntry) {
      setMessageText('Please Enter All Required Fields');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else {
      try {
        setLoading(true);
        const response = await UpdateClubInDataBase(
          data.ID,
          name,
          description,
          department,
          status,
          campus,
          data.rating,
          data.numOfRatings,
          facebookLink,
          instagramLink,
          linkedinLink,
          clubAdminEmail
        );
        if (response.success) {
          setMessageText(response.message);
          setMessageType('Info');
          setMessageModalVisibility(true);
        } else {
          setMessageText('Something went wrong, please try again later');
          setMessageType('Error');
          setMessageModalVisibility(true);
        }
      } catch (error) {
        setMessageText('Something went wrong, please try again later');
        setMessageType('Error');
        setMessageModalVisibility(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const messageButtonPressedHandler = () => {
    setMessageModalVisibility(false);
    navigation.goBack();
  };

  return (
    <>
      <LoadingStateTransparent isVisible={loading} />
      <KeyboardAvoidingViewWrapper>
        <View style={styles.screenContainer}>
          <MessageModal
            type={messageType}
            message={messageText}
            isVisible={messageModalVisibility}
            onPress={messageButtonPressedHandler}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/placeHolder.jpg')}
            />
          </View>

          <InputField
            placeHol="Club Name (Required)"
            value={name}
            setValue={setName}
            focus={true}
            marginV={10}
          />
          <TextArea
            placeHol="About Club (Required)"
            value={description}
            setValue={setDescription}
            marginV={10}
          />
          <CustomPicker
            data={adminOptions}
            value={clubAdminEmail}
            setValue={setClubAdminEmail}
            marginV={10}
          />
          <CustomPicker
            data={departmentOptions}
            value={department}
            setValue={setDepartment}
            marginV={10}
          />
          <CustomPicker
            data={statusOptions}
            value={status}
            setValue={setStatus}
            marginV={10}
          />
          <CustomPicker
            data={campusOptions}
            value={campus}
            setValue={setCampus}
            marginV={10}
          />
          <InputField
            placeHol="Facebook Link (Optional)"
            value={facebookLink}
            setValue={setFacebookLink}
            marginV={10}
          />
          <InputField
            placeHol="Instagram Link (Optional)"
            value={instagramLink}
            setValue={setInstagramLink}
            marginV={10}
          />
          <InputField
            placeHol="Linkedin Link (Optional)"
            value={linkedinLink}
            setValue={setLinkedinLink}
            marginV={10}
          />
          <View style={styles.button}>
            <PillButton
              onPress={EditClubHandler}
              backgroundCol={ThemeColors.Primary}
              textCol="white"
              marginV={10}
            >
              Save Changes
            </PillButton>
          </View>
        </View>
      </KeyboardAvoidingViewWrapper>
    </>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: ThemeColors.Primary,
    resizeMode: 'cover',
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
});
