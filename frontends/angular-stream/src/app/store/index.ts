import stream, { IStreamState } from './reducers/stream';
import chips, { IChipsState } from './reducers/chips';
import scenes, { IScenesState } from './reducers/scenes';
import configuration, { IConfigurationState } from './reducers/configuration';

interface IState {
    stream: IStreamState;
    chips: IChipsState;
    configuration: IConfigurationState;
    scenes: IScenesState;
}

const reducers = {
    stream,
    chips,
    configuration,
    scenes
};

export default reducers;

export {
    IState,
    IStreamState,
    IChipsState,
    IConfigurationState,
    IScenesState
};
