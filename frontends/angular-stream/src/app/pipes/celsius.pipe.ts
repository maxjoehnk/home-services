import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {
    transform(value: number, round?: boolean): any {
        if (round === true) {
            value = Math.round(value);
        }
        return `${value}°C`;
    }
}
