import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { stackStyles } from "./config";
import Detail from "../screens/Detail";
import UserDetail from "../screens/UserDetail";

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
      <stackFactory.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Photo" }}
      />
      <stackFactory.Screen
        name="UserDetail"
        component={UserDetail}
        options={{ title: route.state?.routes[1]?.params?.userName }}
      />
    </stackFactory.Navigator>
  );
};
