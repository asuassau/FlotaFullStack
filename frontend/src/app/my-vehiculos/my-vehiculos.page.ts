import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../services/vehiculo-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Location } from '@angular/common';


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
    private router: Router,
    private storage: Storage,
    private location: Location) { }

  ngOnInit() {

    this.getAllVehiculos();
  }

  ionViewWillEnter() {

    this.getAllVehiculos();

  }

  goBack() {
    this.location.back();
  }
  async getAllVehiculos() {

    const token = await this.storage.get('token');

    this.vehiculoService.getVehiculos(token).subscribe(response => {
      this.Vehiculos = response;

    });
  }

  addVehiculo() {
    this.router.navigateByUrl("/vehiculo-form");
  }

  gotoUpdateVehiculos(id: any) {

    this.router.navigateByUrl(`/vehiculo-form/${id}`);
  }
  async gotoEraserVehiculos(id: any) {

    const token = await this.storage.get('token');

    this.vehiculoService.delete(id, token).subscribe(() => {
      this.getAllVehiculos();
    });
  }

}
