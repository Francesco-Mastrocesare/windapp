import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../Styles';

export default function Loader() {
    return <View style={styles.ImageView}>
        <View>
            <Image style={styles.Image} source={require('../resources/loader.gif')} />
        </View>
    </View>
}