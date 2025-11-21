import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  endpoint = 'http://localhost:8080/api/vehiculos';

  constructor(private httpClient: HttpClient) {


    
  }

  // === Nuevo método para las opciones con token ===
  private getOptions(token: string) {
    const bearerAccess = 'Bearer ' + token;

    const options = {
      headers: {
        'Authorization': bearerAccess,
      }
    };

    return options;
  }

  // === Métodos adaptados ===

  getVehiculos(token: string) {
    const options = this.getOptions(token);
    return this.httpClient.get(this.endpoint, options);
  }

  create(vehiculo: any, file?: Blob, token?: string) {
    const formData = new FormData();
    formData.append('matricula', vehiculo.matricula);
    formData.append('marca', vehiculo.marca);
    formData.append('modelo', vehiculo.modelo);
    formData.append('anio', vehiculo.anio);

    if (file) {
      formData.append('file', file);
    }

    const options = token ? this.getOptions(token) : {};
    return this.httpClient.post(this.endpoint, formData, options);
  }

  delete(id: any, token: string) {
    const options = this.getOptions(token);
    return this.httpClient.delete(`${this.endpoint}/${id}`, options);
  }

  update(id: any, vehiculo: any, file?: Blob, token?: string) {
    const formData = new FormData();
    formData.append('matricula', vehiculo.matricula);
    formData.append('marca', vehiculo.marca);
    formData.append('modelo', vehiculo.modelo);
    formData.append('anio', vehiculo.anio);

    if (file) {
      formData.append('file', file);
    }

    const options = token ? this.getOptions(token) : {};
    return this.httpClient.put(`${this.endpoint}/${id}`, formData, options);
  }

  getById(id: any, token: string) {
    const options = this.getOptions(token);
    return this.httpClient.get(`${this.endpoint}/${id}`, options);
  }
}
