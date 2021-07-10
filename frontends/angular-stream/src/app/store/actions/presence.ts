import { Action } from '@ngrx/store';

export const LOAD_PRESENCE = '[Presence] Load';
export const LOAD_PRESENCE_SUCCESS = '[Presence] Load Success';
export const LOAD_PRESENCE_FAILED = '[Presence] Load Failed';

export class LoadPresence implements Action {
  readonly type = LOAD_PRESENCE;
}

export class LoadPresenceSuccess implements Action {
  readonly type = LOAD_PRESENCE_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadPresenceFailed implements Action {
  readonly type = LOAD_PRESENCE_FAILED;

  constructor(public payload: any) {}
}

export type All
  = LoadPresence
  | LoadPresenceSuccess
  | LoadPresenceFailed;
