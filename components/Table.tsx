import React from 'react';
import { useEffect, useState } from 'react';
import { RefreshControl, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { Utils } from '../Utils';
import { styles } from '../Styles';
import { Hour } from '../Utils';
import PagerView from 'react-native-pager-view';
import Loader from './Loader';

export default function WindTable() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Hour[]>();
    const utils = new Utils();

    useEffect(() => { update() }, []);

    function update() {
        setLoading(true)
        setData([]);
        utils.handleRequest('/onecall')
            .then((json) => setData(json ? json['hourly'] : []))
            .finally(() => setLoading(false));
    }

    const createTable = (h: Hour[], i: any) => {
        const extractIcon = (d: Hour) => {
            return <TouchableOpacity onPress={() => utils.weatherDescription(d.weather[0].description)}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ height: 40, width: 40 }}
                        source={{ uri: utils.getIconUrl(d.weather[0].icon) }}>
                    </Image>
                </View>
            </TouchableOpacity>
        }

        const mapRow = h.map(d =>
            new Array<any>(
                utils.prettyDate(d.dt),
                utils.toKnots(d.wind_speed),
                utils.toDirections(d.wind_deg),
                utils.toTemp(d.temp) + '°',
                extractIcon(d)
            )
        )

        const headers = ["H", "Nodi", "Direzione", "T", ""];
        const flex = [1, 0.7, 1.5, 0.5, 0.5];

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

    const tableView =
        <View style={styles.container}>
            <PagerView style={styles.pagerView} initialPage={0} scrollEnabled={true} showPageIndicator={true}>
                {
                    utils.group(data ? data : []).map((h, i) => createTable(h, i))
                }
            </PagerView>
        </View>

    return isLoading ? <Loader /> : tableView;
}
