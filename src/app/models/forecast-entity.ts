import { WeatherEntity } from './weather-entity-base';

export class ForecastEntity extends WeatherEntity {
    public weekDay: string;

    public constructor(response: any, location: string) {
        super(response);
        this.location = location;
        this.weekDay = response.dt_txt;
    }
}
