import { View, Image, StyleSheet } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { SharingCenterCategoryList } from '../../util/SharingCenterCategoryList';
import ThemeColors from '../../assets/theme/ThemeColors';
import AuthContext from '../../util/AuthContext';
import MessageModal from '../../components/MessageModal';
import LoadingStateTransparent from '../../util/LoadingStateTransparent';
import KeyboardAvoidingViewWrapper from '../../util/KeyboardAvoidingViewWrapper';

import { InsertItemToDataBase } from '../../BackEnd/SharingCenterQueries/InsertItemToDataBase';

import InputField from '../../components/ui/InputField';
import TextArea from '../../components/ui/TextArea';
import PillButton from '../../components/ui/PillButton';
import CustomPicker from '../../components/CustomPicker';

export default function PostNewItem({ navigation }) {
  const { userID } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [publisherEmail, setPublisherEmail] = useState('');
  const [condition, setCondition] = useState('Select Condition');
  const [category, setCategory] = useState('Select Category');
  const [campus, setCampus] = useState('Select Campus');
  const [price, setPrice] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const conditionOptions = ['New', 'Used'];
  const campusOptions = [
    'Beirut',
    'Bekaa',
    'Nabatieh',
    'Rayak',
    'Saida',
    'Tripoli',
  ];

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    let userId = await userID();
    setPublisherEmail(userId);
    let fetchedCategoryOptions = SharingCenterCategoryList.map(
      (item) => item.title
    );
    fetchedCategoryOptions = fetchedCategoryOptions.slice(1);
    setCategoryOptions(fetchedCategoryOptions);
  };

  const addItemHandler = async () => {
    const invalidEntries =
      !name ||
      !description ||
      !price ||
      condition === 'Select Condition' ||
      category === 'Select Category' ||
      campus === 'Select Campus';

    if (invalidEntries) {
      setMessageText('Please Enter All Required Fields');
      setMessageType('Warning');
      setMessageModalVisibility(true);
    } else {
      try {
        setLoading(true);
        const response = await InsertItemToDataBase(
          name,
          description,
          condition,
          category,
          campus,
          price,
          publisherEmail
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
            placeHol="Item Name (Required)"
            value={name}
            setValue={setName}
            focus={true}
            marginV={10}
          />
          <TextArea
            placeHol="Description (Required)"
            value={description}
            setValue={setDescription}
            marginV={10}
          />
          <CustomPicker
            data={conditionOptions}
            value={condition}
            setValue={setCondition}
            marginV={10}
            textSize={18}
          />
          <CustomPicker
            data={categoryOptions}
            value={category}
            setValue={setCategory}
            marginV={10}
            textSize={16}
          />
          <CustomPicker
            data={campusOptions}
            value={campus}
            setValue={setCampus}
            marginV={10}
            textSize={16}
          />
          <InputField
            placeHol="Price (Required)"
            value={price}
            setValue={setPrice}
            marginV={10}
          />
          <View style={styles.button}>
            <PillButton
              onPress={addItemHandler}
              backgroundCol={ThemeColors.Primary}
              textCol="white"
              marginV={10}
            >
              Post Item
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
