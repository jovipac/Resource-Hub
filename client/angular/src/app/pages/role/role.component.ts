import { Component, OnInit } from '@angular/core';
import { RolesService } from './roles.service';
import { Roles } from './roles.model';

import Swal from 'sweetalert2';
@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
    roles: Roles[] = [];
    desde: number = 0;

    totalRegistros: number = 0;
    isLoading: boolean = true;

    constructor(public _usuarioService: RolesService) {}

    ngOnInit() {
        this.cargarRoles();
    }

    cargarRoles() {
        this.isLoading = true;

        this._usuarioService.cargarRoles(this.desde).subscribe((resp: any) => {
            this.totalRegistros = resp.total;
            this.roles = resp;
            this.isLoading = false;
        });
    }

    cambiarDesde(valor: number) {
        let desde = this.desde + valor;

        if (desde >= this.totalRegistros) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarRoles();
    }

    buscarRole(termino: string) {
        if (termino.length <= 0) {
            this.cargarRoles();
            return;
        }

        this.isLoading = true;

        this._usuarioService
            .buscarRoles(termino)
            .subscribe((roles: Roles[]) => {
                this.roles = roles;
                this.isLoading = false;
            });
    }

    borrarRole(usuario: Roles) {
        Swal.fire({
            title: '¿Esta seguro?',
            text: 'Esta a punto de borrar a ' + usuario.name,
            type: 'error',
            showCancelButton: true,
            confirmButtonText: 'Aceptar'
        }).then(result => {
            if (result.value) {
                this._usuarioService.borrarRole(usuario.id).subscribe(() => {
                    this.cargarRoles();
                });
            }
        });
    }
}
