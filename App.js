import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

import styles from "./styles";
import NavController from "./Components/NavController";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({ ...Ionicons.font });
      await Asset.loadAsync([require("./assets/logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      const authLink = setContext(async (_, { headers }) => {
        const token = await AsyncStorage.getItem("jwt");
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      });

      const httpLink = new HttpLink({
        uri: "http://192.168.178.21:4000",
      });

      const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache,
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);
  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
