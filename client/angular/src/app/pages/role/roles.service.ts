import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap, switchMap, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Roles, RoleEntity } from './roles.model';
import { CredentialsService } from '../../core/authentication/credentials.service';
import { Logger, I18nService } from '@app/core';

import { environment } from '@env/environment';
import { UtilsService } from '../../core/utils.service';
import Swal from 'sweetalert2';

const log = new Logger('Roles');
@Injectable({
    providedIn: 'root'
})
export class RolesService {
    rol: Roles;
    private _roles = new BehaviorSubject<RoleEntity[]>([]);

    constructor(
        private credentialService: CredentialsService,
        public http: HttpClient,
        public router: Router,
        private utilsService: UtilsService
    ) {}

    cargarRoles(desde: number = 0) {
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

                return this.http.get<{ [key: string]: RoleEntity }>(
                    `/api/roles?page=${desde}`,
                    { headers }
                );
            }),
            tap(roles => {
                console.log(roles);
            }),
            map(resData => {
                const roles = [];
                const itemData = resData.data;
                for (const key in itemData) {
                    if (itemData.hasOwnProperty(key)) {
                        const decodeKey = environment.app_key;

                        roles.push(
                            new RoleEntity(
                                itemData[key].id,
                                this.utilsService.decryptAES(
                                    decodeKey,
                                    itemData[key].name
                                )
                            )
                        );
                    }
                }
                return roles;
            }),
            tap(roles => {
                this._roles.next(roles);
            })
        );
    }

    buscarRoles(termino: string) {
        return this.http
            .get(`/api/roles/${termino}`)
            .pipe(map((resp: any) => resp.roles));
    }

    borrarRole(id: string) {
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

                return this.http.delete(`/api/roles/${id}`, { headers });
            }),
            map((resp: any) => {
                Swal.fire(
                    'Rol borrado',
                    'El rol a sido eliminado correctamente',
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
