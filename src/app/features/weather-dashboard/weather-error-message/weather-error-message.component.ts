import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-weather-error-message',
    templateUrl: './weather-error-message.component.html',
    styleUrls: ['./weather-error-message.component.css']
})
export class WeatherErrorMessageComponent implements OnInit {
    @Input() errorMessage: string;
    @Output() errorClearEvent: EventEmitter<void> = new EventEmitter();

    public constructor() { 
    }

    public ngOnInit(): void {
        console.log(this.errorMessage);
    }

    public clear(): void {
        this.errorClearEvent.emit();
    }
}
