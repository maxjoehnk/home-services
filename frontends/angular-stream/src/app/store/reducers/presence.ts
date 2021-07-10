import {
    LOAD_PRESENCE,
    LOAD_PRESENCE_SUCCESS,
    LOAD_PRESENCE_FAILED,
    All as Action
} from '../actions/presence';

export interface IPresenceState {
    users: any[];
    pending: boolean;
    error?: any;
}

export default function streamReducer(state: IPresenceState = {
    pending: false,
    users: []
}, action: Action): IPresenceState {
    switch (action.type) {
        case LOAD_PRESENCE:
            return Object.assign({}, state, {
                pending: true
            });
        case LOAD_PRESENCE_SUCCESS:
            return {
                pending: false,
                users: action.payload
            };
        case LOAD_PRESENCE_FAILED:
            return {
                pending: false,
                error: action.payload,
                users: []
            };
        default:
            return state;
    }
}
