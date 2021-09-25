import { Alert } from 'react-native';
import * as Location from 'expo-location';

export interface Hour {
	dt: number;
	wind_speed: number;
	wind_deg: string;
	weather: [{
		main: string;
		icon: any;
		description: string;
	}];
}

export class Utils {
    constructor() { }

	monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
		"Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
	DIRECTIONS = ["N","N/NE","NE","E/NE","E","E/SE","SE",
		"S/SE","S","S/SW","SW","W/SW","W","W/NW","NW","N/NW","N"];

    groupBy<T, K>(list: T[], getKey: (item: T) => K) {
        const map = new Map<K, T[]>();
        list.forEach((item) => {
            const key = getKey(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return Array.from(map.values());
    }

    prettyDate = (time: number) => {
		var date = new Date(time * 1000);
		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit'
		}).substring(0, 5);
	}

	group = (data: Hour[]) => {
		return this.groupBy(data, item => new Date(item.dt * 1000).getDate());
	}

	titleDate = (h: number) => {
		const date = new Date(h * 1000)
		return date.getDate() + ' ' + this.monthNames[date.getMonth()] + ' ' + date.getFullYear()
	}

	toDirections = (d: string) => {
		return this.DIRECTIONS[Math.round((parseInt(d) / 22.5))] + ' (' + d + '°)'
	}

	weatherDescription = (desc: string) => {
		const descCapital = desc.charAt(0).toUpperCase() + desc.substr(1);
		Alert.alert(descCapital);
	}

	findCoordinates = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return null;
			}
			return await Location.getLastKnownPositionAsync({});
		}
	
}