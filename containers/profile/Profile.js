import React from "react";

import { Layout, Text, withStyles } from "react-native-ui-kitten";

const Profile = ({ themedStyle }) => {
  return (
    <Layout>
      <Text>TOTO Profile</Text>
    </Layout>
  );
};

export default withStyles(Profile, theme => ({
  safeAreaContainer: {
    backgroundColor: theme["background-basic-color-1"]
  }
}));
