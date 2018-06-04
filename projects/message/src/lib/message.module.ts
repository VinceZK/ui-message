import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class MessageModule { }
