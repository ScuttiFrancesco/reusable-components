import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  template: `
    <div class="tootltip"
      [style.top.px]="top()"
      [style.left.px]="left()"
      [style.fontSize.rem]="fontSize()"
      [style.color]="color()"
      [style.backgroundColor]="bgColor()"
      [style.borderRadius.px]="borderRadius()"
      [style.padding.px]="padding()"
      [style.boxShadow]="boxShadow()"
      [style.border]="border()"
      >
      {{text()}}
    </div>
  `,
  styles: `
  
    .tootltip {
      position: absolute;
      white-space: pre-wrap;
      z-index: 999;
    }
      `
})
export class TooltipComponent {
  text = input<string>('');
  top = input<number>(0);
  left = input<number>(0);
  fontSize = input<number>(1);
  color = input<string>('rgb(255, 255, 255)');
  bgColor = input<string>('rgb(0, 0, 0)');
  borderRadius = input<number>(5);
  padding = input<number>(5);
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  border = input<string>('1px solid rgb(132, 132, 132)');
  

}

export interface TooltipConfig {
  text?: string;
  top?: number;
  left?: number;
  fontSize?: number;
  color?: string;
  bgColor?: string;
  borderRadius?: number;
  padding?: number;
  boxShadow?: string;
  border?: string;
}
