import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConductorFormPage } from './conductor-form.page';

const routes: Routes = [
  {
    path: '',
    component: ConductorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConductorFormPageRoutingModule {}
