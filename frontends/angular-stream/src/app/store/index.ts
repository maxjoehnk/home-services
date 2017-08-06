import stream, { IStreamState } from './reducers/stream';
import chips, { IChipsState } from './reducers/chips';
import configuration, { IConfigurationState } from './reducers/configuration';

interface IState {
    stream: IStreamState;
    chips: IChipsState;
    configuration: IConfigurationState;
}

const reducers = {
    stream,
    chips,
    configuration
};

export default reducers;

export {
    IState,
    IStreamState,
    IChipsState,
    IConfigurationState
};
