import React from 'react';
import { useEffect, useState } from 'react';
import { RefreshControl, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Utils } from '../Utils';
import { styles } from '../Styles';
import { Current } from '../models/Current';
import Constants from 'expo-constants';
import Loader from './Loader';

export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Current>();
    const utils = new Utils();
    const extra = Constants.manifest?.extra

    useEffect(() => update(), [])

    function update() {
        setLoading(true)
        utils.handleRequest('/weather')
            .then((json) => setData(json))
            .finally(() => setLoading(false));
    }

    const render = data ?
        <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={update} />}>
            <View style={styles.container}>
                <Text style={styles.TitleStyle}>Hotspot</Text>
                <Text style={styles.TitleStyle}>{extra?.PLACE}</Text>
                <Text style={styles.TitleStyle}>{utils.titleDate(data.dt)}</Text>
                <Text style={styles.TitleStyle}>{utils.prettyDate(data.dt)}</Text>
                <Text style={styles.TitleStyle}>{utils.toTemp(data?.main?.temp)}°</Text>
                <Text style={styles.TitleStyle}>{utils.toKnots(data?.wind?.speed)} nodi</Text>
                <Text style={styles.TitleStyle}>{utils.toDirections(data?.wind?.deg?.toString())}</Text>
                <TouchableOpacity onPress={() => utils.weatherDescription(data?.weather[0]?.description)}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: 150, width: 150 }}
                            source={{ uri: utils.getIconUrl(data.weather[0].icon, '2x') }}>
                        </Image>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        : null

    return isLoading ? <Loader /> : render
}