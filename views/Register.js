import React, { useState } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import { View } from "react-native";
import { Button, Icon, Input, Text, withStyles } from "react-native-ui-kitten";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { signIn } from "../util";

import { textStyle } from "../styles/textStyle";
import ScrollableAvoidKeyboard from "../components/common/ScrollableAvoidKeyboard";
import { EmailValidator, PasswordValidator } from "../core/Validator";

const REGISTER_USER = gql`
  mutation registerUser($registerUserInput: RegisterUserInput!) {
    registerUser(input: $registerUserInput) {
      user {
        id
        name
      }
    }
  }
`;

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  return token;
}

function getValidity(validator, value) {
  return validator(value);
}

function getStatus(validator, value) {
  if (value === "") return "primary";
  return getValidity(validator, value) ? "success" : "danger";
}

const Register = ({ themedStyle }) => {
  const [signUp] = useMutation(REGISTER_USER, {
    onCompleted: ({ registerUser: { user } }) =>
      signIn(authenticationToken).then(() => navigation.navigate("Auth"))
  });
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordDiffer, setPasswordDiffer] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollableAvoidKeyboard style={themedStyle.container}>
      <View style={themedStyle.headerContainer}>
        <Text style={themedStyle.helloLabel} category="h1">
          Bonjour.
        </Text>
        <Text style={themedStyle.signInLabel} category="s1">
          Créez votre compte
        </Text>
      </View>
      <View style={themedStyle.formContainer}>
        <View style={themedStyle.container}>
          <View style={themedStyle.formContainer}>
            <Input
              value={name}
              onChangeText={e => setName(e)}
              placeholder="Name"
            />
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
              icon={style => (
                <Icon {...style} name={showPassword ? "eye" : "eye-off"} />
              )}
            />
            <Input
              value={passwordConfirm}
              onChangeText={e => setPasswordConfirm(e)}
              placeholder="Confirm Password"
              secureTextEntry={!showPassword}
              onIconPress={() => setShowPassword(!showPassword)}
              icon={style => (
                <Icon {...style} name={showPassword ? "eye" : "eye-off"} />
              )}
            />
            {passwordStatus === "danger" && (
              <Text color="danger">Password must be 8 characters minimum</Text>
            )}
            {passwordDiffer && (
              <Text color="danger">Passwords don't match</Text>
            )}
          </View>
        </View>
      </View>
      <Button
        style={themedStyle.signInButton}
        textStyle={textStyle.button}
        disabled={!email || !password || !name || !passwordConfirm}
        size="giant"
        disabled={!email || !password}
        onPress={() => {
          setPasswordStatus("");
          setEmailStatus("");
          setPasswordDiffer(false);
          if (
            !getValidity(PasswordValidator, password) ||
            !getValidity(EmailValidator, email)
          ) {
            setEmailStatus(getStatus(EmailValidator, email));
            setPasswordStatus(getStatus(PasswordValidator, password));
          } else if (password != passwordConfirm) {
            setPasswordDiffer(true);
          } else {
            setEmailStatus("");
            setPasswordStatus("");
            setPasswordDiffer(false);
            registerForPushNotificationsAsync().then(expoToken => {
              signUp({
                variables: {
                  registerUserInput: { email, password, name, expoToken }
                }
              });
            });
          }
        }}
      >
        SIGN UP
      </Button>
      <Button
        style={themedStyle.signUpButton}
        textStyle={themedStyle.signUpText}
        appearance="ghost"
        activeOpacity={0.75}
        onPress={() => null}
      >
        Already have an account? Sign in
      </Button>
    </ScrollableAvoidKeyboard>
  );
};

export default withStyles(Register, theme => {
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
