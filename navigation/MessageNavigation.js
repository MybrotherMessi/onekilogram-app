import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";
import { stackStyles } from "./config";

const MessageNavigation = createStackNavigator();

export default () => {
  return (
    <MessageNavigation.Navigator
      screenOptions={{ headerStyle: { ...stackStyles } }}
    >
      <MessageNavigation.Screen name="Messages" component={Messages} />
      <MessageNavigation.Screen name="Message" component={Message} />
    </MessageNavigation.Navigator>
  );
};
