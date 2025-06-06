import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  template: `
    <div
    class="badge"
    [style.color]="color()"
    [style.backgroundColor]="bgColor()"
    [style.width]="width()"
    [style.height]="height()"
    [style.border]="isSelected ? borderSelected() : border()"
    [style.borderRadius.px]="borderRadius()"
    [style.fontSize.em]="fontSize()"
    [style.fontWeight]="fontWeight()"
    [style.padding]="padding()"  
    [style.whiteSpace]="whiteSpace()" 
    [style.boxShadow]="isSelected ? '0 2px 4px rgba(0, 0, 0, 0.1)' : boxShadow()"
    [style.transform]="traslate"
    (click)="onClick(title())"
    >{{title()}}
    @if(isSelected) {
    <span class="selected">✔</span>}</div>
  `,
  styles: `
  .badge {
    display: flex;
    align-items: center;
    justify-content: start;
    cursor: pointer;
    position: relative;
  }

  .selected{
    border-radius: 50%;
    border: 1px solid rgb(255, 253, 253);
    background-color: rgb(4, 255, 0);
    color: rgb(255, 255, 255);
    width: 10px;
    height: auto;
    font-size: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -5px;
    right: 0;
    z-index: 1;
  }
  `
})
export class BadgeComponent {
  title = input<string>('Badge Title');
  color = input<string>('rgb(0, 0, 0)');
  bgColor = input<string>('rgb(255, 255, 255)');
  width = input<string>('fit-content');
  height = input<string>('auto');
  border = input<string>('1px solid rgb(132, 132, 132)');
  borderSelected = input<string>('1px solid rgb(0, 255, 17)');
  borderRadius = input<number>(32);
  fontSize = input<number>(1);
  fontWeight = input<string>('normal');
  padding = input<string>('4px 8px');
  whiteSpace = input<string>('nowrap');
  boxShadow = input<string>('none');
  isSelected = false;
  selection = output<{isSelected: boolean, title: string}>();
  traslate : string = '';

  onClick(title: string) {
    this.isSelected = !this.isSelected;
    this.selection.emit({isSelected: this.isSelected, title: title});
    if (this.isSelected) {
      this.traslate = 'translateX(0) translateY(-10%)';
    } else {
      this.traslate = 'translateX(0) translateY(0)';
    }
  }
}
