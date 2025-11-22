import { Component } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router:Router) {}

  gotoMyVehiculos(){
    this.router.navigateByUrl("/my-vehiculos");
  }
  gotoVehiculoForm(){
    this.router.navigateByUrl("/vehiculo-form");

  }
   gotoConductores(){
    this.router.navigateByUrl("/conductores");

  }
}
