import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyles } from "./config";

const stackFactory = createStackNavigator();

export default ({ route }) => {
  const { initialRoute, customConfig } = route.params;
  return (
    <stackFactory.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { ...stackStyles },
      }}
    >
      <stackFactory.Screen
        name={route.name}
        component={initialRoute}
        options={customConfig}
      />
    </stackFactory.Navigator>
  );
};
