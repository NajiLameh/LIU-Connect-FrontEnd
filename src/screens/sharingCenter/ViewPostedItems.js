import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { SharingCenterFilterList } from '../../util/SharingCenterFilterList';
import { styles } from '../../assets/Styles/SharingCenterStyles';
import ThemeColors from '../../assets/theme/ThemeColors';
import AuthContext from '../../util/AuthContext';

import { GetAllItemsFromDataBase } from '../../BackEnd/SharingCenterQueries/GetAllItemsFromDataBase';
import { DeleteItemFromDataBase } from '../../BackEnd/SharingCenterQueries/DeleteItemFromDataBase';

import LoadingStateOpaque from '../../util/LoadingStateOpaque';
import ModifyModal from '../../components/ModifyModal';
import MessageModal from '../../components/MessageModal';
import SearchBar from '../../components/ui/SearchBar';
import HorizontalScrollableCategory from '../../components/HorizontalScrollableCategory';
import SharingCenterGridCards from '../../components/SharingCenterGridCards';

export default function ViewPostedItem({ navigation }) {
  const { userID } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('');
  const [messageModalVisibility, setMessageModalVisibility] = useState(false);
  const [modifyModalVisibility, setModifyModalVisibility] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { width } = useWindowDimensions();
  const numColumns = width < 550 ? 2 : 3;

  useFocusEffect(
    useCallback(() => {
      getProductsHandler();
    }, [])
  );

  const onRefreshHandler = () => {
    setRefresh(true);
    getProductsHandler();
    setRefresh(false);
  };

  const getProductsHandler = async () => {
    try {
      setLoading(true);
      let userId = await userID();
      const response = await GetAllItemsFromDataBase();
      if (response.success) {
        const userProducts = response.data.filter(
          (product) => product.publisherEmail === userId
        );
        setProducts(userProducts);
        setFilteredProducts(userProducts);
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

  const deleteProductHandler = async (id) => {
    try {
      setLoading(true);
      const result = await DeleteItemFromDataBase(id);
      if (result.success) {
        const response = await GetAllItemsFromDataBase();
        if (response.success) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          showErrorMessage();
          console.log(response);
        }
      } else {
        showErrorMessage();
        console.log(result);
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

  const showAdminModal = (product) => {
    setProductInfo(product);
    setModifyModalVisibility(true);
  };

  const getThemeColor = (category) => {
    let themeColor = ThemeColors.Primary;
    for (i = 0; i < SharingCenterFilterList.length; i++) {
      if (category === SharingCenterFilterList[i].title) {
        themeColor = SharingCenterFilterList[i].backgroundCol;
      }
    }
    return themeColor;
  };

  const viewProductDetails = (product) => {
    setSearch('');
    const title = product.name;
    let themeColor = getThemeColor(product.category);
    navigation.navigate('ViewPost', { product, title, themeColor });
  };

  const showfilteredResultsByCategory = (item) => {
    setFilteredProducts(products);
    if (item === 'All') {
      return;
    }
    setFilteredProducts((currentProducts) => {
      return currentProducts.filter((product) => product.category === item);
    });
  };

  const showfilteredResultsByName = (item) => {
    setFilteredProducts(products);
    if (item === '') {
      return;
    }
    setFilteredProducts((currentProducts) => {
      return currentProducts.filter((product) =>
        product.name.toLowerCase().includes(item.toLowerCase())
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
            data={productInfo}
            navigation={navigation}
            isVisible={modifyModalVisibility}
            setVisibility={setModifyModalVisibility}
            onDelete={deleteProductHandler}
            onEdit="EditItem"
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
              data={SharingCenterFilterList}
              filterResults={showfilteredResultsByCategory}
            />
          </View>
          <View style={styles.resultListContainer}>
            <SharingCenterGridCards
              products={filteredProducts}
              emptylistText="No Products Found"
              numCol={numColumns}
              spacing={5}
              viewProductDetails={viewProductDetails}
              isAdmin={true}
              showAdminModal={showAdminModal}
              getThemeColor={getThemeColor}
              refresh={refresh}
              onRefresh={onRefreshHandler}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
