import React from 'react';
import WindTable from './components/Table';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigator } from './components/Navigator';
import { navigationRef } from './components/RootNavigation';
import Home from './components/Home';
import { Utils } from './Utils';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import PushNotifications from './components/PushNotifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

export default function App() {

	const Stack = createStackNavigator();
	const utils = new Utils();

	utils.getPushToken().then(token => {
		console.log(token)
		const requestOptions = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify({
				token: token
			})
		};

		const extra = Constants.manifest?.extra

		fetch(`${extra?.PUSH_NOTIFICATIONS_URL}/subscribers`, requestOptions)
			.then(() => console.log("Push token updated"))
			.catch(err => console.log(err))
	})

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
				/>
				<Stack.Screen name="Previsioni" component={WindTable} />
				<Stack.Screen name="Push" component={PushNotifications} />
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