require('web-audio-mock'); // Allow to mock AudioContext in nodejs

import * as fs from 'fs';

import { Machine } from '../Scripts/Machine';
import * as Utils from '../Scripts/Utils';

it('should load the Machine and start running the ROM', (done) => {

    // Create a mock implementation for loadDefaultROM. The normal implementation will grab the ROM from
    // the web but there are no server running during the tests.
    // This mock will read it from the mario bros ROM from disk instead.
    jest.spyOn(Utils, 'loadDefaultROM').mockImplementation((machine: Machine) => {
        fs.readFile('TypeNes/ROM/mario.nes', (err, nb) => {
            const arrayBuffer = nb.buffer;
            const byteArray = new Uint8Array(arrayBuffer);
            const dataArr = new Array();
            for (let i = 0; i < byteArray.byteLength; i++) {
                dataArr[i] = byteArray[i];
            }
            machine.loadRom(dataArr);
            machine.start();
        });
    });

    // By specifying the content of the document body, it creates a canvas in jsdom
    // that can be accessed by the tested code.
    document.body.innerHTML =
        '<div>' +
        '  <canvas width="256" height="240" id="nes-screen" ></canvas>' +
        '  <div id="nes-status">status</div>' +
        '</div>';

    // Create a Machine object and load the default ROM from the mock from above.
    const m = new Machine();
    m.ui.loadROM();

    // This will make jest wait 2 seconds then execute the callback.
    // The callback will save the canvas content to disk.
    return setTimeout(() => {
        const image = m.ui.canvasContext.canvas.toDataURL();
        const data = image.replace(/^data:image\/\w+;base64,/, '');
        if (!fs.existsSync('TypeNes/dist')) {
            fs.mkdirSync('TypeNes/dist');
        }
        fs.writeFileSync('TypeNes/dist/screenshot.png', data,  {encoding: 'base64'});
        done();
    }, 2000);
});
