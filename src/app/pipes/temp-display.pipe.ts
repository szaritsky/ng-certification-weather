import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempDisplay'
})
export class TempDisplayPipe implements PipeTransform {

    public transform(value: unknown, ...args: unknown[]): string {
        return `${value}°F`;
    }
}
