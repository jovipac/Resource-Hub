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
    cargando: boolean = true;

    constructor(
        public _usuarioService: UsersService //public _modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.cargando = true;

        this._usuarioService
            .cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                this.totalRegistros = resp.total;
                this.usuarios = resp;
                this.cargando = false;
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

        this.cargando = true;

        this._usuarioService
            .buscarUsuarios(termino)
            .subscribe((usuarios: Users[]) => {
                this.usuarios = usuarios;
                this.cargando = false;
            });
    }

    borrarUsuario(usuario: Users) {
        if (usuario.id === this._usuarioService.usuario.id) {
            Swal.fire(
                'No puede borrar usuario',
                'No se puede borrar a si mismo',
                'error'
            );
            return;
        }

        Swal.fire({
            title: '¿Esta seguro?',
            text: 'Esta a punto de borrar a ' + usuario.name,
            type: 'error',
            confirmButtonText: 'Cool'
        }).then(borrar => {
            if (borrar) {
                this._usuarioService
                    .borrarUsuario(usuario.id)
                    .subscribe(borrado => {
                        this.cargarUsuarios();
                    });
            }
        });
    }

    guardarUsuario(usuario: Users) {
        this._usuarioService.actualizarUsuario(usuario).subscribe();
    }
}
