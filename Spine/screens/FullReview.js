import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";

export default function FullReview({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={globalStyles.titleText}>
              {navigation.getParam("name")} rated it{" "}
              {navigation.getParam("overall")}
            </Text>
            <Text style={globalStyles.reviewText}>
              {navigation.getParam("fullReview")}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  card: {
    margin: 3,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    height: "100%",
    width: "90%",
    alignItems: "center",
  },
  cardContent: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
