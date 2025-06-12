import { Component, effect, input } from '@angular/core';


@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [],
  template: `
  @if (showData.length >0) {
    <div
      class="container"
      [style.borderRadius.px]="borderRadius()"
      [style.border]="border()"
      [style.backgroundColor]="backgroundColor()"
      [style.boxShadow]="boxShadow()"
    >
      @for(el of showData; track $index){
      <div>
        - @for(toShow of dataElementsShow(); track $index){
        {{ el[toShow] }} {{ ' ' }} }
      </div>
      }
    </div>}
  `,
  styles: `
  
    .container {
     
      margin-top: -10px;
      width: fit-content;
      max-width: 100%;
      padding: 10px;
    }
  `,
})
export class AutocompleteComponent {
  elements = input<any[]>([]);
  valueInput = input<string>('');
  dataElementsShow = input<string[]>(['name', 'surname']);
  borderRadius = input<number>(8);
  border = input<string>('1px solid rgb(200, 200, 200)');
  backgroundColor = input<string>('rgb(255, 254, 254)');
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  showData: any[] = [];
  constructor() {
    this.showData = [];
    effect(
      () => {
        if (!this.valueInput() || this.valueInput() === '') {
          this.showData = [];
          return;
        }
        console.log('valueInput', this.valueInput());
        let count = this.dataElementsShow().length;
        this.showData = [];
        for (let i = 0; i < count; i++) {
          const array = this.elements().filter((el) => {
            return el[this.dataElementsShow()[i]]
              .toLowerCase()
              .includes(this.valueInput().toLowerCase());
          });
          this.showData = this.showData.concat(array);
        }
      },
      
    );
  }
}
