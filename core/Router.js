import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { enableScreens } from 'react-native-screens';

import HomeContainer from '../containers/home/HomeContainer';
import MenuContainer from '../containers/menu/MenuContainer';
import ProfileContainer from '../containers/profile/ProfileContainer';

import Login from '../views/Login';
import Register from '../views/Register';

const HomeNavigator = createStackNavigator({
	['Home']: HomeContainer
});

const ProfileNavigator = createStackNavigator({
	['Profile']: ProfileContainer
});

const MenuNavigator = createBottomTabNavigator(
	{
		['Home']: HomeNavigator,
		['Profile']: ProfileNavigator
	},
	{
		tabBarComponent: MenuContainer
	}
);

const UnauthNavigator = createStackNavigator({
	['Login']: Login,
	['Register']: Register
});

const createAppRouter = (container) => {
	enableScreens();
	return createAppContainer(container);
};

export default (signedIn = false) =>
	createAppRouter(
		createSwitchNavigator(
			{
				['Auth']: MenuNavigator,
				['Unauth']: UnauthNavigator
			},
			{
				initialRouteName: signedIn ? 'Auth' : 'Unauth'
			}
		)
	);
