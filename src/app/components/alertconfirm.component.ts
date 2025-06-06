import { Component, input, output } from '@angular/core';
import { ButtonComponent } from './button.component';
import { AlertconfirmService } from '../services/alertconfirm.service';

@Component({
  selector: 'app-alertconfirm',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div
      class="alert-confirm"
      [style.width.%]="width()"
      [style.height]="height()"
      [style.backgroundColor]="bgColor()"
      [style.borderRadius.px]="borderRadius()"
      [style.padding]="padding()"
      [style.boxShadow]="boxShadow()"
      [style.border]="border()"
      [style.position]="position()"
      [style.top.%]="top()"
      [style.left.%]="left()"
      [style.transform]="'translate(-50%, -50%)'"
    >
      <h2
        [style.fontSize.em]="titleFontSize()"
        [style.fontWeight]="titleFontWeight()"
        [style.color]="titleColor()"
        [style.textAlign]="titleTextAlign()"
      >
        {{ title() }}
      </h2>
      <div class="alert-confirm-content">
        <p
          [style.fontSize.em]="messageFontSize()"
          [style.color]="messageColor()"
          [style.textAlign]="messageTextAlign()"
        >
          {{ message() }}
        </p>
        <div class="button-container"><app-button 
        [width]="7.5"
        [text]="'chiudi'"
        [fontSize]="1"
        (click)="closeFun()"
        />
        @if(confirmation()) {
        <app-button 
        [width]="7.5"
        [text]="'conferma'"
        [bgColor]="'rgb(0, 138, 11)'"
        [fontSize]="1"
        (click)="confirmFun()"/>}</div>
      </div>
    </div>
  `,
  styles: `
    .alert-confirm{
      z-index: 1000;
      display: flex;
      flex-direction: column;  
    }

    .alert-confirm-content {
      display: flex;
      flex-direction: column;      
      gap: 32px;      
      width: 100%;
      height: 100%;
      padding-bottom: 16px;
    }

   p{
    width: 100%;
    height: auto;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin: 0;
   }

  .button-container {      
      display: flex;
      justify-content: center;
      align-items: end;
      flex-direction: row;
      gap: 32px;
    }
  `,
})
export class AlertconfirmComponent {
  title = input<string>('Alert Confirmation');
  message = input<string>('Are you sure you want to proceed?............................................................................................................................................................');
  width = input<number>(30);
  height = input<string>('fit-content');
  bgColor = input<string>('rgb(255, 255, 255)');
  borderRadius = input<number>(8);
  padding = input<string>('0 24px');
  boxShadow = input<string>('0 2px 4px rgba(0, 0, 0, 0.5)');
  border = input<string>('1px solid rgb(255, 255, 255)');
  position = input<string>('absolute');
  top = input<number>(50);
  left = input<number>(50);
  confirmation = input<boolean>(false);

  titleFontSize = input<number>(1.5);
  titleFontWeight = input<string>('bold');
  titleColor = input<string>('rgb(143, 0, 0)');
  titleTextAlign = input<string>('center');

  messageFontSize = input<number>(1);
  messageColor = input<string>('rgb(0, 0, 0)');
  messageTextAlign = input<string>('');

  close = output<boolean>();
  confirm = output<boolean>();

  constructor(private alertconfirmService : AlertconfirmService) {}

  closeFun(){
    this.alertconfirmService.confirmed.set(false);
    this.alertconfirmService.reset();
  }

  confirmFun(){
    this.alertconfirmService.confirmed.set(true);
    this.alertconfirmService.reset();
  }
  
}
