import { Component, input, computed, output } from '@angular/core';

@Component({
  selector: 'app-toogle',
  standalone: true,
  imports: [],
  template: `
    <div
    class="toogle"
    [style.backgroundColor]="isSelected ? backgroundColorOn() : backgroundColorOff()"
    [style.width.em]="width()"
    [style.height.em]="height()"
    [style.borderRadius.px]="borderRadius()"
    [style.boxShadow]="boxShadow()"
    [style.padding.px]="circlePadding()"
    [style.justifyContent]="!isSelected ? 'flex-start' : 'flex-end'"
    (click)="isSelected = !isSelected; selection.emit(isSelected)"
    >
    @if(isSelected) {
      <div 
        class="toogle-on"
        [style.width.em]="circleSize()"
        [style.height.em]="circleSize()"
        [style.fontSize.rem]="iconSize()"
      >✔</div>
    }@if(!isSelected) {
      <div 
        class="toogle-off"
        [style.width.em]="circleSize()"
        [style.height.em]="circleSize()"
        [style.fontSize.rem]="iconSize()"
      >✕</div>
    }</div>
  `,
  styles: `
  .toogle {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .toogle-on {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(23, 152, 0);
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .toogle-off {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(152, 0, 0);
    font-weight: bold;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  `
})
export class ToogleComponent {
  backgroundColorOn = input<string>('rgb(32, 128, 0)');
  backgroundColorOff = input<string>('rgb(128, 32, 0)');
  width = input<number>(2);
  height = input<number>(1);
  borderRadius = input<number>(24);
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  
  circleSize = computed(() => this.height() * 1.2);
  circlePadding = computed(() => this.height() * 0.1 * 16); 
  iconSize = computed(() => this.height() * 0.5);
  
  isSelected = false;
  selection = output<boolean>();
}
