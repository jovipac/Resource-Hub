import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from './users.model';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    usuarios: Users[] = [];
    desde: number = 0;

    totalRegistros: number = 0;
    isLoading: boolean = true;

    constructor(public _usuarioService: UsersService) {}

    ngOnInit() {
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.isLoading = true;

        this._usuarioService
            .cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                this.totalRegistros = resp.total;
                this.usuarios = resp;
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
        this.cargarUsuarios();
    }

    buscarUsuario(termino: string) {
        if (termino.length <= 0) {
            this.cargarUsuarios();
            return;
        }

        this.isLoading = true;

        this._usuarioService
            .buscarUsuarios(termino)
            .subscribe((usuarios: Users[]) => {
                this.usuarios = usuarios;
                this.isLoading = false;
            });
    }

    borrarUsuario(usuario: Users) {
        Swal.fire({
            title: '¿Esta seguro?',
            text: 'Esta a punto de borrar a ' + usuario.name,
            type: 'error',
            showCancelButton: true,
            confirmButtonText: 'Aceptar'
        }).then(result => {
            if (result.value) {
                this._usuarioService
                    .borrarUsuario(usuario.id)
                    .subscribe(borrado => {
                        this.cargarUsuarios();
                    });
            }
        });
    }
    /*
    guardarUsuario(usuario: Users) {
        this._usuarioService.actualizarUsuario(usuario).subscribe();
    }
    */
}
