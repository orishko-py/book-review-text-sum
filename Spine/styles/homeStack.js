import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Book from "../screens/Book";
import FullReview from "../screens/FullReview";
import Header from "./header";
import React from "react";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: () => <Header />,
    },
  },
  Book: {
    screen: Book,
    navigationOptions: {
      title: "Book Search",
      titleStyle: {
        fontFamily: "nun-bold",
      },
    },
  },
  FullReview: {
    screen: FullReview,
    navigationOptions: {
      title: "Full Review",
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#eee",
    },
  },
});

export default createAppContainer(HomeStack);
