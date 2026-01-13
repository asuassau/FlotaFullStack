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


  conductorForm: FormGroup
  capturedPhoto: string = "";
  originalPhoto: string = "";

  isSubmitted: boolean = false;

  id?: number;          // si existe editar, si no existe crear
  isEdit = false;

  // Se aplica para cuando se edita sin imagen. 
  removeImage = false;

  //Necesario para ver si se dan o no permisos de administrador 
  currentUser: any = null;
  isAdmin = false;

  constructor(
    public formBuilder: FormBuilder,
    private conductorService: ConductorService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private storage: Storage,
    private location: Location,

  ) {

    //Cargas en formulario en el objeto creado y se le indica que campos se van a validar para conductorForm.valid
    this.conductorForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: [''],
      name: ['', Validators.compose([Validators.required])],
      surname: [''],
      isAdmin: [0, Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() {

    //Creas storage 
    await this.storage.create();
    await this.loadCurrentUser();

    //detecta si la pagina se ha abierto con una id en la URL 
    const param = this.activatedRoute.snapshot.paramMap.get('id');

    // Si existe un id, el formulario se utiliza en modo edición   
    if (param) {
      this.id = Number(param);
      this.isEdit = true;
      this.cargarConductor(this.id);
    }

    // Crear :password obligatorio
    if (!this.isEdit) {

      this.conductorForm.get('password')?.setValidators([Validators.required]);
    }
    // Editar: password opcional
    else {

      this.conductorForm.get('password')?.clearValidators();
    }

    // Recalcula el estado del formulario
    this.conductorForm.get('password')?.updateValueAndValidity();
  }

  ionViewWillEnter() {
  }

  //verifica si el usuario actual es admin 
  private async loadCurrentUser() {
    this.currentUser = await this.storage.get('user');

    // si currentUser no existe aún
    if (!this.currentUser) {
      this.isAdmin = false;
      return;
    }

    // normaliza: si viene 1/0 o true/false
    this.isAdmin = this.currentUser.isAdmin == 1 || this.currentUser.isAdmin === true;
  }

  //para la navegación en la pagina 
  goBack() {
    this.location.back();
  }


  //Carga los datos del conductor que se van a editar en el formulario
  async cargarConductor(id: number) {

    const token = await this.storage.get('token');

    this.conductorService.getById(id, token).subscribe((conductor: any) => {
      this.conductorForm.patchValue({
        username: conductor.username,
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

  //Se guarda la información del formulario , distinguiendo si viene de la edición o de la creación. 
  async guardar() {

    const token = await this.storage.get('token');

    this.isSubmitted = true;

    //Verifica que el formulario se ha cumplimentado correctamente.
    if (this.conductorForm.invalid) {
      this.conductorForm.markAllAsTouched();
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
    const data = { ...this.conductorForm.value, removeImage: this.removeImage };

    // Si se esta editando se realizar update en caso contrario un create
    if (this.isEdit && this.id != null) {
      // MODO EDITAR
      this.conductorService.update(this.id, data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/conductores');
      });
    } else {
      // MODO CREAR 
      this.conductorService.create(data, blob ?? undefined, token).subscribe(() => {
        this.route.navigateByUrl('/conductores');
      });
    }
  }

  //metodo para el ion-note (prueba : el nombre el obligatorio)
  getFormControl(field: string) {
    return this.conductorForm.get(field);
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


