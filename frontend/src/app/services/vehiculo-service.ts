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
  create(vehiculo: any) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  const body = new URLSearchParams();
  body.append("matricula", vehiculo.matricula);
  body.append("marca", vehiculo.marca);
  body.append("modelo", vehiculo.modelo);
  body.append("anio", vehiculo.anio);

  return this.httpClient.post(this.endpoint, body.toString(), { headers });
}
  delete (id:any){

   return this.httpClient.delete(`${this.endpoint}/${id}`);
  }

  update (id:any, body: any){

  return this.httpClient.put(`${this.endpoint}/${id}`, body);
  
  }

  getById(id:any) {
  return this.httpClient.get(`${this.endpoint}/${id}`);
}

}
