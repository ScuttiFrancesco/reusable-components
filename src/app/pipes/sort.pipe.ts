import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: unknown[], args: string, dir?: string): unknown[] {

    if (!Array.isArray(value) || value.length === 0) {
      return value;
    }

    if (typeof args !== 'string' || !args.trim()) {
      return value;
    }

    const direction = dir === 'desc' ? -1 : 1;

    return value.sort((a, b) => {
      const aValue = (a as any)[args];
      const bValue = (b as any)[args];

      if (aValue < bValue) {
        return -1 * direction;
      } else if (aValue > bValue) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  
  }

}
