import React, { useState } from "react";

import { View } from "react-native";
import { Button, Icon, Input, Text, withStyles } from "react-native-ui-kitten";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { signIn } from "../util";

import { textStyle } from "../styles/textStyle";
import ScrollableAvoidKeyboard from "../components/common/ScrollableAvoidKeyboard";
import { EmailValidator, PasswordValidator } from "../core/Validator";

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

function getValidity(validator, value) {
  return validator(value);
}

function getStatus(validator, value) {
  if (value === "") return "primary";
  return getValidity(validator, value) ? "success" : "danger";
}

const Login = ({ navigation, themedStyle }) => {
  const [logIn] = useMutation(LOG_IN, {
    onCompleted: ({
      signIn: {
        user: { authenticationToken }
      }
    }) => signIn(authenticationToken).then(() => navigation.navigate("Auth"))
  });
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollableAvoidKeyboard style={themedStyle.container}>
      <View style={themedStyle.headerContainer}>
        <Text style={themedStyle.helloLabel} category="h1">
          Bonjour.
        </Text>
        <Text style={themedStyle.signInLabel} category="s1">
          Connectez vous à votre compte
        </Text>
      </View>
      <View style={themedStyle.formContainer}>
        <View style={themedStyle.container}>
          <View style={themedStyle.formContainer}>
            <Input
              value={email}
              status={emailStatus}
              onChangeText={e => setEmail(e)}
              placeholder="Email"
            />
            <Input
              style={themedStyle.passwordInput}
              value={password}
              status={passwordStatus}
              onChangeText={e => setPassword(e)}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
              icon={style => <Icon {...style} name={showPassword ? "eye" : "eye-off"} />}
            />
            {passwordStatus === "danger" && (
              <Text color="danger">Password must be 8 characters minimum</Text>
            )}
            <View style={themedStyle.forgotPasswordContainer}>
              <Button
                style={themedStyle.forgotPasswordButton}
                textStyle={themedStyle.forgotPasswordText}
                appearance="ghost"
                activeOpacity={0.75}
                onPress={this.onForgotPasswordButtonPress}
              >
                Forgot your password?
              </Button>
            </View>
          </View>
        </View>
      </View>
      <Button
        style={themedStyle.signInButton}
        textStyle={textStyle.button}
        size="giant"
        disabled={!email || !password}
        onPress={() => {
          if (!getValidity(PasswordValidator, password) || !getValidity(EmailValidator, email)) {
            setEmailStatus(getStatus(EmailValidator, email));
            setPasswordStatus(getStatus(PasswordValidator, password));
          } else {
            setEmailStatus(getStatus(EmailValidator, email));
            setPasswordStatus(getStatus(PasswordValidator, password));
            logIn({ variables: { signInInput: { email, password } } });
          }
        }}
      >
        SIGN IN
      </Button>
      <Button
        style={themedStyle.signUpButton}
        textStyle={themedStyle.signUpText}
        appearance="ghost"
        activeOpacity={0.75}
        onPress={() => NavigationPreloadManager.navigate("Register")}
      >
        Don't have an account? Create
      </Button>
    </ScrollableAvoidKeyboard>
  );
};

export default withStyles(Login, theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme["background-basic-color-1"]
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 216,
      backgroundColor: theme["color-primary-default"]
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16
    },
    helloLabel: {
      color: "white",
      ...textStyle.headline
    },
    signInLabel: {
      marginTop: 16,
      color: "white",
      ...textStyle.subtitle
    },
    signInButton: {
      marginHorizontal: 16
    },
    signUpButton: {
      marginVertical: 12
    },
    signUpText: {
      color: theme["text-hint-color"],
      ...textStyle.subtitle
    },
    forgotPasswordContainer: {
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    passwordInput: {
      marginTop: 16
    },
    forgotPasswordButton: {
      paddingHorizontal: 0
    },
    forgotPasswordText: {
      fontSize: 15,
      color: theme["text-hint-color"],
      ...textStyle.subtitle
    }
  };
});
