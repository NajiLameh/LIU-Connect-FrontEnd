import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ThemeColors from '../../assets/theme/ThemeColors';
import DateTimePicker from '@react-native-community/datetimepicker';

import { GetClubsNamesFromDataBase } from '../../BackEnd/ClubQueries/GetClubsNamesFromDataBase';
import { InsertEventToDataBase } from '../../BackEnd/EventQueries/InsertEventToDataBase';

import MessageModal from '../../components/MessageModal';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';
import KeyboardAvoidingViewWrapper from '../../util/KeyboardAvoidingViewWrapper';
import InputField from '../../components/ui/InputField';
import TextArea from '../../components/ui/TextArea';
import CustomPicker from '../../components/CustomPicker';
import PillButton from '../../components/ui/PillButton';

export default function AddNewEvent({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Select Event Type');
  const [eventDate, setEventDate] = useState('Select Event Date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTime, setEventTime] = useState('Select Event Time');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [campus, setCampus] = useState('Select Campus');
  const [clubID, setClubID] = useState('Select Club');
  const [clubIDOptions, setClubIDOptions] = useState(null);
  const typeOptions = ['On Campus', 'Off Campus', 'Online'];
  const campusOptions = [
    'Beirut',
    'Bekaa',
    'Nabatieh',
    'Rayak',
    'Saida',
    'Tripoli',
  ];

  useFocusEffect(
    useCallback(() => {
      getClubsNamesHandler();
      checkClubAdditionLocation();
    }, [])
  );

  const getClubsNamesHandler = async () => {
    try {
      setLoading(true);
      const response = await GetClubsNamesFromDataBase();
      if (response.success) {
        const options = response.data.map((item) => {
          return item.name + '/' + item.ID;
        });
        setClubIDOptions(options);
      } else {
        if (response.message === ' No Clubs Found') {
          setMessageText('No Clubs Available');
          setMessageType('Info');
          setMessageModalVisibility(true);
        } else {
          showErrorMessage();
          console.log(response);
        }
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const checkClubAdditionLocation = () => {
    if (route.params != undefined) {
      setClubID(route.params.clubID);
    }
  };

  const addEventHandler = async () => {
    const invalidEntries =
      !name ||
      !info ||
      !location ||
      type === 'Select Event Type' ||
      campus === 'Select Campus' ||
      eventDate === 'Select Event Date' ||
      eventTime === 'Select Event Time' ||
      clubID === 'Select Club';

    if (invalidEntries) {
      setMessageText('Please Enter All Required Fields');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else {
      try {
        setLoading(true);
        const response = await InsertEventToDataBase(
          clubID,
          name,
          info,
          type,
          location,
          eventDate,
          eventTime,
          campus
        );
        if (response.success) {
          setMessageText(response.message);
          setMessageType('Info');
          setMessageModalVisibility(true);
        } else {
          console.log(response.message);
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
  const showErrorMessage = () => {
    setMessageText('Something went wrong, please try again later');
    setMessageType('Error');
    setMessageModalVisibility(true);
  };

  const toggleDatePickerVisibility = () => {
    setShowDatePicker(() => !showDatePicker);
  };
  const onDateChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      if (Platform.OS === 'android') {
        toggleDatePickerVisibility();
        let day = selectedDate.toLocaleDateString('default', {
          day: '2-digit',
        });
        let month = selectedDate.toLocaleDateString('default', {
          month: 'long',
        });
        let year = selectedDate.toLocaleDateString('default', {
          year: 'numeric',
        });
        let formattedDate = day + ' ' + month + ' ' + year;
        setEventDate(formattedDate);
      }
    } else {
      toggleDatePickerVisibility();
    }
  };

  const toggleTimePickerVisibility = () => {
    setShowTimePicker(() => !showTimePicker);
  };
  const onTimeChange = ({ type }, selectedTime) => {
    if (type === 'set') {
      if (Platform.OS === 'android') {
        toggleTimePickerVisibility();
        let hours = selectedTime.getHours().toString().padStart(2, '0');
        let minutes = selectedTime.getMinutes().toString().padStart(2, '0');
        let formattedTime = `${hours}:${minutes}`;
        setEventTime(formattedTime);
      }
    } else {
      toggleTimePickerVisibility();
    }
  };
  const messageButtonPressedHandler = () => {
    setMessageModalVisibility(false);
    if (messageType != 'Warning') {
      navigation.goBack();
    }
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
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={new Date()}
              onChange={onDateChange}
              minimumDate={new Date('2000-1-1')}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              mode="time"
              display="spinner"
              value={new Date()}
              onChange={onTimeChange}
            />
          )}
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/placeHolder.jpg')}
            />
          </View>
          <InputField
            placeHol="Event Title (Required)"
            value={name}
            setValue={setName}
            focus={true}
            marginV={10}
          />
          <TextArea
            placeHol="Event Info (Required)"
            value={info}
            setValue={setInfo}
            marginV={0}
          />
          <InputField
            placeHol="Location (Required)"
            value={location}
            setValue={setLocation}
            marginV={10}
          />
          <CustomPicker
            data={typeOptions}
            value={type}
            setValue={setType}
            marginV={0}
            textSize={18}
          />
          <View style={[styles.pickerContainer, { marginVertical: 10 }]}>
            <Pressable
              onPress={() => {
                toggleDatePickerVisibility();
              }}
              style={({ pressed }) =>
                pressed ? [styles.picker, styles.buttonPressed] : styles.picker
              }
            >
              <Text style={styles.pickerContainerText}>{eventDate}</Text>
              <FontAwesomeIcon
                icon="caret-down"
                size={16}
                color={ThemeColors.Primary}
              />
            </Pressable>
          </View>
          <View style={[styles.pickerContainer, { marginVertical: 0 }]}>
            <Pressable
              onPress={() => {
                toggleTimePickerVisibility();
              }}
              style={({ pressed }) =>
                pressed ? [styles.picker, styles.buttonPressed] : styles.picker
              }
            >
              <Text style={styles.pickerContainerText}>{eventTime}</Text>
              <FontAwesomeIcon
                icon="caret-down"
                size={16}
                color={ThemeColors.Primary}
              />
            </Pressable>
          </View>
          <CustomPicker
            data={campusOptions}
            value={campus}
            setValue={setCampus}
            marginV={10}
            textSize={18}
          />
          {route.params === undefined && (
            <CustomPicker
              data={clubIDOptions}
              value={clubID}
              setValue={setClubID}
              marginV={0}
              textSize={18}
            />
          )}
          <View style={styles.button}>
            <PillButton
              onPress={addEventHandler}
              backgroundCol={ThemeColors.Primary}
              textCol={ThemeColors.White}
              marginV={10}
            >
              Add Event
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
  pickerContainer: {
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    width: '100%',
    maxWidth: 500,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.Secondary,
    borderRadius: 10,
    backgroundColor: ThemeColors.White,
    overflow: 'hidden',
  },
  picker: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerContainerText: {
    fontSize: 16,
    color: ThemeColors.Primary,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
