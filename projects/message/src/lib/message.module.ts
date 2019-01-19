import { NgModule } from '@angular/core';
import { MessageComponent } from './message.component';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class MessageModule { }
