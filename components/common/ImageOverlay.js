import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { withStyles } from 'react-native-ui-kitten';

const ImageOverlay = (style, themedStyle, children, ...restProps) => {
	return (
		<ImageBackground style={[ themedStyle.containerAction, style ]} {...restProps}>
			<View style={themedStyle.overlay} />
			{children}
		</ImageBackground>
	);
};

export default withStyles(ImageOverlay, (theme) => ({
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.45)',
		...StyleSheet.absoluteFillObject
	},
	containerAction: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 64
	}
}));
