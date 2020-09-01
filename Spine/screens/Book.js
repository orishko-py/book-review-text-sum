import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-community/picker";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { stars, globalStyles } from "../styles/global";

export default function Book({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [bookInfo, setBookInfo] = useState({});
  const [filteredReviews, setFiltered] = useState([]);
  const [displayReviews, setDisplay] = useState("all");
  const address = "10.0.2.2";

  useEffect(() => {
    fetch(`http://${address}:8000/info/${navigation.getParam("isbn")}`)
      .then((res) => {
        if (res.ok) {
          return res;
        }
      })
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.reviews);
        setFiltered(res.reviews.sort((a, b) => b.sentiment - a.sentiment));
        setBookInfo(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  sentimentFilter = (value) => {
    if (value === "pos") {
      const f = reviews.filter((e) => e.sentiment > 0);
      setFiltered(f.sort((a, b) => b.sentiment - a.sentiment));
    } else if (value === "neg") {
      const f = reviews.filter((e) => e.sentiment < 0);
      setFiltered(f.sort((a, b) => b.sentiment - a.sentiment));
    } else if (value === "all") {
      setFiltered(reviews.sort((a, b) => b.sentiment - a.sentiment));
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.bookInfo}>
            <View style={styles.bookCoverView}>
              <Image
                style={styles.bookCover}
                source={{
                  uri: `http://covers.openlibrary.org/b/isbn/${navigation.getParam(
                    "isbn"
                  )}-M.jpg`,
                }}
              />
            </View>
            <View style={styles.bookTitle}>
              <Text style={globalStyles.titleText}>{bookInfo.title}</Text>
            </View>
          </View>
          <View style={styles.reviewsHeader}>
            <Text style={styles.break}>User Reviews:</Text>

            <Picker
              selectedValue={displayReviews}
              style={styles.picker}
              onValueChange={(itemValue) => {
                console.log(displayReviews);
                console.log(itemValue);
                setDisplay(itemValue);
                console.log(displayReviews);
                sentimentFilter(itemValue);
              }}
            >
              <Picker.Item label="all" value="all" />
              <Picker.Item label="positive" value="pos" />
              <Picker.Item label="negative" value="neg" />
            </Picker>
          </View>
          <View style={styles.reviewInfo}>
            <FlatList
              style={styles.list}
              data={filteredReviews}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("FullReview", {
                      fullReview: item.reviewText,
                      name: item.reviewerName,
                      overall: item.overall,
                    })
                  }
                >
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View style={styles.rating}>
                        <Text style={globalStyles.titleText}>
                          {item.reviewerName} rated it
                        </Text>
                        <Image
                          style={styles.stars}
                          source={stars.ratings[item.overall]}
                        />
                      </View>

                      <View style={styles.summaryText}>
                        <Text style={globalStyles.reviewText}>
                          {item.summary}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bookCover: {
    width: 110,
    height: 160,
  },
  bookInfo: {
    width: "100%",
    height: "35%",
    backgroundColor: "#eee",
    flexDirection: "column",
  },
  rating: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
  },
  summaryText: {
    width: "100%",
    height: "65%",
  },
  break: {
    fontFamily: "nun-regular",
    fontSize: 18,
  },
  picker: {
    fontSize: 18,
    justifyContent: "center",
    color: "#747474",
    alignItems: "center",
    paddingHorizontal: 10,
    width: 120,
    height: "100%",
  },
  stars: {
    width: 95,
    height: 20,
    marginTop: 4,
    marginLeft: 4,
  },
  list: {
    flexGrow: 0,
  },
  bookCoverView: {
    width: "100%",
    height: "70%",
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  bookTitle: {
    width: "100%",
    height: "30%",
    alignItems: "center",
  },
  reviewInfo: {
    width: "100%",
    height: "60%",
    backgroundColor: "#eee",
    alignItems: "center",
  },
  reviewsHeader: {
    width: "100%",
    height: "5%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  card: {
    margin: 3,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#FFF",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    height: 100,
    width: 330,
    fontFamily: "nun-regular",
  },
  cardContent: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontFamily: "nun-regular",
    flexGrow: 0,
    flexDirection: "column",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "nun-regular",
    fontSize: 16,
  },
});
