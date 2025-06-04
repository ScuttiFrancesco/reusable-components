import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="cssClass()"
      [style.width.vw]="width()"
      [style.height.vh]="height()"
      [style.cursor]="disabled() ? '' : cursor()"
      [style.backgroundColor]="disabled() ? 'rgb(255, 255, 255)' : bgColor()"
      [style.color]="disabled() ? 'rgb(0, 0, 0)' : color()"
      [style.border]="border()"
      [style.borderRadius.px]="borderRadius()"
      [style.--hover-translate-y]="disabled() ? '0' : translatey()"
      [style.--hover-translate-x]="disabled() ? '0' : translatex()"
      [style.fontSize.rem]="fontSize()"
      [style.fontWeight]="fontWeight()"
      [style.boxShadow]="boxShadow()"
      [style.fontFamily]="fontFamily()"
      (click)="clicked.emit($event)"
    >
      <div class="button-container">
        <div>{{ icon() }}</div>
        @if(text()){
        <div class="text-container">
          <div>{{ text() }}</div>
          @if (text1()) {
          <div>{{ text1() }}</div>}
        </div>}
      </div>
    </button>
  `,
  styles: `

      button {
      min-width: max-content;
      max-width: 15ch;
      min-height: 37px;
      max-height: 50px;
      padding: 4px 12px;
      }

    .button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      gap: 1rem;
    }

     .text-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.15rem;
    }

      button:hover {
        filter: brightness(1.2); /* Schiarisce del 20% */
        transition: filter 0.3s ease, transform 0.3s ease; /* Transizione per un effetto più fluido */
        transform: translateY(var(--hover-translate-y)) translateX(var(--hover-translate-x));

      }
    
      button:active {
        filter: brightness(1); /* Scurisce del 10% quando premuto */
      } 

    `,
})
export class ButtonComponent {
  type = input<string>('button');
  disabled = input<boolean>(false);
  text = input<string, string>('',{
    transform: (value: string) => value.toUpperCase(),
  });
  text1 = input<string, string>('', {
    transform: (value: string) => value.toUpperCase(),
  });
  icon = input<string>('🎶');
  width = input<number>(10);
  height = input<number>(5);
  cursor = input<string>('pointer');
  bgColor = input<string>('rgb(131, 131, 131)');
  color = input<string>('rgb(255, 255, 255)');
  border = input<string>('1px solid rgb(0, 0, 0)');
  borderRadius = input<number>(8);
  cssClass = input<string>('');
  clicked = output<MouseEvent>();
  translatey = input<string>('-2px');
  translatex = input<string>('0');
  fontSize = input<number>(1.25);
  fontWeight = input<string>('500');
  boxShadow = input<string>('0px 2px 4px rgba(0, 0, 0, 0.5)');
  fontFamily = input<string>('Arial, sans-serif');
}
