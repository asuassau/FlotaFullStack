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

  id?: number;          // si existe editar, si no existe crear
  isEdit = false;
  // Se aplica para cuando se edita sin imagen. 
  removeImage = false;

  constructor(
    public formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private storage: Storage,
    private location: Location

  ) {
    //Cargas en formulario en el objeto creado y se le indica que campos se van a validar para vehiculoForm.valid
    this.vehiculoForm = this.formBuilder.group({
      matricula: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      anio: ['']
    });
  }

  ngOnInit() {


    //detecta si la pagina se ha abierto con una id en la URL 

    const param = this.activatedRoute.snapshot.paramMap.get('id');

    // Si existe un id, el formulario se utiliza en modo edición   

    if (param) {
      this.id = Number(param);
      this.isEdit = true;
      this.cargarVehiculo(this.id);
    }

  }

  ionViewWillEnter() {
  }

  //para la navegación en la pagina 
  goBack() {
    this.location.back();
  }
  //Carga los datos del vehículo que se van a editar en el formulario

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
  //Se guarda la información del formulario , distinguiendo si viene de la edición o de la creación. 

  async guardar() {

    const token = await this.storage.get('token');

    this.isSubmitted = true;

    //Verifica que el formulario se ha cumplimentado correctamente.

    if (this.vehiculoForm.invalid) {
      this.vehiculoForm.markAllAsTouched();
      return;
    }

    //Se crea varible de tipo Blob para almacenar la foto

    let blob: Blob | null = null;

    //Si se ha subido una foto y si la foto actual es distinta de la original (en caso de edición)

    if (this.capturedPhoto && this.capturedPhoto !== this.originalPhoto) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }
    //Se guarda el contenido del formulario y se añade si la imagen se ha eliminado durante la edicación para borrarla en el backend

    const data = { ...this.vehiculoForm.value, removeImage: this.removeImage };

    // Si se esta editando se realizar update en caso contrario un create

    if (this.isEdit && this.id != null) {
      // MODO EDITAR 
      this.vehiculoService.update(this.id, data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/my-vehiculos');
      });
    } else {
      // MODO CREAR 
      this.vehiculoService.create(data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/my-vehiculos');
      });
    }
  }

  getFormControl(field: string) {
    return this.vehiculoForm.get(field);
  }

  //metodos para las gestión de la foto 
  takePhoto() {

    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
      this.removeImage = false;
    });
  }

  pickImage() {

    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
      this.removeImage = false;
    });
  }

  discardImage() {

    this.capturedPhoto = "";
    this.removeImage = true;
  }



}


