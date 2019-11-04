import React, { useState, useEffect } from "react";

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

const AuthStack = createStackNavigator({
  Login: { screen: Login }
});

const LoggedInStack = createStackNavigator({
  Profile: { screen: Profile }
});

const App = ({ navigation }) => {
  useEffect(() => {
    async function checkToken() {
      const token = await getToken();

      navigation.navigate(token ? "App" : "Auth");
    }

    checkToken();
  });

  return (
    <ApolloProvider client={Client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Layout style={styles.container} />
        <ActivityIndicator />
      </ApplicationProvider>
    </ApolloProvider>
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
      AuthLoading: App,
      App: createStackNavigator({ Profile: Profile }),
      Auth: createStackNavigator({ Login: Login })
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
