import { WeatherEntity } from './weather-entity-base';

export class WeatherLocationEntity extends WeatherEntity {
    public zipCode: string;

    public constructor(response: any) {
        super(response);
        this.location = response.name;
    }
}
