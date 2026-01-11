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
  currentUser: any = null;
  isAdmin = false;


  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private storage: Storage,
    private location: Location) { }

  async ngOnInit() {
    await this.storage.create();
    await this.loadCurrentUser();
    this.getAllVehiculos();
  }

  ionViewWillEnter() {

    this.getAllVehiculos();

  }


   private async loadCurrentUser() {
    this.currentUser = await this.storage.get('user');

    // si currentUser no existe aún, dejamos todo seguro
    if (!this.currentUser) {
      this.isAdmin = false;
      return;
    }

    // normaliza: si viene 1/0 o true/false
    this.isAdmin = this.currentUser.isAdmin == 1 || this.currentUser.isAdmin === true;
  }

  goBack() {
    this.router.navigateByUrl('/home');
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
