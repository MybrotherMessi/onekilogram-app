import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform, YellowBox } from "react-native";

import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import StackFactory from "./StackFactory";
import MessageLink from "../Components/MessageLink";
import NavIcon from "../Components/NavIcon";
import LogoImage from "../Components/LogoImage";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          textAlignVertical: "center",
          backgroundColor: "#FAFAFA",
        },
      }}
    >
      <TabNavigation.Screen
        name="Home"
        component={StackFactory}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
              focused={focused}
            />
          ),
        }}
        initialParams={{
          initialRoute: Home,
          customConfig: {
            headerTitleAlign: "center",
            headerRight: () => <MessageLink />,
            headerTitle: () => <LogoImage />,
          },
        }}
      />
      <TabNavigation.Screen
        name="Search"
        component={StackFactory}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
              focused={focused}
            />
          ),
        }}
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
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
              focused={focused}
            />
          ),
        }}
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
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : focused
                  ? "md-heart"
                  : "md-heart-empty"
              }
            />
          ),
        }}
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
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
              focused={focused}
            />
          ),
        }}
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
