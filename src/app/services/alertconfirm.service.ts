import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertconfirmService {

message = signal<string>('');
title = signal<string>('');
confirmation = signal<boolean>(false);
confirmed = signal<boolean>(false);

  constructor() { }

  reset() {
  this.message.set('');
  this.title.set('');
  this.confirmation.set(false); 
  }

  setAlert(alertconfirm: AlertConfirmConfig) {
    this.message.set(alertconfirm.message);
    this.title.set(alertconfirm.title);
    this.confirmation.set(alertconfirm.confirmation);
    console.log('Alert set:', alertconfirm);
  }

}

export interface AlertConfirmConfig {
  message: string;
  title: string;
  confirmation: boolean;
}
