import stream, { IStreamState } from './reducers/stream';
import chips, { IChipsState } from './reducers/chips';
import scenes, { IScenesState } from './reducers/scenes';
import configuration, { IConfigurationState } from './reducers/configuration';
import presence, { IPresenceState } from './reducers/presence';

interface IState {
    stream: IStreamState;
    chips: IChipsState;
    configuration: IConfigurationState;
    scenes: IScenesState;
    presence: IPresenceState;
}

const reducers = {
    stream,
    chips,
    configuration,
    scenes,
    presence
};

export default reducers;

export {
    IState,
    IStreamState,
    IChipsState,
    IConfigurationState,
    IScenesState,
    IPresenceState
};
