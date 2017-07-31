const get = require('lodash.get');

module.exports = avr => {
    const getVolume = async zone => await avr.getVolume(zone);
    const setVolume = async(volume, zone) => await avr.setVolume(volume, zone);
    const getPower = async zone => await avr.isOn(zone);
    const setPower = async(power, zone) => (power ?
        await avr.powerOn(zone) :
        await avr.powerOff(zone));
    const togglePower = async zone => {
        const power = !await getPower(zone);
        await setPower(power, zone);
        return power;
    };
    const getInputs = async() => {
        const config = await avr.getSystemConfig();
        const inputs = get(config, 'YAMAHA_AV.System.0.Config.0.Name.0.Input.0');
        const result = Object.getOwnPropertyNames(inputs)
            .map(name => ({
                name,
                display: inputs[name][0].trim()
            }));
        return result;
    };
    const getInput = async zone => await avr.getCurrentInput(zone);
    const setInput = async(input, zone) => (zone ?
        await avr.setInputTo(input) :
        await avr.setMainInputTo(input));
    const getZones = async() => await avr.getAvailableZones();

    return {
        getVolume,
        setVolume,
        getPower,
        setPower,
        togglePower,
        getInputs,
        getInput,
        setInput,
        getZones
    };
};
