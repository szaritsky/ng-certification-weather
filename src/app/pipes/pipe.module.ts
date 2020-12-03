import { NgModule } from '@angular/core';

import { WeekDayPipe } from './week-day.pipe';
import { TempDisplayPipe } from './temp-display.pipe';

@NgModule({
    declarations: [
        WeekDayPipe,
        TempDisplayPipe
    ],
    imports: [
    ],
    exports: [
        WeekDayPipe,
        TempDisplayPipe
    ]
})
export class PipeModule { }
