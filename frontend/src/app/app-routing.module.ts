import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'my-vehiculos',
    loadChildren: () => import('./my-vehiculos/my-vehiculos.module').then(m => m.MyVehiculosPageModule)
  },
  {
    path: 'vehiculo-form',
    loadChildren: () => import('./vehiculo-form/vehiculo-form.module').then(m => m.VehiculoFormPageModule)
  },

  {
    path: 'vehiculo-form/:id',
    loadChildren: () => import('./vehiculo-form/vehiculo-form.module')
      .then(m => m.VehiculoFormPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'conductores',
    loadChildren: () => import('./conductores/conductores.module').then(m => m.ConductoresPageModule)
  },

  {
    path: 'conductor-form',
    loadChildren: () => import('./conductor-form/conductor-form.module').then(m => m.ConductorFormPageModule)
  },
  {
    path: 'conductor-form/:id',
    loadChildren: () => import('./conductor-form/conductor-form.module')
      .then(m => m.ConductorFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
