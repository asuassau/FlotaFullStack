import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../services/vehiculo-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo-service';
import { Storage } from '@ionic/storage-angular';
import { Location } from '@angular/common';





@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.page.html',
  styleUrls: ['./vehiculo-form.page.scss'],
  standalone: false

})
export class VehiculoFormPage implements OnInit {

  vehiculoForm: FormGroup;
  capturedPhoto: string = "";
  originalPhoto: string = "";
  isSubmitted: boolean = false;

  id?: number;          // si existe → editar, si no existe → crear
  isEdit = false;


  constructor(
    public formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private storage: Storage,
    private location: Location

  ) {
    this.vehiculoForm = this.formBuilder.group({
      matricula: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      anio: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {



    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      this.id = Number(param);
      this.isEdit = true;
      this.cargarVehiculo(this.id);
    }


  }

  ionViewWillEnter() {
  }

  goBack() {
    this.location.back();
  }

  async cargarVehiculo(id: number) {

    const token = await this.storage.get('token');

    this.vehiculoService.getById(id, token).subscribe((vehiculo: any) => {
      this.vehiculoForm.patchValue({
        matricula: vehiculo.matricula,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        anio: vehiculo.anio,
      });
      if (vehiculo.filename) {
        this.originalPhoto = 'http://localhost:8080/images/' + vehiculo.filename;
        this.capturedPhoto = this.originalPhoto;
      }
    });
  }

  async guardar() {

    const token = await this.storage.get('token');

    this.isSubmitted = true;

    if (this.vehiculoForm.invalid) {
      this.vehiculoForm.markAllAsTouched();
      return;
    }

    let blob: Blob | null = null;

    if (this.capturedPhoto && this.capturedPhoto!==this.originalPhoto) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    const data = this.vehiculoForm.value;

    if (this.isEdit && this.id != null) {
      // MODO EDITAR → PUT (envío también blob, si existe)
      this.vehiculoService.update(this.id, data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/my-vehiculos');
      });
    } else {
      // MODO CREAR → POST
      this.vehiculoService.create(data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/my-vehiculos');
      });
    }
  }

  getFormControl(field: string) {
    return this.vehiculoForm.get(field);
  }


  takePhoto() {

    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    });
  }

  pickImage() {

    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {

    this.capturedPhoto = "";
  }



}


