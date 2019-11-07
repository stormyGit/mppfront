import React, { useEffect, useState } from 'react';

import { AppLoading, SplashScreen } from 'expo';
import * as Font from 'expo-font';

import { getToken } from '../util';

function AppLoader({ setSignedIn, assets: { fonts }, children }) {
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		SplashScreen.preventAutoHide();
	});

	if (loading)
		return (
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
					setLoading(false);
					setSignedIn(token !== null);
				}}
				onError={(e) => console.warn(e)}
				autoHideSplash={false}
			/>
		);
	return <React.Fragment>{children}</React.Fragment>;
}

export default AppLoader;
