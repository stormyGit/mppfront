import React, { useEffect } from 'react';

import { StyleSheet, ActivityIndicator } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { ApolloProvider } from '@apollo/react-hooks';
import { Layout, ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Client from './apolloClient';
import Login from './views/Login';
import Profile from './views/Profile';
import AppLoader from './core/AppLoader';

const AuthApp = ({ navigation }) => {
	return (
		<ApolloProvider client={Client}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<Layout style={styles.container} />
				<Profile />
			</ApplicationProvider>
		</ApolloProvider>
	);
};

const UnauthApp = ({ navigation }) => {
	return (
		<ApolloProvider client={Client}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<Login onAuthComplete={() => navigation.navigate('AuthApp')} />
			</ApplicationProvider>
		</ApolloProvider>
	);
};

const AuthLoading = ({ navigation }) => {
	return (
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<AppLoader
				navigation={navigation}
				assets={{
					fonts: {
						'opensans-semibold': require('./assets/fonts/opensans-semibold.ttf'),
						'opensans-bold': require('./assets/fonts/opensans-bold.ttf'),
						'opensans-extrabold': require('./assets/fonts/opensans-extra-bold.ttf'),
						'opensans-light': require('./assets/fonts/opensans-light.ttf'),
						'opensans-regular': require('./assets/fonts/opensans-regular.ttf')
					}
				}}
			/>
		</ApplicationProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16
	}
});

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoading,
			AuthApp: createStackNavigator({ AuthApp: AuthApp }),
			UnauthApp: createStackNavigator({ UnauthApp: UnauthApp })
		},
		{
			initialRouteName: 'AuthLoading'
		}
	)
);
