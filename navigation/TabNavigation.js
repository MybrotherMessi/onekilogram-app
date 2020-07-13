import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import StackFactory from "./StackFactory";
import MessageLink from "../Components/MessageLink";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator initialRouteName="Home">
      <TabNavigation.Screen
        name="Home"
        component={StackFactory}
        initialParams={{
          initialRoute: Home,
          customConfig: {
            title: "Home",
            headerTitleAlign: "center",
            headerRight: () => <MessageLink />,
          },
        }}
      />
      <TabNavigation.Screen
        name="Search"
        component={StackFactory}
        initialParams={{
          initialRoute: Search,
          customConfig: {
            title: "Search",
          },
        }}
      />
      <TabNavigation.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })}
      />
      <TabNavigation.Screen
        name="Notifications"
        component={StackFactory}
        initialParams={{
          initialRoute: Notifications,
          customConfig: {
            title: "Notifications",
          },
        }}
      />
      <TabNavigation.Screen
        name="Profile"
        component={StackFactory}
        initialParams={{
          initialRoute: Profile,
          customConfig: {
            title: "Profile",
          },
        }}
      />
    </TabNavigation.Navigator>
  );
};
