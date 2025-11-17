import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../services/vehiculo-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-vehiculos',
  templateUrl: './my-vehiculos.page.html',
  styleUrls: ['./my-vehiculos.page.scss'],
  standalone: false
})
export class MyVehiculosPage implements OnInit {


  Vehiculos: any = []
  

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router) { }

  ngOnInit() {
    this.getAllVehiculos();
  }

  ionViewWillEnter() {
    
    this.getAllVehiculos();

  }

  getAllVehiculos() {

    this.vehiculoService.getVehiculos().subscribe(response => {
      this.Vehiculos = response;

    });
  }

  addVehiculo() {
    this.router.navigateByUrl("/vehiculo-form");
  }

  gotoUpdateVehiculos(id: any) {

    this.router.navigateByUrl(`/vehiculo-form/${id}`);
  }
  gotoEraserVehiculos(id: any) {

    this.vehiculoService.delete(id).subscribe(() => {
      this.getAllVehiculos();
    });
  }


}
