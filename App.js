import React, { useEffect } from "react";

import { StyleSheet, ActivityIndicator } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { ApolloProvider } from "@apollo/react-hooks";
import { Layout, ApplicationProvider, IconRegistry } from "react-native-ui-kitten";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import Client from "./apolloClient";
import Login from "./views/Login";
import Profile from "./views/Profile";
import { getToken } from "./util";

const AuthApp = ({ navigation }) => {
  return (
    <ApolloProvider client={Client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container} />
        <Profile />
      </ApplicationProvider>
    </ApolloProvider>
  );
};

const UnauthApp = ({ navigation }) => {
  return (
    <ApolloProvider client={Client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container} />
        <Login onAuthComplete={() => navigation.navigate("AuthApp")} />
      </ApplicationProvider>
    </ApolloProvider>
  );
};

const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    async function checkToken() {
      const token = await getToken();

      navigation.navigate(token ? "AuthApp" : "UnauthApp");
    }

    checkToken();
  });

  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Layout style={styles.container} />
      <ActivityIndicator />
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthApp: createStackNavigator({ AuthApp: AuthApp }),
      UnauthApp: createStackNavigator({ UnauthApp: UnauthApp })
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
