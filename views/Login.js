import React, { useState } from "react";

import { StyleSheet } from "react-native";
import { Button, Icon, Input, Layout } from "react-native-ui-kitten";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { signIn } from "../util";

const LOG_IN = gql`
  mutation signin($signInInput: SignInInput!) {
    signIn(input: $signInInput) {
      user {
        id
        authenticationToken
      }
    }
  }
`;

const Login = ({ onAuthComplete }) => {
  const [logIn] = useMutation(LOG_IN, {
    onCompleted: ({
      signIn: {
        user: { authenticationToken }
      }
    }) => signIn(authenticationToken).then(onAuthComplete)
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout style={styles.container}>
      <Input
        style={styles.input}
        value={email}
        onChangeText={e => setEmail(e)}
        placeholder="Email"
      />
      <Input
        style={styles.input}
        value={password}
        onChangeText={e => setPassword(e)}
        placeholder="Password"
        secureTextEntry={!showPassword}
        onIconPress={() => setShowPassword(!showPassword)}
        icon={style => <Icon {...style} name={showPassword ? "eye" : "eye-off"} />}
      />
      <Button
        style={styles.button}
        onPress={() => logIn({ variables: { signInInput: { email, password } } })}
      >
        Login
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {}
});

export default Login;
