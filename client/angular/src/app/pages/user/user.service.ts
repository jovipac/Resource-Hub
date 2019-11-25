import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable()
export class UserService {
  usuario: User;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: User) {
    return this.http.post(`/usuario`, usuario).pipe(
      map((resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }

  actualizarUsuario(usuario: User) {
    let url = `/usuario/${usuario.id}`;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario.id === this.usuario.id) {
          let usuarioDB: User = resp.usuario;
        }
        Swal.fire('Usuario actualizado', usuario.name, 'success');

        return true;
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `/usuario?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    return this.http.get(`/busqueda/coleccion/usuarios/${termino}`).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario(id: string) {
    let url = `/usuario/${id}`;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map((resp: any) => {
        Swal.fire('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
        return true;
      })
    );
  }
}
