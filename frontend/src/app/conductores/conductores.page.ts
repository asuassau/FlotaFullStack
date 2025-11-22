import { Component, OnInit } from '@angular/core';
import { ConductorService} from '../services/conductor-service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.page.html',
  styleUrls: ['./conductores.page.scss'],
  standalone: false,

})
export class ConductoresPage implements OnInit {

 Conductores: any = []
  

  constructor(
    private conductorService: ConductorService,
    private router: Router,
    private storage: Storage) { }

  ngOnInit() {

    this.getAllConductores();
  }

  ionViewWillEnter() {
    
    this.getAllConductores();

  }

  async getAllConductores() {

    const token = await this.storage.get('token');

    this.conductorService.getConductores(token).subscribe(response => {
      this.Conductores = response;

    });
  }

  addConductores() {
    this.router.navigateByUrl("/conductor-form");
  }

  gotoUpdateConductores(id: any) {

    this.router.navigateByUrl(`/conductor-form/${id}`);
  }
  async gotoEraserConductores(id: any) {

    const token = await this.storage.get('token');

    this.conductorService.delete(id,token).subscribe(() => {
      this.getAllConductores();
    });
  }

}
