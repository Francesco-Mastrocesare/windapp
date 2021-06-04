import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import * as RootNavigation from './RootNavigation';

export const Navigator = () => {

    return (
        <View style={{ flexDirection: "row", width: '100%', height: 50 }}>
            <TouchableOpacity style={styles.ImageView} activeOpacity={0.5} onPress={() => RootNavigation.navigate('Home') }>
                <Image style={styles.Image} source={require('../home.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ImageView} activeOpacity={0.5} onPress={() => RootNavigation.navigate('Settings') }>
                <Image style={styles.Image} source={require('../settings.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 35,
        backgroundColor: '#ffffff'
    },
    Image: {
        width: 40,
        height: 40
    },
    ImageView: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
