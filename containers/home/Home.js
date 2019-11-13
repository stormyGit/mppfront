import React from 'react';

import { ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Icon, Layout, Text, withStyles, List } from 'react-native-ui-kitten';

import { textStyle } from '../../styles/textStyle';
import { imagePost1Bg } from '../../assets/images/index';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER_GROUPS = gql`
	query {
		myself {
			id
			name
			groups {
				id
				public
				name
				users {
					name
				}
			}
		}
	}
`;

const GroupsList = ({ themedStyle, groups }) => {
	const GroupCard = ({ item: { name, users, public: pub } }) => (
		<TouchableOpacity activeOpacity={0.95} onPress={() => {}} style={themedStyle.item}>
			<ImageBackground style={themedStyle.image} source={imagePost1Bg} />
			<Layout style={themedStyle.infoContainer}>
				<Text style={themedStyle.titleLabel} category='h5'>
					{name}
				</Text>
				<Layout style={themedStyle.controlsContainer}>
					<Button
						style={themedStyle.timingButton}
						textStyle={themedStyle.controlButtonText}
						appearance='ghost'
						icon={() => <Icon name={'people-outline'} />}
						onPress={() => {}}>
						{`${users.length} personnes`}
					</Button>
					<Button
						textStyle={themedStyle.controlButtonText}
						appearance='ghost'
						icon={() => <Icon name={pub ? 'unlock-outline' : 'lock-outline'} />}
						onPress={() => {}}
					/>
				</Layout>
			</Layout>
		</TouchableOpacity>
	);

	return (
		<List
			data={groups}
			renderItem={GroupCard}
			themedStyle={themedStyle}
			contentContainerStyle={themedStyle.container}
		/>
	);
};

const Home = ({ themedStyle }) => {
	const { loading, error, data } = useQuery(GET_USER_GROUPS);

	if (loading || error) return null;

	return (
		<Layout>
			<GroupsList themedStyle={themedStyle} groups={data.myself.groups} />
		</Layout>
	);
};

export default withStyles(Home, (theme) => ({
	container: {
		paddingVertical: 8
	},
	image: {
		minHeight: 160
	},
	infoContainer: {
		paddingVertical: 16,
		justifyContent: 'space-between'
	},
	titleLabel: {
		marginHorizontal: 18,
		...textStyle.headline
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
	timingButton: {
		marginLeft: 8
	},
	timingIcon: {
		width: 20,
		height: 20,
		tintColor: theme['color-primary-default']
	},
	energyIcon: {
		width: 20,
		height: 20,
		tintColor: theme['color-danger-default']
	}
}));
