import { Action } from '@ngrx/store';

export const LOAD_CHIPS = '[Chips] Load';
export const LOAD_CHIPS_SUCCESS = '[Chips] Load Success';
export const LOAD_CHIPS_FAILED = '[Chips] Load Failed';

export class LoadChips implements Action {
  readonly type = LOAD_CHIPS;
}

export class LoadChipsSuccess implements Action {
  readonly type = LOAD_CHIPS_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadChipsFailed implements Action {
  readonly type = LOAD_CHIPS_FAILED;

  constructor(public payload: any) {}
}

export type All
  = LoadChips
  | LoadChipsSuccess
  | LoadChipsFailed;
