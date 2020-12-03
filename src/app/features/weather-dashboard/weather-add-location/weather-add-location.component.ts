import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-weather-add-location',
    templateUrl: './weather-add-location.component.html',
    styleUrls: ['./weather-add-location.component.css']
})
export class WeatherAddLocationComponent implements OnInit {

    /* could use binding, for simplicity use DOM reference */
    @ViewChild('zipCodeEntry') zipCodeEntry: ElementRef;
    
    public constructor( protected readonly weatherService: WeatherService ) { 
    }

    public ngOnInit(): void {
    }

    public addNewLocation(): void {
        this.weatherService.addNewLocation(this.zipCodeEntry.nativeElement.value);
    }
}
