import { input, Pipe, PipeTransform, signal } from '@angular/core';

export interface FilterPipeArgs {
  field: string;
  filter: string;
  exact?: boolean;
  from?: number;
  to?: number;
}

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  private inputArray = signal<unknown[]>([]);
  private filterArgs = signal<FilterPipeArgs>({ field: '', filter: '' });

  transform(value: unknown[], args: FilterPipeArgs): unknown[] {
    if (this.inputArray() !== value || this.filterArgs() !== args) {
      this.inputArray.set(value);
      this.filterArgs.set(args);
    } else {
      
      return this.inputArray();
    }

    if (!Array.isArray(value) || value.length === 0) {
      return value;
    }

    if (
      !args ||
      typeof args.field !== 'string' ||
      !args.field.trim() ||
      typeof args.filter !== 'string' ||
      !args.filter.trim()
    ) {
      return value;
    }

    const { field, filter, exact = false, from, to } = args;
    const lowerCaseFilter = filter.toLowerCase();

    let array = value.filter((item) => {
      const itemValue = (item as any)[field];
      return (
        itemValue &&
        (exact
          ? itemValue.toString().toLowerCase() === lowerCaseFilter
          : itemValue.toString().toLowerCase().includes(lowerCaseFilter))
      );
    });

    if (from !== undefined || to !== undefined) {
      array = array.slice(from ?? 0, to !== undefined ? to : undefined);
    }

    return array;
  }
}
