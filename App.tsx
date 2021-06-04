import React from 'react';
import Title from './components/Title';
import WindTable from './components/Table';
import Settings from './components/Settings';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigator } from './components/Navigator';
import { navigationRef } from './components/RootNavigation';

export default function App() {

	const Stack = createStackNavigator();

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={WindTable}
				/>
				<Stack.Screen name="Settings" component={Settings} />
			</Stack.Navigator>
			<Navigator />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingTop: 35,
		backgroundColor: '#ffffff'
	}
});