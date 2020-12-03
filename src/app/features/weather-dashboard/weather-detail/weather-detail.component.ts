import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WeatherLocationEntity } from 'src/app/models/weather-location-entity';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-weather-detail',
    templateUrl: './weather-detail.component.html',
    styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
    @Input() weatherLocationEntity!: WeatherLocationEntity;
    
    public constructor( protected readonly router: Router,
                        protected readonly weatherService: WeatherService) { 
    }

    public ngOnInit(): void {
    }

    public get locationDescription(): string {
        return `${this.weatherLocationEntity.location} (${this.weatherLocationEntity.zipCode})`;
    }

    public navigateToForecast(): Promise<boolean> {
        return this.router.navigate(['/weatherforecast', this.weatherLocationEntity.zipCode]);
    }
    public onClose(): void {
        this.weatherService.removeLocation(this.weatherLocationEntity.zipCode);
    }
}
