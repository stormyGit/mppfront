import React from 'react';
import Menu from './Menu';

const MenuContainer = ({ navigation }) => {
	const navigationKey = 'MenuContainer';

	const onTabSelect = (selectedIndex) => {
		const { [index]: selectedRoute } = navigation.state.routes;
		navigation.navigate(selectedRoute.routeName);
	};

	return (
		<Menu
			selectedIndex={navigation.state.index}
			onTabSelect={(index) => {
				const { [index]: selectedRoute } = navigation.state.routes;

				navigation.navigate({
					key: navigationKey,
					routeName: selectedRoute.routeName
				});
			}}
		/>
	);
};

export default MenuContainer;
