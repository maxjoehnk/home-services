import { CelsiusPipe } from './celsius.pipe';

describe('CelsiusPipe', () => {
    it('create an instance', () => {
        const pipe = new CelsiusPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return the given value as a string', function() {
        const value = 16.4;
        const pipe = new CelsiusPipe();
        expect(pipe.transform(value)).toEqual(`${value}°C`);
    });

    it('should round the given value as a string', function() {
        const value = 16.4;
        const pipe = new CelsiusPipe();
        expect(pipe.transform(value, true)).toEqual(`${Math.round(value)}°C`);
    });
});
