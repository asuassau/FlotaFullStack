import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyVehiculosPage } from './my-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: MyVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyVehiculosPageRoutingModule {}
