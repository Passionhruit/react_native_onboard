import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DATA = [
  {
    title: "Travel the world",
    description:
      "Lorem ipsum is simply dummy text of the printing and tpyesetting industry",
    lottie: require("./assets/lottie-1.json"),
  },
  {
    title: "Let's travel",
    description:
      "Lorem ipsum is simply dummy text of the printing and tpyesetting industry",
    lottie: require("./assets/lottie-1.json"),
  },
  {
    title: "Play a trip",
    description:
      "Lorem ipsum is simply dummy text of the printing and tpyesetting industry",
    lottie: require("./assets/lottie-1.json"),
  },
];

export default function App() {
  const scrollX = new Animated.Value(0);
  const animation = useRef(null);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: wp(100),
          height: hp(100),
          backgroundColor: "#fff",
          paddingTop: hp(15),
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: wp(40),
            height: hp(40),
            marginHorizontal: wp(7),
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={item.lottie}
        />
        <Text
          style={{
            textAlign: "center",
            marginTop: hp(3),
            fontSize: hp(5),
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: hp(5),
            fontSize: hp(2),
            color: "#aaa",
            width: wp(70),
            alignSelf: "center",
          }}
        >
          {item.description}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      ></Animated.FlatList>
      <View
        style={{ position: "absolute", bottom: hp(10), flexDirection: "row" }}
      >
        {DATA.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * wp(100),
              index * wp(100),
              (index + 1) * wp(100),
            ],
            outputRange: [0.4, 1.0, 0.4],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={{
                width: hp(2),
                height: hp(2),
                marginHorizontal: wp(3),
                backgroundColor: "#575757",
                borderRadius: 100,
                opacity: opacity,
              }}
            />
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
