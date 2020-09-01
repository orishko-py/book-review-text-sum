import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  const [isbn, onChangeISBN] = React.useState("");

  return (
    <View style={globalStyles.app}>
      <View style={globalStyles.container}>
        <Text>Hello</Text>
        <Text>you entered {isbn} as ISBN</Text>
        <TextInput
          style={{
            height: 40,
            width: 300,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={(text) => onChangeISBN(text)}
          isbn={isbn}
        />
        <Button
          onPress={() => navigation.navigate("Book", { isbn: isbn })}
          title="Search"
        />
      </View>
    </View>
  );
}
