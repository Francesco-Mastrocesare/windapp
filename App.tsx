import React from 'react';
import WindTable from './components/Table';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigator } from './components/Navigator';
import { navigationRef } from './components/RootNavigation';
import Home from './components/Home';

export default function App() {

	const Stack = createStackNavigator();


	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
				/>
				<Stack.Screen name="Previsioni" component={WindTable} />
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