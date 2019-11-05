import React from 'react';

import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ScrollableAvoidKeyboard({ style, contentContainerStyle, ...restProps }) {
	return (
		<KeyboardAwareScrollView
			bounces={false}
			bouncesZoom={false}
			alwaysBounceVertical={false}
			alwaysBounceHorizontal={false}
			style={[ styles.container, style ]}
			contentContainerStyle={[ styles.contentContainer, contentContainerStyle ]}
			enableOnAndroid={true}
			{...restProps}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	contentContainer: {
		flexGrow: 1
	}
});

export default ScrollableAvoidKeyboard;
