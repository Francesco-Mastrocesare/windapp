import React from 'react';
import { useEffect, useState } from 'react';
import { Switch, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LocationObject } from 'expo-location';
import { Utils } from '../Utils';
import { Table, Row, Rows } from 'react-native-table-component';

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
		<Table>
		<Row data={[
				<Text style={styles.TitleStyle}>text</Text>,
				<Text style={styles.TitleStyle}>switch</Text>
			]} />
			<Row data={[
				<Text style={styles.TitleStyle}>position</Text>,
				<Switch
				  trackColor={{ false: "#767577", true: "#81b0ff" }}
				  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
				  onValueChange={toggleSwitch}
				  value={isEnabled}
				/>
			]} />
		</Table>
	  </View>
	);
  }

const textcolor = '#1C0B59';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		backgroundColor: '#F5FCFF'
	},
	TitleStyle: {
        textAlign: 'center',
        color: textcolor,
        fontSize: 38
    }
})