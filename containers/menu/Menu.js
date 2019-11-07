import React from "react";

import { BottomNavigation, BottomNavigationTab, Icon, withStyles } from "react-native-ui-kitten";

import SafeAreaView from "../../core/SafeAreaView";

const Menu = ({ onTabSelect, selectedIndex, themedStyle }) => {
  return (
    <SafeAreaView style={themedStyle.safeAreaContainer}>
      <BottomNavigation
        appearance="noIndicator"
        selectedIndex={selectedIndex}
        onSelect={onTabSelect}
      >
        <BottomNavigationTab title="Home" icon={<Icon name="layout-outline" />} />
        <BottomNavigationTab title="Profile" icon={<Icon name="star-outline" />} />
      </BottomNavigation>
    </SafeAreaView>
  );
};

export default withStyles(Menu, theme => ({
  safeAreaContainer: {
    backgroundColor: theme["background-basic-color-1"]
  }
}));
