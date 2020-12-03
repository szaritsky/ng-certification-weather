import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { WeatherLocationEntity } from '../models/weather-location-entity';
import { ForecastEntity } from '../models/forecast-entity';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    private openWeatherUrlBase: string = 'https://api.openweathermap.org/data/2.5/';
    /* may be a dictionary ( or map ) */
    private weatherLocationEntities: WeatherLocationEntity[] = [];
    private subject$: Subject<WeatherLocationEntity[]>;
    public subjectObservable$: Observable<WeatherLocationEntity[]>;
    private errorSubject$: Subject<{zipCode: string, errorDescription: string}>;
    public errorSubjectObservable$: Observable<{zipCode: string, errorDescription: string}>;
    
    public constructor( protected readonly http: HttpClient ) { 
        this.subject$ = new Subject<WeatherLocationEntity[]>();
        this.errorSubject$ = new Subject<{zipCode: string, errorDescription: string}>();
        this.subjectObservable$ = this.subject$.asObservable();
        this.errorSubjectObservable$ = this.errorSubject$.asObservable();
    }

    protected get<T>(url: string, params = {}): Observable<T> {
        return this.http.get<T>(url, { params });
    }

    protected loadWeatherDetails(zipCode: string): Observable<boolean> {
        const url: string = `${this.openWeatherUrlBase}weather?zip=${zipCode}`;
        return this.get(url, {zipCode}).pipe( 
                map((response: any) => {
                    const weatherLocationEntity: WeatherLocationEntity = new WeatherLocationEntity(response);
                    weatherLocationEntity.zipCode = zipCode;
                    const index: number = this.weatherLocationEntities.findIndex((item: WeatherLocationEntity) => item.zipCode === weatherLocationEntity.zipCode);
                    if (index !== -1) {
                        /* if already exist just override weather location conditions */
                        this.weatherLocationEntities[index] = weatherLocationEntity;
                    } else {
                        this.weatherLocationEntities.push(weatherLocationEntity);
                    }
                    this.subject$.next(this.weatherLocationEntities);
                    return true;
                }),
                catchError(err => {
                    const errorMessage: string = `Failed to load weather details -'${err.error.message}'`;
                    this.errorSubject$.next({zipCode: zipCode, errorDescription: errorMessage});
                    return of(false);
                }));
    }

    public init(): void {
        Object.keys(localStorage).forEach((key: string) => {
            this.loadWeatherDetails(key).subscribe((loaded: boolean) => {
                if (!loaded) {
                    localStorage.removeItem(key);
                }     
            });
        });
    }

    public addNewLocation(zipCode: string): void {
        this.loadWeatherDetails(zipCode).subscribe((loaded: boolean) => {
            if (loaded && !localStorage.getItem(zipCode)) {
                /* could use array vs dictionary as local storage object */
                localStorage.setItem(zipCode, zipCode);
            }            
        });
    }

    public removeLocation(zipCode: string): void  {
        localStorage.removeItem(zipCode);
        const index: number = this.weatherLocationEntities.findIndex((item: WeatherLocationEntity) => item.zipCode === zipCode);
        if(index !== -1) {
            this.weatherLocationEntities.splice(index, 1);
            this.subject$.next(this.weatherLocationEntities);
        }
    }
    public fiveDayForecast(zipCode: string): Observable<ForecastEntity[]> {
        const url: string = `${this.openWeatherUrlBase}forecast?zip=${zipCode}`;
        return this.get(url, {zipCode}).pipe( map((response: any) => {
            /* pulled five day forecast based off 9 am o'clock time */
            return response.list.filter((item: any) => item.dt_txt.includes("09:00:00"))
                                .map((item: any) => new ForecastEntity(item, response.city.name) );
        }));
    }
}
