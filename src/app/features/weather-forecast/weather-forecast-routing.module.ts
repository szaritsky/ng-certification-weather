import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherForecastComponent } from './weather-forecast.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherForecastComponent
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class WeatherForecastPageRoutingModule {}
