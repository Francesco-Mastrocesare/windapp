import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { StyleSheet, RefreshControl, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Utils } from '../Utils';
import { Current } from '../models/Current';

export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Current>();
    const utils = new Utils();
    const appid = encodeURIComponent('7393657da231c8ab8a53430e14f8dae5')
    const units = encodeURIComponent('metric')
    const lang = encodeURIComponent('it')

    useEffect(() => update(), [])

    function update() {
        setLoading(true)

        utils.findCoordinates()
            .then(loc => {
                if (loc) {
                    let lat = encodeURIComponent(loc?.coords.latitude)
                    let lon = encodeURIComponent(loc?.coords.longitude)
                    let url = `http://api.openweathermap.org/data/2.5/weather?appid=${appid}&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`
                    fetch(url)
                        .then((response) => response.json())
                        .then((json) => setData(json))
                        .catch((error) => console.error(error))
                        .finally(() => setLoading(false));
                }
            }).catch((error) => console.error(error))
    }

    const render = data ?
        <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={update} />}>
            <View style={styles.container}>
                <Text style={styles.TitleStyle}>{data.name}</Text>
                <Text style={styles.TitleStyle}>{utils.titleDate(data.dt)}</Text>
                <Text style={styles.TitleStyle}>{utils.prettyDate(data.dt)}</Text>
                <Text style={styles.TitleStyle}>{data?.main?.temp?.toFixed(0)}°</Text>
                <Text style={styles.TitleStyle}>{(data?.wind?.speed * 1.944).toFixed(1)} nodi</Text>
                <Text style={styles.TitleStyle}>{utils.toDirections(data?.wind?.deg?.toString())}</Text>
                <TouchableOpacity onPress={() => utils.weatherDescription(data?.weather[0]?.description)}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ height: 150, width: 150 }}
                            source={{ uri: 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png' }}>
                        </Image>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        : null


    const loading =
        <View style={styles.ImageView}>
            <View>
                <Image style={styles.Image} source={require('../leaf.gif')} />
            </View>
        </View>


    return isLoading ? loading : render
}

const textcolor = '#1C0B59';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#ffffff'
    },
    TitleStyle: {
        textAlign: 'center',
        color: textcolor,
        fontSize: 48
    },
    TableTitleStyle: {
        textAlign: 'center',
        color: textcolor,
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15
    },
    HeadStyle: {
        height: 50,
        alignContent: "center"
    },
    HeadTextStyle: {
        marginLeft: 10,
        margin: 5,
        color: textcolor,
        fontWeight: 'bold'
    },
    TableText: {
        marginLeft: 10,
        margin: 5,
        color: textcolor
    },
    ImageView: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagerView: {
        flex: 1,
    },
    Image: {
        width: 250,
        height: 250
    }
});
