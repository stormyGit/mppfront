import React from "react";
import { Layout, Text, withStyles } from "react-native-ui-kitten";

const Home = ({ onTabSelect, selectedIndex, themedStyle }) => {
  return (
    <Layout>
      <Text>TOTO HOME</Text>
    </Layout>
  );
};

export default withStyles(Home, theme => ({
  safeAreaContainer: {
    backgroundColor: theme["background-basic-color-1"]
  }
}));
