import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const stackFactory = createStackNavigator();

export default ({ route }) => {
  const { initialRoute, customConfig } = route.params;
  return (
    <stackFactory.Navigator initialRouteName="Home">
      <stackFactory.Screen
        name={route.name}
        component={initialRoute}
        options={customConfig}
      />
    </stackFactory.Navigator>
  );
};
