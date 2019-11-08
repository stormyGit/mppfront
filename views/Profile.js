import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Button, Icon, Input, Layout, Text } from "react-native-ui-kitten";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { signIn } from "../util";

const MYSELF = gql`
  query myself {
    myself {
      user {
        id
        name
        email
      }
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(MYSELF);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log(data);
  return (
    <Layout style={styles.container}>
      <Text>TOTO PROFIL</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 48 },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {}
});

export default Profile;
