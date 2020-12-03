export enum WeatherCondition {
    None = 0,
    Thunderstorm = 200,
    Drizzle = 300,
    Rain = 500,
    Snow = 600,
    Atmosphere = 700,
    Clear = 800,
    Clouds = 801
}

export const FahrenheitBase: number = 273.15;
export const FahrenheitRatio: number = 9/5;
export const FahrenheitOffset: number = 32;

export class WeatherEntity {
    public location: string;
    public conditions: WeatherCondition;
    public temperature: number;
    public minTemperature: number;
    public maxTemperature: number;

    public constructor(response: any) {
        const [head] = response.weather;
        /* https://openweathermap.org/weather-conditions */
        switch(true) {
            case (head.id >= 200 && head.id < 300) :
                this.conditions = WeatherCondition.Thunderstorm;
                break;
            case (head.id >= 300 && head.id < 400) :
                this.conditions = WeatherCondition.Drizzle;
                break;
            case (head.id >= 500 && head.id < 600) :
                this.conditions = WeatherCondition.Rain;
                break;
            case (head.id >= 600 && head.id < 700) :
                this.conditions = WeatherCondition.Snow;
                break;
            case (head.id >= 700 && head.id < 800) :
                this.conditions = WeatherCondition.Atmosphere;
                break;
            case (head.id === 800) :
                    this.conditions = WeatherCondition.Clear;
                break;
            case (head.id >= 801 && head.id < 900) :
                this.conditions = WeatherCondition.Clouds;
                break;
            default:
                this.conditions = WeatherCondition.None;
                break;
        }
        this.temperature = Math.floor((response.main.temp - FahrenheitBase) * FahrenheitRatio + FahrenheitOffset);
        this.minTemperature = Math.floor((response.main.temp_min - FahrenheitBase) * FahrenheitRatio + FahrenheitOffset);
        this.maxTemperature = Math.floor((response.main.temp_max - FahrenheitBase) * FahrenheitRatio + FahrenheitOffset);
    }

    public get weatherConditionImage(): string {
        const imagePath: string = "https://www.angulartraining.com/images/weather/";
        let image: string;
        switch(this.conditions) {
            case WeatherCondition.Clear:
                image = `${imagePath}sun.png`;
                break;
            case WeatherCondition.Atmosphere: 
            case WeatherCondition.Clouds:
                image = `${imagePath}clouds.png`;
                break;
            case WeatherCondition.Drizzle:
            case WeatherCondition.Rain:
            case WeatherCondition.Thunderstorm:
                image = `${imagePath}rain.png`;
                break;
            case WeatherCondition.Snow:
                image = `${imagePath}snow.png`;
                break;
            default:
                console.info(`weather condition '${WeatherCondition[this.conditions]}' is not supported`);
        }
        return image;
    }

    public get currentConditionAsString(): string {
        return WeatherCondition[this.conditions];
    }    
}
