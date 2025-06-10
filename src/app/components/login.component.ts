import { JsonPipe } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ManipolateDataService } from '../services/manipolate-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    @for (item of colonne; track $index) {
    <span (click)="sortBy(item)">{{ item }}</span
    >}
    <pre>{{ listaClientiFiltered() | json }}</pre>
    <button (click)="filtra()">filter</button>
  `,
  styles: [``],
})
export class LoginComponent {
  listaClienti = [
    { id: 1, name: 'Clien A', age: 30 },
    { id: 2, name: 'Clien B', age: 25 },
    { id: 3, name: 'Clien z', age: 35 },
    { id: 4, name: 'Client D', age: 28 },
    { id: 5, name: 'Client E', age: 40 },
    { id: 6, name: 'Client F', age: 22 },
    { id: 7, name: 'Client G', age: 33 },
    { id: 8, name: 'Client H', age: 29 },
    { id: 9, name: 'Client I', age: 31 },
    { id: 10, name: 'Client J', age: 27 },
  ];
  colonne = ['id', 'name', 'age'];

  listaClientiFiltered = computed(() =>
    this.manipolateDataService.filteredData()
  );

  filterArgs = {
    field: 'name',
    filter: 't',
    exact: false,
   
  };

  constructor(public manipolateDataService: ManipolateDataService) {}
  filtra() {
    this.manipolateDataService.filterData(this.listaClienti, this.filterArgs);
  }

  sortBy(item: string) {
      const dir = this.manipolateDataService.sortDir() === 'asc' ? 'desc' : 'asc';
    this.manipolateDataService.sortData(this.listaClienti, item, dir);
  }
}
