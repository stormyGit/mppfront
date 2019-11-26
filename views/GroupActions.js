import React, { useState } from 'react';

import { Button, Layout, Text, withStyles, Input, Modal } from 'react-native-ui-kitten';
import Hr from 'react-native-hr-plus';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import MYSELF from '../graphql/myself';

import { textStyle } from '../styles/textStyle';
import { GroupNameValidator } from '../core/Validator';

const CREATE_GROUP = gql`
	mutation CreateGroup($groupNameInput: CreateGroupInput!) {
		createGroup(input: $groupNameInput) {
			group {
				id
				public
				name
				users {
					id
					name
				}
			}
		}
	}
`;

function getValidity(validator, value) {
	return validator(value);
}

function getStatus(validator, value) {
	return getValidity(validator, value) ? 'success' : 'danger';
}

const CreateGroup = ({ themedStyle }) => {
	const [ createGroup, { loading, error } ] = useMutation(CREATE_GROUP, {
		update(cache, { data: { createGroup } }) {
			const { myself } = cache.readQuery({ query: MYSELF });
			cache.writeQuery({
				query: MYSELF,
				data: { myself: { ...myself, groups: [ ...myself.groups, createGroup.group ] } }
			});
		},
		onError(e) {
			setGroup({ ...group, error: e });
		}
	});
	const [ group, setGroup ] = useState({ name: '', status: '', error: null });

	return (
		<Layout style={themedStyle.containerAction}>
			<Text style={themedStyle.titleLabel} category='h4'>
				Créez un groupe
			</Text>
			<Input
				style={themedStyle.interactive}
				status={group.status}
				value={group.name}
				onChangeText={(name) => setGroup({ ...group, name })}
				placeholder='Nom du groupe'
			/>
			{group.status === 'danger' && (
				<Text status='danger'>
					{group.error.message || 'Un nom de groupe doit au moins contenir une lettre'}
				</Text>
			)}
			<Button
				style={themedStyle.interactive}
				textStyle={textStyle.button}
				status='control'
				disabled={loading}
				onPress={() => {
					if (!getValidity(GroupNameValidator, group.name)) {
						setGroup({ ...group, status: getStatus(GroupNameValidator, group.name) });
					} else {
						setGroup({ ...group, status: getStatus(GroupNameValidator, group.name) });
						createGroup({
							variables: { groupNameInput: { name: group.name, public: false } }
						});
					}
				}}>
				Créer
			</Button>
		</Layout>
	);
};

const JOIN_GROUP = gql`
	mutation JoinGroup($groupIdInput: JoinGroupInput!) {
		joinGroup(input: $groupIdInput) {
			group {
				id
				public
				name
				users {
					id
					name
				}
			}
		}
	}
`;

const JoinGroup = ({ themedStyle }) => {
	const [ joinGroup, { loading, error } ] = useMutation(JOIN_GROUP, {
		update(cache, { data: { joinGroup } }) {
			const { myself } = cache.readQuery({ query: MYSELF });
			cache.writeQuery({
				query: MYSELF,
				data: { myself: { ...myself, groups: [ ...myself.groups, joinGroup.group ] } }
			});
		},
		onError(e) {
			setGroup({ ...group, error: e });
		}
	});
	const [ group, setGroup ] = useState({ id: '', status: '', error: null });

	return (
		<Layout style={themedStyle.containerAction}>
			<Text style={themedStyle.titleLabel} category='h3'>
				Rejoignez un groupe
			</Text>
			<Input
				style={themedStyle.interactive}
				status={group.status}
				value={group.id}
				onChangeText={(id) => setGroup({ ...group, id })}
				placeholder='ID du groupe'
			/>
			{group.status === 'danger' && (
				<Text status='danger'>
					{group.error.message ||
						'Un identifiant doit correspondre de la forme xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'}
				</Text>
			)}
			<Button
				style={themedStyle.interactive}
				textStyle={textStyle.button}
				status='control'
				onPress={() => {
					if (!getValidity(GroupIdValidator, group.id)) {
						setGroup({ ...group, status: getStatus(GroupIdValidator, group.id) });
					} else {
						setGroup({ ...group, status: getStatus(GroupIdValidator, group.id) });
						joinGroup({
							variables: { groupNameInput: { name: group.name, public: false } }
						});
					}
				}}>
				Rejoindre
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
	interactive: {
		width: 300,
		marginTop: 16
	}
}));
