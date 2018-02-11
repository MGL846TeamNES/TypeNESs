import { Machine } from './Machine';

export const loadDefaultROM = (machine: Machine): void => {
    const oReq = new XMLHttpRequest();
    oReq.open('GET', './ROM/Alter_Ego.nes.txt', true);
    oReq.responseType = 'arraybuffer';
    oReq.onload = oEvent => {
        const arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            const byteArray = new Uint8Array(arrayBuffer);
            const dataArr = new Array();
            for (let i = 0; i < byteArray.byteLength; i++) {
                // do something with each byte in the array
                dataArr[i] = byteArray[i];
            }
            machine.loadRom(dataArr);
            machine.start();
        }
    };
    oReq.send(undefined);
};

