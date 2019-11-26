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
					icon={(style) => <Icon {...style} name='home-outline'/>}
				/>
				<BottomNavigationTab
					title='Groupes'
					icon={(style) => <Icon {...style} name='people-outline'/>}
				/>
				<BottomNavigationTab
					title='Profil'
					icon={(style) => <Icon {...style} name='person-outline'/>}
				/>
			</BottomNavigation>
		</SafeAreaView>
	);
};

export default withStyles(Menu, (theme) => ({
	safeAreaContainer: {
		backgroundColor: theme['background-basic-color-1']
	},
}));
