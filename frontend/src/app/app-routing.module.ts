import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'my-vehiculos',
    loadChildren: () => import('./my-vehiculos/my-vehiculos.module').then( m => m.MyVehiculosPageModule)
  },
  {
    path: 'vehiculo-form',
    loadChildren: () => import('./vehiculo-form/vehiculo-form.module').then( m => m.VehiculoFormPageModule)
  },

  {
  path: 'vehiculo-form/:id',
  loadChildren: () => import('./vehiculo-form/vehiculo-form.module')
    .then(m => m.VehiculoFormPageModule)
}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
