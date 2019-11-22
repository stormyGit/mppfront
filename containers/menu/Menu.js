import React from 'react';

import { BottomNavigation, BottomNavigationTab, Icon, withStyles } from 'react-native-ui-kitten';

import SafeAreaView from '../../core/SafeAreaView';

const Menu = ({ onTabSelect, selectedIndex, themedStyle }) => {
	return (
		<SafeAreaView style={themedStyle.safeAreaContainer}>
			<BottomNavigation
				appearance='noIndicator'
				selectedIndex={selectedIndex}
				onSelect={onTabSelect}>
				<BottomNavigationTab
					title='Home'
					icon={() => <Icon name='home-outline' fill='#C5CEE0'/>}
				/>
				<BottomNavigationTab
					title='Groupes'
					icon={() => <Icon name='people-outline' fill='#C5CEE0'/>}
				/>
				<BottomNavigationTab
					title='Profil'
					icon={() => <Icon name='person-outline' fill='#C5CEE0'/>}
				/>
			</BottomNavigation>
		</SafeAreaView>
	);
};

export default withStyles(Menu, (theme) => ({
	safeAreaContainer: {
		backgroundColor: theme['background-basic-color-1']
	},
	icon: {
		color: theme['background-basic-color-2']
	}
}));
