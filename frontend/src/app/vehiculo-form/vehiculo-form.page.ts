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
      brand: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])]
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
        brand: vehiculo.brand,
        model: vehiculo.model
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
