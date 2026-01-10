import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyVehiculosPageRoutingModule } from './my-vehiculos-routing.module';

import { MyVehiculosPage } from './my-vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyVehiculosPageRoutingModule
  ],
  declarations: [MyVehiculosPage]
})
export class MyVehiculosPageModule {}
