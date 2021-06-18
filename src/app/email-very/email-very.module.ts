import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailVeryPageRoutingModule } from './email-very-routing.module';

import { EmailVeryPage } from './email-very.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailVeryPageRoutingModule
  ],
  declarations: [EmailVeryPage]
})
export class EmailVeryPageModule {}
