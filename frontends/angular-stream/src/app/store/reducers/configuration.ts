import {
    LOAD_CONFIGURATION,
    LOAD_CONFIGURATION_SUCCESS,
    LOAD_CONFIGURATION_FAILED,
    All as Action
} from '../actions/configuration';

export interface IConfigurationState {
    pending: boolean;
    configuration: {
        stream: boolean;
        presence: boolean;
        scenes: boolean;
        chips: boolean;
    };
    error?: any;
}

const initial = {
    pending: false,
    configuration: {
        stream: false,
        presence: false,
        scenes: false,
        chips: false
    }
};

export default function configurationReducer(state: IConfigurationState = initial, action: Action): IConfigurationState {
    switch (action.type) {
        case LOAD_CONFIGURATION:
            return Object.assign({}, state, {
                pending: true
            });
        case LOAD_CONFIGURATION_SUCCESS:
            return {
                pending: false,
                configuration: action.payload
            };
        case LOAD_CONFIGURATION_FAILED:
            return Object.assign({}, state, {
                pending: false,
                error: action.payload
            });
        default:
            return state;
    }
}
