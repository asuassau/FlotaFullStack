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

  // elementos para determinar si el usuario actual es admin
  currentUser: any = null;
  isAdmin = false;


  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private storage: Storage,
    private location: Location) { }

  async ngOnInit() {

    // Se crea storage y se determina usuario en uso.
    await this.storage.create();
    await this.loadCurrentUser();
    this.getAllVehiculos();
  }

  ionViewWillEnter() {

    this.getAllVehiculos();

  }


  // obtiene usuario el uso y comprueba si es admin. 
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

  //boton de navegación 
  goBack() {
    this.router.navigateByUrl('/home');
  }

  //se cargan todos los vehículos
  async getAllVehiculos() {

    const token = await this.storage.get('token');

    this.vehiculoService.getVehiculos(token).subscribe(response => {
      this.Vehiculos = response;

    });
  }

  // boton de añadir vehículos. 
  addVehiculo() {
    this.router.navigateByUrl("/vehiculo-form");
  }

  // boton de actualizar vehículo 
  gotoUpdateVehiculos(id: any) {

    this.router.navigateByUrl(`/vehiculo-form/${id}`);
  }

  //botón de borrar vehículo 
  async gotoEraserVehiculos(id: any) {

    const token = await this.storage.get('token');

    this.vehiculoService.delete(id, token).subscribe(() => {
      this.getAllVehiculos();
    });
  }

}
