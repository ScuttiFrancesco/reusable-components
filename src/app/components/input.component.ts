import { Component, input, output, signal } from '@angular/core';
import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="container">
      @if(label()) {
      <label
        [for]="inputId()"
        [style.color]="labelColor()"
        [style]="labelStyles()"
      >
        {{ label() }}
        @if(required()) { <span class="required">*</span> }
      </label>
      }
      <div class="input-container">
        <input
          #input
          [id]="inputId()"
          [required]="required()"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [class]="cssClass()"
          [style.width.vw]="width()"
          [style.height.vh]="height()"
          [style.backgroundColor]="
            disabled() ? 'rgb(255, 255, 255)' : bgColor()
          "
          [style.color]="disabled() ? 'rgb(0, 0, 0)' : color()"
          [style.border]="
            disabled()
              ? 'none'
              : message()
              ? '1px solid rgb(255, 0, 0)'
              : border()
          "
          [style.borderRadius.px]="borderRadius()"
          (focus)="focus.emit($event)"
          (blur)="blur.emit($event)"
          (input)="onInputChange($event)"
        />

        @if(button()) {
        <div class="button-icon-close">
          <app-button
            [icon]="icon()"
            [bgColor]="'rgb(0, 153, 255)'"
            [width]="1"
            [height]="5.75"
            [translatey]="'0'"
            [boxShadow]="'none'"
            (clicked)="clicked.emit(input.value)"
          />
          @if(inputChanging()){
          <span class="custom-input-icon" (click)="clearInput()">❎</span>
          }
        </div>
        }@else { @if(inputChanging()){
        <span class="custom-input-icon" (click)="clearInput()">❎</span>
        } }
      </div>
      <span class="message">{{ message() }}</span>
    </div>
  `,
  styles: `
  input {
      min-width: 25ch;
      max-width: 75ch;
      min-height: 40px;
      max-height: 50px;
      padding-left: 4px;      
  }

  .container {    
    display: flex;
    flex-direction: column;
    gap: 0.25rem;  
    max-width: 75ch;;  
  }

  .input-container {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .message {
    font-size: 1rem;
    color: rgb(105, 0, 0);
    margin-top: 4px;
  }

  .custom-input-icon {      
      right: 8px;
      cursor: pointer;
      color: #888;
      font-size: 20px;
      user-select: none;
    }

    .button-icon-close {
      margin-left: -3.4em;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      
    }
  `,
})
export class InputComponent {
  clicked = output<any>();
  button = input<boolean>(true);
  message = input<string>('');
  inputId = input<string>('input-id');
  required = input<boolean>(true);
  type = input<string>('text');
  placeholder = input<string>('Enter text');
  disabled = input<boolean>(false);
  cssClass = input<string>('');
  width = input<number>(25);
  height = input<number>(5);
  color = input<string>('rgb(0, 0, 0)');
  bgColor = input<string>('rgba(240, 240, 240, 0.9)');
  border = input<string>('1px solid rgb(0, 0, 0)');
  borderRadius = input<number>(8);
  fontSize = input<number>(1);
  fontWeight = input<string>('500');
  boxShadow = input<string>('none');
  fontFamily = input<string>('Arial, sans-serif');
  label = input<string>('LABEL');
  labelColor = input<string>('rgb(0, 0, 0)');
  labelStyles = input<{ [key: string]: string }>({});
  icon = input<string>('🔍');

  inputChanging = signal('');
  inputValue = output<string>();
  focus = output<Event>();
  blur = output<Event>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = '';
    if (this.type() === 'number') {
      value = target.value.toString().replace(',', '.');
    } else {
      value = target.value;
    }
    this.inputChanging.set(value);
    this.inputValue.emit(value);
  }

  clearInput() {
    const inputElement = document.querySelector<HTMLInputElement>('#input-id');
    if (inputElement) {
      inputElement.value = '';
      this.clicked.emit(inputElement.value);
      this.inputChanging.set('');
    }
  }
}
