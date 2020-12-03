import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PipeModule } from 'src/app/pipes/pipe.module';
import { WeatherForecastPageRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastComponent } from './weather-forecast.component';

@NgModule({
    declarations: [
        WeatherForecastComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipeModule,
        WeatherForecastPageRoutingModule
    ],
    providers: [
    ]
})
export class WeatherForecastPageModule {}
