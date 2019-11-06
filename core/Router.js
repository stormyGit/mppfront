import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import HomeContainer from "../containers/home/HomeContainer";
import MenuContainer from "../containers/menu/MenuContainer";
import ProfileContainer from "../containers/profile/ProfileContainer";
import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";

const HomeNavigator = createStackNavigator({
  ["Home"]: HomeContainer
});

const ProfileNavigator = createStackNavigator({
  ["Profile"]: ProfileContainer
});

const MenuNavigator = createBottomTabNavigator(
  {
    ["Home"]: HomeNavigator,
    ["Profile"]: ProfileNavigator
  },
  {
    tabBarComponent: MenuContainer
  }
);

const createAppRouter = container => {
  enableScreens();
  return createAppContainer(container);
};

export default createAppRouter(MenuNavigator);
