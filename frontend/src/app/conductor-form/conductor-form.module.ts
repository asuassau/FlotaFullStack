import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductorFormPageRoutingModule } from './conductor-form-routing.module';

import { ConductorFormPage } from './conductor-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConductorFormPageRoutingModule,
     
  ],
  declarations: [ConductorFormPage]
})
export class ConductorFormPageModule {}
