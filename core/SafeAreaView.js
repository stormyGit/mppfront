import React, { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaView as SafeAreaViewReactNavigation } from "react-navigation";
import Constants from "expo-constants";

const SafeAreaView = () => {
  useEffect(() => {
    SafeAreaViewReactNavigation.setStatusBarHeight(
      Platform.select({
        ios: Constants.statusBarHeight,
        android: 0
      })
    );
  });

  return <SafeAreaViewReactNavigation {...this.props} />;
};

export default SafeAreaView;
