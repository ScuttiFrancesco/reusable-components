import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManipolateDataService {
  data = signal<unknown[]>([]);
  filterArgs = signal<FilterArgs>({});
  sortBy = signal<string>('id');
  sortDir = signal<string>('asc');
  filteredData = signal<unknown[]>([]);
  sortedData = signal<unknown[]>([]);

  constructor() {}

  filterData(value: unknown[], args: FilterArgs): unknown[] {
    if (this.data() !== value || this.filterArgs() !== args) {
      this.data.set(value);
      this.filterArgs.set(args);
    } else {          
      return this.data();
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
    console.log(this.filteredData());
    this.filteredData.set(array);
    console.log(this.filteredData());
    return array;
  }

  sortData(value: unknown[], field: string, dir: string = 'asc'): unknown[] {
    if (!Array.isArray(value) || value.length === 0) {
      return value;
    }

    if (typeof field !== 'string' || !field.trim()) {
      return value;
    }

    const direction = dir === 'desc' ? -1 : 1;
    this.sortDir.set(dir);
    this.sortBy.set(field);

    let array = value.sort((a, b) => {
      const aValue = (a as any)[field];
      const bValue = (b as any)[field];

      if (aValue < bValue) {
        return -1 * direction;
      } else if (aValue > bValue) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    this.sortedData.set(array);
    return array;
  }
}

export interface FilterArgs {
  field?: string;
  filter?: string;
  exact?: boolean;
  from?: number;
  to?: number;
}
