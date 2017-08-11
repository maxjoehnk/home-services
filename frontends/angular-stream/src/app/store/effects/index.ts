import { Type } from '@angular/core';
import { StreamEffects } from './stream';
import { ChipEffects } from './chips';
import { ConfigurationEffects } from './configuration';
import { ScenesEffects } from './scenes';
import { PresenceEffects } from './presence';

export const effects: Type<any>[] = [
    ChipEffects,
    ConfigurationEffects,
    ScenesEffects,
    StreamEffects,
    PresenceEffects
];
