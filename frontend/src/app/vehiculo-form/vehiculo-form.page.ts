import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../services/vehiculo-service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.page.html',
  styleUrls: ['./vehiculo-form.page.scss'],
  standalone: false

})
export class VehiculoFormPage implements OnInit {

  vehiculoForm: FormGroup;

  id?: number;          // si existe → editar, si no existe → crear
  isEdit = false;
  

 constructor(
    public formBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private route: Router,
    private activatedRoute: ActivatedRoute
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

   cargarVehiculo(id: number) {
    this.vehiculoService.getById(id).subscribe((vehiculo: any) => {
      // Rellenar el formulario con los datos existentes
      this.vehiculoForm.patchValue({
        matricula: vehiculo.matricula,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        anio: vehiculo.anio,
      });
    });
  }

guardar() {
    if (this.vehiculoForm.invalid) {
      this.vehiculoForm.markAllAsTouched();
      return;
    }

    if (this.isEdit && this.id != null) {
      // MODO EDITAR → PUT
      this.vehiculoService.update(this.id, this.vehiculoForm.value).subscribe(() => {
      this.route.navigateByUrl('/my-vehiculos');
      });
    } else {
      // MODO CREAR → POST
      this.vehiculoService.create(this.vehiculoForm.value).subscribe(() => {
      this.route.navigateByUrl('/my-vehiculos');
      });
    }
  }

  getFormControl(field: string) {
    return this.vehiculoForm.get(field);
  }
}
