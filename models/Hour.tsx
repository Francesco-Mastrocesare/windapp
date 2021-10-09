
export interface Hour {
	dt: number;
	temp: number;
	wind_speed: number;
	wind_deg: string;
	weather: [{
		main: string;
		icon: any;
		description: string;
	}];
}