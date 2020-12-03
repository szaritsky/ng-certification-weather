import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WeatherAddLocationComponent } from './weather-add-location/weather-add-location.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherErrorMessageComponent } from './weather-error-message/weather-error-message.component';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { WeatherDashboardPageRoutingModule } from './weather-dashboard-routing.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
    declarations: [
        WeatherAddLocationComponent,
        WeatherErrorMessageComponent,
        WeatherDetailComponent,
        WeatherDashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PipeModule,
        WeatherDashboardPageRoutingModule
    ],
    providers: [
    ]
})
export class WeatherDashboardPageModule {}
