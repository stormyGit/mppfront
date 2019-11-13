import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { enableScreens } from 'react-native-screens';

import MenuContainer from '../containers/menu/MenuContainer';

import HomeContainer from '../containers/home/HomeContainer';

import GroupActions from '../views/GroupActions';
import CreateGroup from '../views/CreateGroup';

import ProfileContainer from '../containers/profile/ProfileContainer';

import Login from '../views/Login';
import Register from '../views/Register';

const HomeNavigator = createStackNavigator({
	['Home']: HomeContainer
});

const ProfileNavigator = createStackNavigator({
	['Profile']: ProfileContainer
});

const GroupNavigator = createStackNavigator({
	['GroupAction']: GroupActions,
	['CreateGroup']: CreateGroup
});

const MenuNavigator = createBottomTabNavigator(
	{
		['Home']: HomeNavigator,
		['Group']: GroupNavigator,
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

export default (signedIn) => {
	if (signedIn === null) return null;
	return createAppRouter(
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
};
