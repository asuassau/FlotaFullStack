import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoFormPageRoutingModule } from './vehiculo-form-routing.module';

import { VehiculoFormPage } from './vehiculo-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VehiculoFormPageRoutingModule
  ],
  declarations: [VehiculoFormPage]
})
export class VehiculoFormPageModule {}
