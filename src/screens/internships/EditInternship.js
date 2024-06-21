import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import ThemeColors from '../../assets/theme/ThemeColors';

import { UpdateInternshipInDataBase } from '../../BackEnd/InternshipQueries/UpdateInternshipInDataBase';

import MessageModal from '../../components/MessageModal';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';
import KeyboardAvoidingViewWrapper from '../../util/KeyboardAvoidingViewWrapper';
import InputField from '../../components/ui/InputField';
import CustomPicker from '../../components/CustomPicker';
import PillButton from '../../components/ui/PillButton';

export default function EditInternship({ navigation, route }) {
  let { data } = route.params;
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [name, setName] = useState(data.name);
  const [company, setcompany] = useState(data.company);
  const [type, setType] = useState(data.type);
  const [location, setLocation] = useState(data.location);
  const [paid, setPaid] = useState(data.paid);
  const [remote, setRemote] = useState(data.remote);
  const [duration, setDuration] = useState(data.duration);
  const [internshipLink, setInternshipLink] = useState(data.internshipLink);
  const typeOptions = ['Full-Time', 'Part-Time'];
  const remoteOptions = ['On-Site', 'Online', 'Hybrid'];
  const paidOptions = ['Paid', 'Not Paid'];

  const addInternshipHandler = async () => {
    const invalidEntries =
      !name ||
      !company ||
      !location ||
      !duration ||
      !internshipLink ||
      type === 'Select Internship Type' ||
      paid === 'Select Payment Option' ||
      remote === 'Remote';

    if (invalidEntries) {
      setMessageText('Please Enter All Required Fields');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else {
      try {
        setLoading(true);
        const response = await UpdateInternshipInDataBase(
          data.ID,
          data.publisherEmail,
          name,
          data.datePosted,
          company,
          type,
          location,
          paid,
          remote,
          duration,
          internshipLink
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
          <InputField
            placeHol="Internship Title (Required)"
            value={name}
            setValue={setName}
            focus={true}
            marginV={10}
          />
          <InputField
            placeHol="Company (Required)"
            value={company}
            setValue={setcompany}
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
          <CustomPicker
            data={paidOptions}
            value={paid}
            setValue={setPaid}
            marginV={10}
            textSize={18}
          />
          <CustomPicker
            data={remoteOptions}
            value={remote}
            setValue={setRemote}
            marginV={0}
            textSize={18}
          />
          <InputField
            placeHol="Duration (Required)"
            value={duration}
            setValue={setDuration}
            marginV={10}
          />
          <InputField
            placeHol="Internship Link (Required)"
            value={internshipLink}
            setValue={setInternshipLink}
            marginV={0}
          />
          <View style={styles.button}>
            <PillButton
              onPress={addInternshipHandler}
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
