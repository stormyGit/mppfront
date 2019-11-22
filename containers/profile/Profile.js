import React, { useState } from "react";

import { View } from "react-native";

import { Layout, Text, withStyles, Button, Icon, Avatar, Input } from "react-native-ui-kitten";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { TouchableHighlight } from "react-native-gesture-handler";

const GET_MYSELF = gql`
  query {
    myself {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput) {
      user {
        id
        name
        email
      }
    }
  }
`;

const ProfileFieldComponent = ({ style, themedStyle, hint, value, onPress }) => {
  const { container, hintLabel, valueLabel } = themedStyle;

  return (
    <View style={[container, style]} onPress={onPress}>
      {hint ? (
        <Text style={hintLabel} appearance="hint">
          {hint}
        </Text>
      ) : null}
      <Text style={valueLabel} appearance="hint">
        {value}
      </Text>
    </View>
  );
};

export const ProfileField = withStyles(ProfileFieldComponent, theme => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  hintLabel: {},
  valueLabel: {
    color: theme["text-basic-color"]
  }
}));

const ProfileFieldEditorComponent = ({ style, themedStyle, value, editor, onIconPress }) => {
  const { container, hintLabel, valueLabel } = themedStyle;

  return (
    <View style={[container, style]}>
      <Input
        onChangeText={e => editor(e)}
        style={valueLabel}
        value={value}
        onIconPress={onIconPress}
        icon={style => <Icon name="checkmark-outline" status="primary" />}
      />
    </View>
  );
};

export const ProfileFieldEditor = withStyles(ProfileFieldEditorComponent, theme => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  hintLabel: {},
  iconStyle: { color: "white" },
  valueLabel: {
    width: "100%"
  }
}));

const ProfilePhotoComponent = ({ style, themedStyle }) => {
  return (
    <View style={style}>
      <Avatar
        style={[style, themedStyle.avatar]}
        source={require("../../assets/images/source/image-profile-1.jpg")}
      />
    </View>
  );
};

export const ProfilePhoto = withStyles(ProfilePhotoComponent, theme => ({
  avatar: {
    alignSelf: "center"
  },
  editButton: {
    position: "absolute",
    alignSelf: "flex-end"
  }
}));

const Profile = ({ themedStyle }) => {
  const { loading, error, data } = useQuery(GET_MYSELF);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (loading || error) return null;

  const profile = data.myself;

  return (
    <Layout>
      <View style={themedStyle.photoSection}>
        <ProfilePhoto
          style={themedStyle.photo}
          button={
            <Button
              style={themedStyle.photoButton}
              status="basic"
              icon={<Icon name="camera" />}
              onPress={null}
            />
          }
        />
      </View>
      <View style={themedStyle.infoSection}>
        {editingName ? (
          <ProfileFieldEditor
            style={themedStyle.profileSetting}
            editor={setName}
            value={name}
            onIconPress={() => {
              updateUser({ variables: { updateUserInput: { name } } });
              setEditingName(false);
            }}
          />
        ) : (
          <TouchableHighlight onPress={() => setEditingName(true)}>
            <ProfileField style={themedStyle.profileSetting} hint="Nom" value={profile.name} />
          </TouchableHighlight>
        )}
        {editingEmail ? (
          <ProfileFieldEditor
            style={themedStyle.profileSetting}
            editor={setEmail}
            value={email}
            onIconPress={() => {
              updateUser({ variables: { updateUserInput: { email } } });
              setEditingEmail(false);
            }}
          />
        ) : (
          <TouchableHighlight onPress={() => setEditingEmail(true)}>
            <ProfileField style={themedStyle.profileSetting} hint="Email" value={profile.email} />
          </TouchableHighlight>
        )}
      </View>
    </Layout>
  );
};

export default withStyles(Profile, theme => ({
  container: {
    flex: 1,
    backgroundColor: theme["background-basic-color-2"]
  },
  photoSection: {
    marginVertical: 40
  },
  infoSection: {
    marginTop: 24,
    backgroundColor: theme["background-basic-color-1"]
  },
  contactSection: {
    marginTop: 24,
    backgroundColor: theme["background-basic-color-1"]
  },
  profileSetting: {
    borderBottomWidth: 1,
    borderBottomColor: theme["border-basic-color-2"]
  },
  photo: {
    width: 124,
    height: 124,
    alignSelf: "center"
  },
  photoButton: {
    top: 82,
    width: 48,
    height: 48,
    borderRadius: 24
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 24
  }
}));
