import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ForecastEntity } from 'src/app/models/forecast-entity';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    public forecastEntities: ForecastEntity[] = [];
    public zipCode: string;
    public location: string;
    
    public constructor( protected readonly router: Router,
                        protected readonly activatedRoute: ActivatedRoute,
                        protected readonly weatherService: WeatherService ) {
    }

    public ngOnInit(): void {
        this.subscription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => { 
            this.zipCode = params.get('zipCode');
            this.weatherService.fiveDayForecast(this.zipCode).subscribe((forecastEntities: ForecastEntity[]) => {
                this.forecastEntities = forecastEntities;
                const [head] = this.forecastEntities;
                /* all forecast entities targets the same location; its good enough to retreive the first one */
                this.location = head.location;
            });
        });
    }
    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public navigateToMainPage(): Promise<boolean> {
        return this.router.navigate(['/weatherdashboard']);
    }
}
