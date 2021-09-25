import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, RefreshControl, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Utils } from '../Utils';
import { Hour } from '../Utils';
import PagerView from 'react-native-pager-view';

export default function WindTable() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Hour[]>([]);

    const utils = new Utils();
    const appid = encodeURIComponent('7393657da231c8ab8a53430e14f8dae5')
    const units = encodeURIComponent('metric')
    const lang = encodeURIComponent('it')

    const headers = ["H", "Nodi", "Direzione", ""];

    useEffect(() => { update() }, []);

    function update() {
        setLoading(true)
        setData([]);
        utils.findCoordinates()
            .then(loc => {
                if (loc) {
                    let lat = encodeURIComponent(loc?.coords.latitude)
                    let lon = encodeURIComponent(loc?.coords.longitude)
                    fetch(`http://api.openweathermap.org/data/2.5/onecall?appid=${appid}&lat=${lat}&lon=${lon}&units=${units}&lang=${lang}`)
                        .then((response) => response.json())
                        .then((json) => setData(json.hourly))
                        .catch((error) => console.error(error))
                        .finally(() => setLoading(false));
                }
            }).catch((error) => console.error(error))
    }

    const createTable = (h: Hour[], i: any) => {
        const extractIcon = (d: Hour) => {
            return <TouchableOpacity onPress={() => utils.weatherDescription(d.weather[0].description)}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={{ uri: 'https://openweathermap.org/img/wn/' + d.weather[0].icon + '.png' }}>
                    </Image>
                </View>
            </TouchableOpacity>
        }

        const mapRow = h.map(d =>
            new Array<any>(
                utils.prettyDate(d.dt),
                (d.wind_speed * 1.94384).toFixed(1),
                utils.toDirections(d.wind_deg),
                extractIcon(d)
            )
        )

        const flex = [1, 0.7, 2, 0.5];

        return <View key={i}>
            <Text style={styles.TableTitleStyle}>{utils.titleDate(h[0].dt)}</Text>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={update} />}>
                <Table borderStyle={{ borderWidth: 0.5, borderColor: '#004B63' }} style={{ marginRight: 10 }}>
                    <Row data={headers} flexArr={flex} style={styles.HeadStyle} textStyle={styles.HeadTextStyle} />
                    <Rows data={mapRow} textStyle={styles.TableText} flexArr={flex} key={i} />
                </Table>
            </ScrollView>
        </View>
    }

    const loadingView =
        <View style={styles.ImageView}>
            <View>
                <Image style={styles.Image} source={require('../resources/leaf.gif')} />
            </View>
        </View>

    const tableView =
        <View style={styles.container}>
            <PagerView style={styles.pagerView} initialPage={0} scrollEnabled={true} showPageIndicator={true}>
                {
                    utils.group(data).map((h, i) => createTable(h, i))
                }
            </PagerView>
        </View>

    return isLoading ? loadingView : tableView;
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
