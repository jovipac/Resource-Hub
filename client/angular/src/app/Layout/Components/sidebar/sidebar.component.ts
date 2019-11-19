import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  activeId = 'dashboardsMenu';

  private newInnerWidth: number;
  private innerWidth: number;

  constructor(public globals: ThemeOptions, private activatedRoute: ActivatedRoute) {}

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    if (this.activatedRoute.snapshot.firstChild.data.extraParameter === undefined) {
      this.extraParameter = '';
    } else {
      this.extraParameter = this.activatedRoute.snapshot.firstChild.data.extraParameter;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
  }
}
