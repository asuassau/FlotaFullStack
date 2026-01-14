import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../services/conductor-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.page.html',
  styleUrls: ['./conductores.page.scss'],
  standalone: false,

})
export class ConductoresPage implements OnInit {

  Conductores: any = []

  //elementos para determinar el usuario en uso. 
  currentUser: any = null;
  isAdmin = false;

  constructor(
    private conductorService: ConductorService,
    private router: Router,
    private storage: Storage,
    private location: Location) { }

  async ngOnInit() {

    // Se crea storage y se determina usuario en uso.
    await this.storage.create();
    await this.loadCurrentUser();

    this.getAllConductores();
  }

  async ionViewWillEnter() {
    await this.storage.create();
    await this.loadCurrentUser();
    this.getAllConductores();

  }
  // obtiene usuario el uso y comprueba si es admin. 

  private async loadCurrentUser() {
    this.currentUser = await this.storage.get('user');

    if (!this.currentUser) {
      this.isAdmin = false;
      return;
    }

    // normaliza: si viene 1/0 o true/false
    this.isAdmin = this.currentUser.isAdmin == 1 || this.currentUser.isAdmin === true;
  }

// indica si puede editar 
  canEdit(id: number): boolean {
    return this.isAdmin || this.currentUser?.id === id;
  }

//boton de navegación 
  goBack() {
    this.router.navigateByUrl('/home');
  }

//nuestra los conductores
  async getAllConductores() {

    const token = await this.storage.get('token');

    this.conductorService.getConductores(token).subscribe(response => {
      this.Conductores = response;

    });
  }

  //boton de añadir conductores
  addConductores() {
    this.router.navigateByUrl("/conductor-form");
  }

  //boton de actualizar conductores
  gotoUpdateConductores(id: any) {

    this.router.navigateByUrl(`/conductor-form/${id}`);
  }
    
  //boton de borrar  conductores

  async gotoEraserConductores(id: any) {

    const token = await this.storage.get('token');

    this.conductorService.delete(id, token).subscribe(() => {
      this.getAllConductores();
    });
  }

}
