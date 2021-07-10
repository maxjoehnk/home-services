import {
    LOAD_CARDS,
    LOAD_CARDS_SUCCESS,
    LOAD_CARDS_FAILED,
    All as Action
} from '../actions/stream';
import { ICard } from '../../cards/card.interface';

export interface IStreamState {
    stream?: ICard[];
    pending: boolean;
    error?: any;
}

export default function streamReducer(state: IStreamState = {
    pending: false,
    stream: []
}, action: Action) {
    switch (action.type) {
        case LOAD_CARDS:
            return Object.assign({}, state, {
                pending: true
            });
        case LOAD_CARDS_SUCCESS:
            return {
                pending: false,
                stream: action.payload
            };
        case LOAD_CARDS_FAILED:
            return {
                pending: false,
                error: action.payload,
                stream: []
            };
        default:
            return state;
    }
}
