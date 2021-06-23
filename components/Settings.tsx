import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LocationObject } from 'expo-location';
import { Utils } from '../Utils';

export default function Settings() {
	const [location, setLocation] = useState<LocationObject>();
	const utils = new Utils()
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const getCoords = () => {
		utils.findCoordinates().then(loc => {
			if (loc) {
				setLocation(loc)
			}
		})
	}

	return (
	  <View style={styles.container}>
		<Text>position</Text>
		<Switch
		  trackColor={{ false: "#767577", true: "#81b0ff" }}
		  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
		  onValueChange={toggleSwitch}
		  value={isEnabled}
		/>
	  </View>
	);
  }
  

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		backgroundColor: '#F5FCFF'
	}
})