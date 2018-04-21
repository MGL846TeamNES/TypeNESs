require('web-audio-mock'); // Allow to mock AudioContext in nodejs

import * as fs from 'fs';

import { Machine } from '../Scripts/Machine';
import * as Utils from '../Scripts/Utils';
import {
    cycleFrameGen,
    takeScreenShotGen,
    loadMarioROM,
    loadMarioTxtROM
} from '../Scripts/helpers/helper';

describe("ST-005 Tests de chargement des ROM", () => {
it('CT-034', () => {
    jest.spyOn(Utils, 'loadDefaultROM').mockImplementation((machine: Machine) => {
        loadMarioROM(m);
    });
    document.body.innerHTML =
        '<div>' +
        '  <canvas width="256" height="240" id="nes-screen" ></canvas>' +
        '  <div id="nes-status">status</div>' +
        '</div>';

    const m = new Machine();
    m.ui.loadROM();

    expect(m.ui.getStatus()).toBe('Successfully loaded. Ready to be started.');
});

it('CT-033', () => {
    jest.spyOn(Utils, 'loadDefaultROM').mockImplementation((machine: Machine) => {
        loadMarioTxtROM(m);
    });
    document.body.innerHTML =
        '<div>' +
        '  <canvas width="256" height="240" id="nes-screen" ></canvas>' +
        '  <div id="nes-status">status</div>' +
        '</div>';

    const m = new Machine();
    m.ui.loadROM();

    expect(m.ui.getStatus()).toBe('Invalid ROM!');
});

});
