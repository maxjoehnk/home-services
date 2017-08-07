import { Action } from '@ngrx/store';

export const LOAD_SCENES = '[Scenes] Load';
export const LOAD_SCENES_SUCCESS = '[Scenes] Load Success';
export const LOAD_SCENES_FAILED = '[Scenes] Load Failed';

export class LoadScenes implements Action {
  readonly type = LOAD_SCENES;
}

export class LoadScenesSuccess implements Action {
  readonly type = LOAD_SCENES_SUCCESS;

  constructor(public payload: any[]) {}
}

export class LoadScenesFailed implements Action {
  readonly type = LOAD_SCENES_FAILED;

  constructor(public payload: any) {}
}

export type All
  = LoadScenes
  | LoadScenesSuccess
  | LoadScenesFailed;
