import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

export const globalStyles = StyleSheet.create({
  app: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  bookContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "nun-bold",
    fontSize: 15,
    color: "#333",
    marginTop: 5,
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: "nun-regular",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
});

export const stars = {
  ratings: {
    1: require("../assets/images/Star_rating_1_of_5.png"),
    2: require("../assets/images/Star_rating_2_of_5.png"),
    3: require("../assets/images/Star_rating_3_of_5.png"),
    4: require("../assets/images/Star_rating_4_of_5.png"),
    5: require("../assets/images/Star_rating_5_of_5.png"),
  },
};
