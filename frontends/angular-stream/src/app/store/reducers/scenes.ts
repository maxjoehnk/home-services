import {
    LOAD_SCENES,
    LOAD_SCENES_SUCCESS,
    LOAD_SCENES_FAILED,
    All as Action
} from '../actions/scenes';

export interface IScenesState {
    scenes: any[];
    pending: boolean;
    error?: any;
}

export default function scenesReducer(state: IScenesState = {
    pending: false,
    scenes: []
}, action: Action): IScenesState {
    switch (action.type) {
        case LOAD_SCENES:
            return Object.assign({}, state, {
                pending: true
            });
        case LOAD_SCENES_SUCCESS:
            return {
                pending: false,
                scenes: action.payload
            };
        case LOAD_SCENES_FAILED:
            return {
                pending: false,
                error: action.payload,
                scenes: []
            };
        default:
            return state;
    }
}
