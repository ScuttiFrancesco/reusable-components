import { Component, effect, input, signal, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  template: `
    @if(show()){
    <div
      class="toast"
      [style.position]="position()"
      [style.top.%]="top()"
      [style.bottom.%]="bottom()"
      [style.left.%]="left()"
      [style.backgroundColor]="backgroundColor()"
      [style.color]="color()"
      [style.padding]="padding()"
      [style.width.%]="width()"
      [style.height]="height()"
      [style.border]="border()"
      [style.fontSize.rem]="fontSize()"
      [style.fontFamily]="fontFamily()"
      [style.textAlign]="textAlign()"
      [style.borderRadius.px]="borderRadius()"
      [style.boxShadow]="boxShadow()"
    >
      <div class="display-container"
      [style.gap.px]="gapIconMex()"><span>{{ icon() }}</span> <span>{{ message() }}</span></div>
    </div>
    }
  `,
  styles: `
    .toast {
     z-index: 1010;
    
    }
    
    .display-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;         
    }
    span{
      max-width: 500px;
      
    }
    `,
})
export class ToastComponent {
  message = input<string>('This is a toast message');
  position = input<string>('absolute');
  top = input<number | string>('unset');
  bottom = input<number>(5);
  left = input<number>(5);
  backgroundColor = input<string>('rgba(0, 0, 0, 0.8)');
  color = input<string>('white');
  padding = input<string>('10px');
  width = input<string>('fit-content');
  height = input<string>('auto');
  fontSize = input<number>(1);
  fontFamily = input<string>('Arial, sans-serif');
  textAlign = input<string>('center');
  borderRadius = input<number>(5);
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.1)');
  border = input<string>('1px solid rgba(0, 0, 0, 0.2)');
  show = signal<boolean>(false);
  showinput = input<boolean>(false);
  icon = input<string>('🪄');
  gapIconMex = input<number>(8);

  toastVariableHidden = output<void>();

  constructor() {
    effect(
      () => {
        if (this.showinput()) {
          this.show.set(true); // Prima mostra il toast
          setTimeout(() => {
            this.show.set(false);
            this.toastVariableHidden.emit(); // Notifica il parent quando si nasconde automaticamente
          }, 30000);
        }
      },
      { allowSignalWrites: true }
    );
  }
}
