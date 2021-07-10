import { Action } from '@ngrx/store';

export const STOP_CASTING = '[Google-Cast] Stop Casting';
export const STOP_CASTING_SUCCESS = '[Google-Cast] Stop Casting Success';
export const STOP_CASTING_FAILED = '[Google-Cast] Stop Casting Failed';

export class StopCasting implements Action {
    readonly type = STOP_CASTING;

    constructor(public payload: string) {}
}

export class StopCastingSuccess implements Action {
    readonly type = STOP_CASTING_SUCCESS;
}

export class StopCastingFailed implements Action {
    readonly type = STOP_CASTING_FAILED;

    constructor(public payload: any) { }
}

export type All
    = StopCasting
    | StopCastingSuccess
    | StopCastingFailed;
