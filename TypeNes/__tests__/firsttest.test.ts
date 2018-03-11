require('web-audio-mock'); // Allow to mock AudioContext in nodejs

import * as fs from 'fs';

import { Machine } from '../Scripts/Machine';
import * as Utils from '../Scripts/Utils';
import {
    cycleFrameGen,
    takeScreenShotGen,
    loadMarioROM,
} from '../Scripts/helpers/helper';

it('should load a test ROM and validate the result', () => {
    jest.spyOn(Utils, 'loadDefaultROM').mockImplementation((machine: Machine) => {
        loadMarioROM(m);
    });
    document.body.innerHTML =
        '<div>' +
        '  <canvas width="256" height="240" id="nes-screen" ></canvas>' +
        '  <div id="nes-status">status</div>' +
        '</div>';

    const m = new Machine();
    const cycleFrame = cycleFrameGen(m);
    const takeScreenShot = takeScreenShotGen(m);

    m.ui.loadROM();
    m.drawScreen = true;
    cycleFrame(40);
    m.keyboard.touchBtnDown(3);
    cycleFrame(176);
    m.keyboard.touchBtnDown(6);
    cycleFrame(3);
    m.keyboard.touchBtnUp(6);
    cycleFrame(10);
    m.keyboard.touchBtnDown(0);
    cycleFrame(30);
    m.keyboard.touchBtnUp(0);

    takeScreenShot('screenshot2.png');
});
