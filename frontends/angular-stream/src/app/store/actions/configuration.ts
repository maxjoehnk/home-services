import { Action } from '@ngrx/store';

export const LOAD_CONFIGURATION = '[Configuration] Load';
export const LOAD_CONFIGURATION_SUCCESS = '[Configuration] Load Success';
export const LOAD_CONFIGURATION_FAILED = '[Configuration] Load Failed';

interface Configuration {
    stream: boolean;
    scenes: boolean;
    presence: boolean;
    chips: boolean;
}

export class LoadConfiguration implements Action {
  readonly type = LOAD_CONFIGURATION;
}

export class LoadConfigurationSuccess implements Action {
  readonly type = LOAD_CONFIGURATION_SUCCESS;

  constructor(public payload: Configuration) {}
}

export class LoadConfigurationFailed implements Action {
  readonly type = LOAD_CONFIGURATION_FAILED;

  constructor(public payload: any) {}
}

export type All
  = LoadConfiguration
  | LoadConfigurationSuccess
  | LoadConfigurationFailed;
