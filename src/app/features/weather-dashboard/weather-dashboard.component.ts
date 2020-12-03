import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { WeatherLocationEntity } from 'src/app/models/weather-location-entity';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-weather-dashboard',
    templateUrl: './weather-dashboard.component.html',
    styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
    protected subjectSubscription: Subscription;
    protected errorSubjectSubscription: Subscription;
    protected errorMessage: string | undefined;

    public weatherLocationEntities: WeatherLocationEntity[] = [];

    public constructor( protected readonly router: Router,
                        protected readonly weatherService: WeatherService ) { 
    }

    public get displayError(): boolean {
        return !!this.errorMessage;
    }
    public get error(): string {
        return this.errorMessage;
    }

    public ngOnInit(): void {
        this.subjectSubscription = this.weatherService.subjectObservable$.subscribe((entities: WeatherLocationEntity[]) => {
            this.weatherLocationEntities = [...entities];
            this.errorClear();
        });
        this.errorSubjectSubscription = this.weatherService.errorSubjectObservable$.subscribe(({zipCode, errorDescription}) => {
            this.errorMessage = `zipCode: ${zipCode}; ${errorDescription}`;
        });
        this.weatherService.init();
    }

    public ngOnDestroy(): void {
        this.subjectSubscription.unsubscribe();
        this.errorSubjectSubscription.unsubscribe();
    }

    public errorClear(): void {
        this.errorMessage = null;
    }
}
