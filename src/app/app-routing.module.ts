import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/weatherdashboard', pathMatch: 'full' },
    { 
      path: 'weatherdashboard',
      loadChildren: () => import('./features/weather-dashboard/weather-dashboard.module').then( m => m.WeatherDashboardPageModule)
    },
    { 
        path: 'weatherforecast/:zipCode',
        loadChildren: () => import('./features/weather-forecast/weather-forecast.module').then( m => m.WeatherForecastPageModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
