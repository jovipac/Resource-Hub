import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap, switchMap, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Users, UserModel } from './users.model';
import { CredentialsService } from '../../core/authentication/credentials.service';

import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usuario: Users;
    token: string;
    menu: any[] = [];
    private _branches = new BehaviorSubject<UserModel[]>([]);

    constructor(
        private credentialService: CredentialsService,
        public http: HttpClient,
        public router: Router
    ) {
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

    guardarStorage(id: string, token: string, usuario: Users, menu: any) {
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

    crearUsuario(usuario: Users) {
        return this.http.post(`/api/users`, usuario).pipe(
            map((resp: any) => {
                Swal.fire('Usuario creado', usuario.email, 'success');
                return resp.usuario;
            })
        );
    }

    actualizarUsuario(usuario: Users) {
        let url = `/usuario/${usuario.id}`;
        url += '?token=' + this.token;

        return this.http.put(url, usuario).pipe(
            map((resp: any) => {
                if (usuario.id === this.usuario.id) {
                    let usuarioDB: Users = resp.usuario;
                }
                Swal.fire('Usuario actualizado', usuario.name, 'success');

                return true;
            })
        );
    }
    /*
  cargarUsuarios(desde: number = 0) {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.api.v1+json',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
    });
    const url = `/api/users?page=${desde}`;
    return this.http.get(url, { headers });
  }
*/
    cargarUsuarios(desde: number = 0) {
        return this.credentialService.token.pipe(
            take(1),
            switchMap(token => {
                if (!token) {
                    throw new Error('¡Expiró la session de usuario!');
                }
                const headers = new HttpHeaders({
                    Accept: 'application/vnd.api.v1+json',
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + token,
                    'Access-Control-Allow-Headers':
                        'Origin, Content-Type, Accept, Authorization'
                });

                return this.http.get<{ [key: string]: Users }>(
                    `/api/users?page=${desde}`,
                    { headers }
                );
            }),
            tap(branches => {
                console.log(branches);
            }),
            map(resData => {
                const branches = [];
                for (const key in resData) {
                    if (resData.hasOwnProperty(key)) {
                        branches.push(
                            new UserModel(
                                resData[key].id,
                                resData[key].username,
                                resData[key].name,
                                resData[key].email,
                                resData[key].created_at
                            )
                        );
                    }
                }
                return branches;
            }),
            tap(branches => {
                this._branches.next(branches);
            })
        );
    }

    buscarUsuarios(termino: string) {
        return this.http
            .get(`/api/users/${termino}`)
            .pipe(map((resp: any) => resp.usuarios));
    }

    borrarUsuario(id: string) {
        let url = `/api/users${id}`;
        url += '?token=' + this.token;

        return this.http.delete(url).pipe(
            map((resp: any) => {
                Swal.fire(
                    'Usuario borrado',
                    'El usuario a sido eliminado correctamente',
                    'success'
                );
                return true;
            })
        );
    }
}
