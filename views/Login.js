import React, { useState } from 'react';

import { Button, Icon, Input, Layout, Text, withStyles } from 'react-native-ui-kitten';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { signIn } from '../util';

import { textStyle } from '../styles/textStyle';
import ScrollableAvoidKeyboard from '../components/common/ScrollableAvoidKeyboard';

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

const Login = ({ onAuthComplete, themedStyle }) => {
	const [ logIn ] = useMutation(LOG_IN, {
		onCompleted: ({ signIn: { user: { authenticationToken } } }) =>
			signIn(authenticationToken).then(onAuthComplete)
	});
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ showPassword, setShowPassword ] = useState(false);

	return (
		<ScrollableAvoidKeyboard style={themedStyle.container}>
			<Layout style={themedStyle.headerContainer}>
				<Text style={themedStyle.helloLabel} category='h1'>
					Bonjour.
				</Text>
				<Text style={themedStyle.signInLabel} category='s1'>
					Connectez vous à votre compte
				</Text>
			</Layout>
			<Layout>
				<Input
					//					style={themedStyle.input}
					value={email}
					onChangeText={(e) => setEmail(e)}
					placeholder='Email'
				/>
				<Input
					//					style={themedStyle.input}
					value={password}
					onChangeText={(e) => setPassword(e)}
					placeholder='Password'
					secureTextEntry={!showPassword}
					onIconPress={() => setShowPassword(!showPassword)}
					icon={(style) => <Icon {...style} name={showPassword ? 'eye' : 'eye-off'} />}
				/>
			</Layout>

			<Button
				style={themedStyle.signInButton}
				textStyle={textStyle.button}
				size='giant'
				disabled={!email || !password}
				onPress={() => logIn({ variables: { signInInput: { email, password } } })}>
				CONNEXION
			</Button>
		</ScrollableAvoidKeyboard>
	);
};

export default withStyles(Login, (theme) => {
	return {
		container: {
			flex: 1,
			backgroundColor: theme['background-basic-color-1']
		},
		headerContainer: {
			justifyContent: 'center',
			alignItems: 'center',
			minHeight: 216,
			backgroundColor: theme['color-primary-default']
		},
		formContainer: {
			flex: 1,
			marginTop: 32,
			paddingHorizontal: 16
		},
		helloLabel: {
			color: 'white',
			...textStyle.headline
		},
		signInLabel: {
			marginTop: 16,
			color: 'white',
			...textStyle.subtitle
		},
		signInButton: {
			marginHorizontal: 16
		},
		signUpButton: {
			marginVertical: 12
		},
		signUpText: {
			color: theme['text-hint-color'],
			...textStyle.subtitle
		}
	};
});
