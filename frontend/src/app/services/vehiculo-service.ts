import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  endpoint = 'http://localhost:8080/api/vehiculos';

  constructor(private httpClient: HttpClient) { }

  getVehiculos() {
    return this.httpClient.get(this.endpoint)
  }
  create(vehiculo: any, file?: Blob) {
    const formData = new FormData();
    formData.append('matricula', vehiculo.matricula);
    formData.append('marca', vehiculo.marca);
    formData.append('modelo', vehiculo.modelo);
    formData.append('anio', vehiculo.anio);

    if (file) {
      // 'file' es el mismo nombre que usas en upload.single('file')
      formData.append('file', file, 'vehiculo.jpg');
    }

    return this.httpClient.post(this.endpoint, formData);
  }
  delete(id: any) {

    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

update(id: any, vehiculo: any, file?: Blob) {
    const formData = new FormData();
    formData.append('matricula', vehiculo.matricula);
    formData.append('marca', vehiculo.marca);
    formData.append('modelo', vehiculo.modelo);
    formData.append('anio', vehiculo.anio);

    if (file) {
      formData.append('file', file, 'vehiculo.jpg');
    }

    return this.httpClient.put(`${this.endpoint}/${id}`, formData);
  }

  getById(id: any) {
    return this.httpClient.get(`${this.endpoint}/${id}`);
  }

}
