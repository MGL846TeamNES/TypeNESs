require('web-audio-mock'); // Allow to mock AudioContext in nodejs

import * as fs from 'fs';

import { Machine } from '../Scripts/Machine';
import * as Utils from '../Scripts/Utils';
import {
    cycleFrameGen,
    takeScreenShotGen,
    loadMarioROM,
    getBase64Image,
} from '../Scripts/helpers/helper';


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

    //Load default ROM
    m.keyboard.touchBtnDown(3);
    cycleFrame(176);

    //Test la touche A
    describe("ST-004 Tests du clavier", () => {
    it('CT-030', () => {
      console.log('passed the getBase64Image function')

      m.keyboard.touchBtnUp(0);
      takeScreenShot('testROMButtonInput_jump.png');
      cycleFrame(30);
      let a_src = 'testROMButtonInput_jump.png'
      let b_src = 'originals_screens/testROMButtonInput_jump.png'

      //expect(getBase64Image(a_src)).toBe(getBase64Image(b_src));
    })

    //Test la touche gauche
    it('CT-031', () => {
      m.keyboard.touchBtnDown(6);
      cycleFrame(10);
      takeScreenShot('testROMButtonInput_left.png');
      let a_src = 'testROMButtonInput_left.png';
      let b_src = 'originals_screens/testROMButtonInput_left.png';

      //expect(getBase64Image(a_src)).toBe(getBase64Image(b_src));

    })

    //Test la touche SELECT
    // it('CT-032', () => {
    //   m.keyboard.touchBtnDown(3);
    //   cycleFrame(10);
    //   takeScreenShot('testROMButtonInput_start1.png');
    //   cycleFrame(100);
    //   takeScreenShot('testROMButtonInput_start2.png');
    //   // expect la comparaison des deux screens
    // })
    //takeScreenShot('screenshot2.png');

    //takeScreenShot('testROMButtonInput_start.png');
    // m.keyboard.touchBtnDown(6);
    // cycleFrame(3);
    //
    // m.keyboard.touchBtnDown(0);
    // cycleFrame(30);
    //
    // m.keyboard.touchBtnDown(7);
    // cycleFrame(3);


});
