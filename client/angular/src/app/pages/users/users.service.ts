import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap, switchMap, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Users, UserEntity } from './users.model';
import { CredentialsService } from '../../core/authentication/credentials.service';
import { Logger, I18nService } from '@app/core';

import { environment } from '@env/environment';
import { UtilsService } from '../../core/utils.service';
import Swal from 'sweetalert2';

const log = new Logger('Usuarios');
@Injectable({
    providedIn: 'root'
})
export class UsersService {
    usuario: Users;
    private _users = new BehaviorSubject<UserEntity[]>([]);

    constructor(
        private credentialService: CredentialsService,
        public http: HttpClient,
        public router: Router,
        private utilsService: UtilsService
    ) {}

    crearUsuario(usuario: Users) {
        return this.http.post(`/api/users`, usuario).pipe(
            map((resp: any) => {
                Swal.fire('Usuario creado', usuario.email, 'success');
                return resp.usuario;
            })
        );
    }
    /*
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

                return this.http.get<{ [key: string]: UserEntity }>(
                    `/api/users?page=${desde}`,
                    { headers }
                );
            }),
            tap(users => {
                console.log(users);
            }),
            map(resData => {
                const users = [];
                const itemData = resData.data;
                for (const key in itemData) {
                    if (itemData.hasOwnProperty(key)) {
                        const decodeKey = environment.app_key;

                        users.push(
                            new UserEntity(
                                itemData[key].id,
                                this.utilsService.decryptAES(
                                    decodeKey,
                                    itemData[key].username
                                ),
                                this.utilsService.decryptAES(
                                    decodeKey,
                                    itemData[key].name
                                ),
                                itemData[key].first_name,
                                itemData[key].last_name,
                                this.utilsService.decryptAES(
                                    decodeKey,
                                    itemData[key].email
                                ),
                                itemData[key].created_at
                            )
                        );
                    }
                }
                return users;
            }),
            tap(users => {
                this._users.next(users);
            })
        );
    }

    buscarUsuarios(termino: string) {
        return this.http
            .get(`/api/users/${termino}`)
            .pipe(map((resp: any) => resp.usuarios));
    }

    borrarUsuario(id: string) {
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

                return this.http.delete(`/api/users/${id}`, { headers });
            }),
            map((resp: any) => {
                Swal.fire(
                    'Usuario borrado',
                    'El usuario a sido eliminado correctamente',
                    'success'
                );
                return true;
            }),
            tap(user => {
                log.debug(user);
            })
        );
    }
}
