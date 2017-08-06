import stream, { IStreamState } from './reducers/stream';
import chips, { IChipsState } from './reducers/chips';

interface IState {
    stream: IStreamState;
    chips: IChipsState;
}

const reducers = {
    stream,
    chips
};

export default reducers;

export {
    IState,
    IStreamState,
    IChipsState
};
