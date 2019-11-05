import React, { useEffect } from 'react';

import { AppLoading, SplashScreen } from 'expo';
import * as Font from 'expo-font';

import { getToken } from '../util';

function AppLoader({ navigation, assets: { fonts } }) {
	useEffect(() => {
		SplashScreen.preventAutoHide();
	});

	return (
		<React.Fragment>
			<AppLoading
				startAsync={async () => {
					return Promise.all([
						(async () => Font.loadAsync(fonts))()
						// TODO: Load Image,  other ressources here
					]);
				}}
				onFinish={async () => {
					const token = await getToken();
					SplashScreen.hide();
					navigation.navigate(token ? 'AuthApp' : 'UnauthApp');
				}}
				onError={(e) => console.warn(e)}
				autoHideSplash={false}
			/>
		</React.Fragment>
	);
}

export default AppLoader;
