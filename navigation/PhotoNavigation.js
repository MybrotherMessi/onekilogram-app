import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTab = createMaterialTopTabNavigator();
const PhotoNavigation = createStackNavigator();

const PhotoTabs = () => {
  return (
    <PhotoTab.Navigator
      initialRouteName="SelectPhoto"
      tabBarPosition="bottom"
      tabBarOptions={{
        style: { ...stackStyles },
        indicatorStyle: { backgroundColor: styles.blackColor },
        labelStyle: { fontWeight: "bold" },
      }}
    >
      <PhotoTab.Screen name="Select" component={SelectPhoto} />
      <PhotoTab.Screen name="Take" component={TakePhoto} />
    </PhotoTab.Navigator>
  );
};

export default () => {
  return (
    <PhotoNavigation.Navigator>
      <PhotoNavigation.Screen
        name="PhotoTabs"
        component={PhotoTabs}
        options={{ title: "Choose Photo" }}
      />
      <PhotoNavigation.Screen name="UploadPhoto" component={UploadPhoto} />
    </PhotoNavigation.Navigator>
  );
};
