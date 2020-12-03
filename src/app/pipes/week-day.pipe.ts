import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from "@angular/common";

@Pipe({ name: 'weekDayPipe' })
export class WeekDayPipe implements PipeTransform {
    public transform(datetime: string | undefined): string {
        return datetime ? formatDate(datetime, 'EEEE', 'en-US') : "";
    }
}
