import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../services/conductor-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo-service';
import { Storage } from '@ionic/storage-angular'
import { Location } from '@angular/common';

@Component({
  selector: 'app-conductor-form',
  templateUrl: './conductor-form.page.html',
  styleUrls: ['./conductor-form.page.scss'],
  standalone: false,
})
export class ConductorFormPage implements OnInit {


  conductorForm: FormGroup;
  capturedPhoto: string = "";
  originalPhoto: string = "";

  isSubmitted: boolean = false;

  id?: number;          // si existe → editar, si no existe → crear
  isEdit = false;


  constructor(
    public formBuilder: FormBuilder,
    private conductorService: ConductorService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private storage: Storage,
    private location: Location

  ) {
    this.conductorForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],

      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      isAdmin: [0, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {


    const param = this.activatedRoute.snapshot.paramMap.get('id');
    if (param) {
      this.id = Number(param);
      this.isEdit = true;
      this.cargarConductor(this.id);
    }
  }

  ionViewWillEnter() {
  }

  goBack() {
    this.location.back();
  }

  async cargarConductor(id: number) {

    const token = await this.storage.get('token');

    this.conductorService.getById(id, token).subscribe((conductor: any) => {
      this.conductorForm.patchValue({
        username: conductor.username,
       /* password: conductor.password,*/
        name: conductor.name,
        surname: conductor.surname,
        isAdmin: conductor.isAdmin
      });
      if (conductor.filename) {
        this.originalPhoto = 'http://localhost:8080/images/' + conductor.filename;
        this.capturedPhoto = this.originalPhoto;
      }
    });
  }

  async guardar() {

    const token = await this.storage.get('token');

    this.isSubmitted = true;

    if (this.conductorForm.invalid) {
      this.conductorForm.markAllAsTouched();
      return;
    }

    let blob: Blob | null = null;

    if (this.capturedPhoto && this.capturedPhoto!==this.originalPhoto) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    const data = this.conductorForm.value;

    if (this.isEdit && this.id != null) {
      // MODO EDITAR → PUT (envío también blob, si existe)
      this.conductorService.update(this.id, data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/conductores');
      });
    } else {
      // MODO CREAR → POST
      this.conductorService.create(data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/conductores');
      });
    }
  }

  getFormControl(field: string) {
    return this.conductorForm.get(field);
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


