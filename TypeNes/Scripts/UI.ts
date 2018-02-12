/*
Copyright (C) 2017 Charlie Lee

TypeNESs has referred to Ben Firshman's JSNES
https://github.com/bfirsh/jsnes

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Machine } from './Machine';
import { loadDefaultROM } from './Utils';

export class UI {
    private machine: Machine;
    public screen: HTMLCanvasElement;
    public canvasContext: CanvasRenderingContext2D;
    private status: HTMLLabelElement;
    public canvasImageData: ImageData;
    constructor(nesMachine: Machine) {
        this.machine = nesMachine;
        this.screen = <HTMLCanvasElement>document.getElementById('nes-screen');
        this.status = <HTMLLabelElement>document.getElementById('nes-status');
        this.canvasContext = this.screen.getContext('2d');
        if (!this.canvasContext.getImageData) {
            console.error('cannot execute getImageData()');
            return;
        }

        this.canvasImageData = this.canvasContext.getImageData(0, 0, 256, 240);
        this.canvasContext.scale(2, 2);

        this.resetCanvas();
    }

    public loadROM(): void {
        loadDefaultROM(this.machine);
    }

    public resetCanvas(): void {
        this.canvasContext.fillStyle = 'black';
        // set alpha to opaque
        this.canvasContext.fillRect(0, 0, 256, 240);

        // Set alpha
        for (let i = 3; i < this.canvasImageData.data.length - 3; i += 4) {
            this.canvasImageData.data[i] = 0xFF;
        }
    }

    public updateStatus(s: string) {
        this.status.textContent = s;
    }

    public writeFrame(buffer: number[], prevBuffer: number[]) {
        const imageData = this.canvasImageData.data;
        let pixel, i, j;

        for (i = 0; i < 256 * 240; i++) {
            pixel = buffer[i];

            if (pixel != prevBuffer[i]) {
                j = i * 4;
                imageData[j] = pixel & 0xFF;
                imageData[j + 1] = (pixel >> 8) & 0xFF;
                imageData[j + 2] = (pixel >> 16) & 0xFF;
                prevBuffer[i] = pixel;
            }
        }
        this.canvasContext.putImageData(this.canvasImageData, 0, 0);
        this.canvasContext.fillRect(0, 0, 256, 8);
        this.canvasContext.fillRect(0, 232, 256, 8);
        this.canvasContext.fillRect(0, 0, 8, 240);
        this.canvasContext.fillRect(248, 0, 8, 240);
    }
}