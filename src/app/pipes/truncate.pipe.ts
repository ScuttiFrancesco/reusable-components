import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, args: number): string {
    if (!value) {
      return '';
    }
    return value.length > args ? value.substring(0, args) + '...' : value;
  }

}
