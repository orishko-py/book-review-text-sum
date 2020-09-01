import { StatusBar } from "expo-status-bar";
import { Card } from "react-native-paper";
import Home from "./screens/Home";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import React from "react";
import { globalStyles } from "./styles/global";
import Navigator from "./styles/homeStack";

import {
  TouchableOpacity,
  FlatList,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";

const getFonts = () => {
  return Font.loadAsync({
    "nun-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nun-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "nun-italic": require("./assets/fonts/Nunito-Italic.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  if (fontsLoaded) {
    return <Navigator />;
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
