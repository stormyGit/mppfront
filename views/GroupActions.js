import React from 'react';

import { Button, Layout, Text, withStyles } from 'react-native-ui-kitten';
import Hr from 'react-native-hr-plus';

import { textStyle } from '../styles/textStyle';

const CreateGroup = ({ themedStyle }) => {
	return (
		<Layout style={themedStyle.containerAction}>
			<Text style={themedStyle.titleLabel} category='h3'>
				Créez un groupe
			</Text>
			<Text style={themedStyle.descriptionLabel} category='h6'>
				Invitez vos amis et commencez à parier !
			</Text>
			<Button
				style={themedStyle.readButton}
				textStyle={textStyle.button}
				status='control'
				onPress={() => {}}>
				CREER
			</Button>
		</Layout>
	);
};

const JoinGroup = ({ themedStyle }) => {
	return (
		<Layout style={themedStyle.containerAction}>
			<Text style={themedStyle.titleLabel} category='h3'>
				Rejoindre un groupe
			</Text>
			<Button
				style={themedStyle.readButton}
				textStyle={textStyle.button}
				status='control'
				onPress={() => {}}>
				REJOINDRE
			</Button>
		</Layout>
	);
};

const GroupActions = ({ themedStyle, navigation }) => {
	return (
		<Layout style={themedStyle.container}>
			<CreateGroup
				themedStyle={themedStyle}
				onAction={() => navigation.navigate('CreateGroup')}
			/>
			<Layout style={themedStyle.or}>
				<Hr color='#C5CEE0' width={1}>
					<Text style={themedStyle.orText}>Ou</Text>
				</Hr>
			</Layout>
			<JoinGroup
				themedStyle={themedStyle}
				onAction={() => navigation.navigate('JoinGroup')}
			/>
		</Layout>
	);
};

export default withStyles(GroupActions, (theme) => ({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	containerAction: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 64,
		marginVertical: 24,
		backgroundColor: theme['background-basic-color-1']
	},
	or: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	orText: {
		paddingHorizontal: 10,
		...textStyle.subtitle
	},
	image: {
		minHeight: 160
	},
	infoContainer: {
		paddingVertical: 16,
		justifyContent: 'space-between'
	},
	controlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	controlButtonText: {
		fontSize: 13,
		fontWeight: 'normal',
		color: theme['text-hint-color'],
		...textStyle.button
	},
	titleLabel: {
		textAlign: 'center',
		...textStyle.headline
	},
	descriptionLabel: {
		...textStyle.subtitle
	},
	readButton: {
		width: 200,
		marginTop: 32
	}
}));
