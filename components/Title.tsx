import React from 'react';
import { StyleSheet, Button, Text, TouchableOpacity } from 'react-native';

export default function Title() {
	const title = 'WindApp'

	return (
		<TouchableOpacity activeOpacity={0.5}>
			<Text style={styles.TitleStyle}>{title}</Text>
		</TouchableOpacity>
	);
}

const textcolor = '#1C0B59';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingTop: 35,
		backgroundColor: '#ffffff'
	},
	TitleStyle: {
		textAlign: 'center', 
		color: textcolor,
		fontSize: 48
	}
});
