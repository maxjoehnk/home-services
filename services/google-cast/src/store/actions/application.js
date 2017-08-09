const APPLICATION_LAUNCH = '[Application] Launch';
const APPLICATION_EXIT = '[Application] Exit';

const applicationLaunch = () => ({
    type: APPLICATION_LAUNCH,
    payload: {
    }
});

const applicationExit = device => ({
    type: APPLICATION_EXIT,
    payload: device
});

module.exports = {
    APPLICATION_LAUNCH,
    APPLICATION_EXIT,
    applicationLaunch,
    applicationExit
};
