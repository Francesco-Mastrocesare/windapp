import { StyleSheet } from 'react-native';


const textcolor = '#1C0B59';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#ffffff'
    },
    TitleStyle: {
        textAlign: 'center',
        color: textcolor,
        fontSize: 38
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