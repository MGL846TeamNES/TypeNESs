import { Tile, Palette } from '../Scripts/PPU';

describe('ST-003 Tests du PPU', () => {

    const createBuffer = (): number[] => {
        const buffer: number[] = new Array(256 * 240);
            for (let j = 0; j < 256 * 240; j++) {
                buffer[j] = 0;
            }
        return buffer;
    };

    test('CT-020', () => {
        const t = new Tile();
        const buffer = createBuffer();
        const palette = new Palette();
        palette.RGBColors = Palette.NTSCRGBColors;

        for (let i = 0; i < 64; i++) {
            t.pixels[i] = 3;
        }

        t.render(buffer, 0, 0, 8, 8, 0, 0, 0, palette, false, false, false);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                expect(buffer[i + (j * 256)]).toBe(Palette.NTSCRGBColors[3]);
            }
        }
    });

    test('CT-021', () => {
        const t = new Tile();
        const buffer = createBuffer();
        const palette = new Palette();
        palette.RGBColors = Palette.NTSCRGBColors;

        for (let i = 0; i < 64; i++) {
            t.pixels[i] = 3;
        }

        t.render(buffer, 0, 0, 8, 8, 12, 12, 0, palette, false, false, false);
        for (let i = 12; i < 8 + 12; i++) {
            for (let j = 12; j < 8 + 12; j++) {
                expect(buffer[i + (j * 256)]).toBe(Palette.NTSCRGBColors[3]);
            }
        }
    });

    test('CT-022', () => {
        const t = new Tile();
        const buffer = createBuffer();
        const palette = new Palette();
        palette.RGBColors = Palette.NTSCRGBColors;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                t.pixels[j + (i * 8)] = j % 4 + 1;
            }
        }

        t.render(buffer, 0, 0, 8, 8, 0, 0, 0, palette, true, false, false);

        let idx = 4;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (idx === 0) {
                    idx = 4;
                }
                expect(buffer[j + (i * 256)]).toBe(Palette.NTSCRGBColors[idx]);
                idx -= 1;
            }
        }
    });

    test('CT-023', () => {
        const t = new Tile();
        const buffer = createBuffer();
        const palette = new Palette();
        palette.RGBColors = Palette.NTSCRGBColors;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                t.pixels[i + (j * 8)] = j % 4 + 1;
            }
        }

        t.render(buffer, 0, 0, 8, 8, 0, 0, 0, palette, false, true, false);

        let idx = 4;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (idx === 0) {
                    idx = 4;
                }
                expect(buffer[i + (j * 256)]).toBe(Palette.NTSCRGBColors[idx]);
                idx -= 1;
            }
        }
    });

    test('CT-024', () => {
        const t = new Tile();
        const buffer = createBuffer();
        const palette = new Palette();
        palette.RGBColors = Palette.NTSCRGBColors;

        for (let i = 0; i < 64; i++) {
            t.pixels[i] = 3;
        }

        t.render(buffer, 2, 2, 6, 6, 0, 0, 0, palette, false, false, false);
        for (let i = 2; i < 6; i++) {
            for (let j = 2; j < 6; j++) {
                expect(buffer[i + (j * 256)]).toBe(Palette.NTSCRGBColors[3]);
            }
        }
    });

});
