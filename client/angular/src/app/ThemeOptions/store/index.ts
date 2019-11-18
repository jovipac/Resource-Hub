import { combineReducers } from 'redux';
import { ConfigReducer } from './config.reducer';

export class ArchitectUIState {
  config: any;
}

export const rootReducer = combineReducers<ArchitectUIState>({
  config: ConfigReducer
});
