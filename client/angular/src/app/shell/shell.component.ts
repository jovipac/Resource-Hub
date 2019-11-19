import { Component, OnInit } from '@angular/core';
import { ConfigActions } from '../ThemeOptions/store/config.actions';
import { ThemeOptions } from '../theme-options';
import { animate, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('architectUIAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            opacity: 0,
            display: 'flex',
            flex: '1',
            transform: 'translateY(-20px)',
            flexDirection: 'column'
          })
        ]),
        query(':enter', [animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' }))]),

        query(':leave', [animate('600ms ease', style({ opacity: 0, transform: 'translateY(-20px)' }))], {
          optional: true
        })
      ])
    ])
  ]
})
export class ShellComponent implements OnInit {
  constructor(public globals: ThemeOptions, public configActions: ConfigActions) {}

  ngOnInit() {}

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }
}
