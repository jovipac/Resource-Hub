import { Injectable } from '@angular/core';
import { ArchitectUIState } from './index';
import { Store } from '@ngrx/store';

@Injectable()
export class ConfigActions {
  static CONFIG_GET = 'CONFIG_GET';
  static CONFIG_UPDATE = 'CONFIG_UPDATE';

  constructor(private ngRedux: Store<ArchitectUIState>) {}

  getConfig() {
    this.ngRedux.dispatch({
      type: ConfigActions.CONFIG_GET
    });
  }

  updateConfig(config: any): void {
    this.ngRedux.dispatch({
      type: ConfigActions.CONFIG_UPDATE,
      payload: config
    });
  }
}
