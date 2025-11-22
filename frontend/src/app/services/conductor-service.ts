import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConductorService {
  endpoint = 'http://localhost:8080/api/users';

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

  getConductores(token: string) {
    const options = this.getOptions(token);
    return this.httpClient.get(this.endpoint, options);
  }

  create(conductor: any, file?: Blob, token?: string) {
    const formData = new FormData();
    formData.append('username', conductor.username);
    formData.append('password', conductor.password);
    formData.append('name', conductor.name);
    formData.append('surname', conductor.surname);
    formData.append('isAdmin', conductor.isAdmin);

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

  update(id: any, conductor: any, file?: Blob, token?: string) {
    const formData = new FormData();
    formData.append('username', conductor.username);
    formData.append('password', conductor.password);
    formData.append('name', conductor.name);
    formData.append('surname', conductor.surname);
    formData.append('isAdmin', conductor.isAdmin);


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