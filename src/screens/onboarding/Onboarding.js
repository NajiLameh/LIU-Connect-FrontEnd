import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, { useState, useRef } from 'react';
import OnboardingSlides from '../../util/OnboardingSlides';
import PillButton from '../../components/ui/PillButton';
import ThemeColors from '../../assets/theme/ThemeColors';

export default function Onboarding({ endFirstLaunch }) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const scrollTo = () => {
    if (currentIndex < OnboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      endFirstLaunch();
    }
  };

  return (
    <View style={styles.onboardingContainer}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={OnboardingSlides}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={[styles.onboardingItemContainer, { width }]}>
                <Image
                  source={item.image}
                  style={[
                    styles.onboardingItemImage,
                    { width, resizeMode: 'contain' },
                  ]}
                />
                <View style={styles.onboardingItemTextContainer}>
                  <Text style={styles.onboardingItemTitle}>{item.title}</Text>
                  <Text style={styles.onboardingItemDescription}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={styles.paginatorContainer}>
        {OnboardingSlides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={i.toString()}
            />
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <PillButton
          onPress={scrollTo}
          backgroundCol={ThemeColors.Primary}
          textCol="white"
          marginV={0}
        >
          Continue
        </PillButton>
      </View>
      <View style={{ position: 'absolute', top: 50, left: 5 }}>
        <Text
          style={{
            color: ThemeColors.Primary,
            fontSize: 25,
            fontWeight: '800',
          }}
        >
          Welcome To{' '}
          <Text
            style={{
              color: ThemeColors.GoogleBlue,
              fontSize: 25,
              fontWeight: '800',
            }}
          >
            LIU
          </Text>
          <Text
            style={{
              color: ThemeColors.GoogleYellow,
              fontSize: 25,
              fontWeight: '800',
            }}
          >
            Connect
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 7,
  },
  onboardingItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingItemImage: {
    flex: 0.7,
    justifyContent: 'center',
  },
  onboardingItemTextContainer: {
    flex: 0.3,
  },
  onboardingItemTitle: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: ThemeColors.Primary,
    textAlign: 'center',
  },
  onboardingItemDescription: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  paginatorContainer: {
    flex: 0.5,
    flexDirection: 'row',
    height: 64,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: ThemeColors.Primary,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flex: 1,
    width: '30%',
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
