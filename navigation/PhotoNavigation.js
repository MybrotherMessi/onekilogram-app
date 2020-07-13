import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { createStackNavigator } from "@react-navigation/stack";

const PhotoTab = createMaterialTopTabNavigator();
const PhotoNavigation = createStackNavigator();

const PhotoTabs = () => {
  return (
    <PhotoTab.Navigator initialRouteName="SelectPhoto" tabBarPosition="bottom">
      <PhotoTab.Screen name="SelectPhoto" component={SelectPhoto} />
      <PhotoTab.Screen name="TakePhoto" component={TakePhoto} />
    </PhotoTab.Navigator>
  );
};

export default () => {
  return (
    <PhotoNavigation.Navigator headerMode="none">
      <PhotoNavigation.Screen name="PhotoTabs" component={PhotoTabs} />
      <PhotoNavigation.Screen name="UploadPhoto" component={UploadPhoto} />
    </PhotoNavigation.Navigator>
  );
};
