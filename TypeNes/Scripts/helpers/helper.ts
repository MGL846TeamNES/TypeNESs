import { Machine } from '../Machine';
import * as fs from 'fs';
import * as Utils from '../Utils';

/**
 * Advance a specific amount of frames in the NES
 * @param {Machine} m
 * @param {number} frameCount
 */
export const cycleFrame = (m: Machine, frameCount: number) => {
    for (let i = 0; i < frameCount; i++) {
        m.executeFrameCycle(true);
    }
};

/**
 * Helper function that return a function for the specific machine.
 * @param {Machine} m
 * @returns {(frameCount: number) => void}
 */
export const cycleFrameGen = (m: Machine) => {
    return (frameCount: number) => {
        return cycleFrame(m, frameCount);
    };
};

/**
 * Take a screenshot of the current screen
 * @param {Machine} m
 * @param {string} screenShotName
 */
export const takeScreenShot = (m: Machine, screenShotName: string) => {
    const image = m.ui.canvasContext.canvas.toDataURL();
    const data = image.replace(/^data:image\/\w+;base64,/, '');
    if (!fs.existsSync('TypeNes/dist')) {
        fs.mkdirSync('TypeNes/dist');
    }
    fs.writeFileSync('TypeNes/dist/' + screenShotName, data,  {encoding: 'base64'});
};

/**
 * Helper function that returns a screenshot function so that you don't have to pass the machine each time
 * @param {Machine} m
 * @returns {(screenShotName: string) => void}
 */
export const takeScreenShotGen = (m: Machine) => {
    return (screenShotName: string) => {
        takeScreenShot(m, screenShotName);
    };
};

/**
 * Load default ROM functionality for mocking to read Mario Bros.
 */
export const loadMarioROM = (m: Machine) => {
    const nb = fs.readFileSync('TypeNes/ROM/mario.nes');
    const arrayBuffer = nb.buffer;
    const byteArray = new Uint8Array(arrayBuffer);
    const dataArr = new Array();
    for (let i = 0; i < byteArray.byteLength; i++) {
        dataArr[i] = byteArray[i];
    }
    m.loadRom(dataArr);
};

/**
 * Load not valid ROM functionality for mocking to read Mario Bros.
 */
export const loadMarioTxtROM = (m: Machine) => {
    const nb = fs.readFileSync('TypeNes/ROM/mario.txt');
    const arrayBuffer = nb.buffer;
    const byteArray = new Uint8Array(arrayBuffer);
    const dataArr = new Array();
    for (let i = 0; i < byteArray.byteLength; i++) {
        dataArr[i] = byteArray[i];
    }
    m.loadRom(dataArr);
};

export const getBase64Image = (url) => {
  var img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');

  img.src = url;

  var canvas = document.createElement("canvas");
  canvas.width =img.width;
  canvas.height =img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
  return dataURL
}
