import { Action } from '@ngrx/store';
import { ICard } from '../../cards/card.interface';

export const LOAD_CARDS = '[Stream] Load';
export const LOAD_CARDS_SUCCESS = '[Stream] Load Success';
export const LOAD_CARDS_FAILED = '[Stream] Load Failed';

export class LoadCards implements Action {
  readonly type = LOAD_CARDS;
}

export class LoadCardsSuccess implements Action {
  readonly type = LOAD_CARDS_SUCCESS;

  constructor(public payload: ICard[]) {}
}

export class LoadCardsFailed implements Action {
  readonly type = LOAD_CARDS_FAILED;

  constructor(public payload: any) {}
}

export type All
  = LoadCards
  | LoadCardsSuccess
  | LoadCardsFailed;
