import {
    LOAD_CHIPS,
    LOAD_CHIPS_SUCCESS,
    LOAD_CHIPS_FAILED,
    All as Action
} from '../actions/chips';

export interface IChipsState {
    chips: any[];
    pending: boolean;
    error?: any;
}

export default function streamReducer(state: IChipsState = {
    pending: false,
    chips: []
}, action: Action): IChipsState {
    switch (action.type) {
        case LOAD_CHIPS:
            return Object.assign({}, state, {
                pending: true
            });
        case LOAD_CHIPS_SUCCESS:
            return {
                pending: false,
                chips: action.payload
            };
        case LOAD_CHIPS_FAILED:
            return {
                pending: false,
                error: action.payload,
                chips: []
            };
        default:
            return state;
    }
}
