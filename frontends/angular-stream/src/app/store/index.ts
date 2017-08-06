import stream, { IStreamState } from './reducers/stream';

interface IState {
    stream: IStreamState;
}

const reducers = {
    stream
};

export default reducers;

export {
    IState,
    IStreamState
};
