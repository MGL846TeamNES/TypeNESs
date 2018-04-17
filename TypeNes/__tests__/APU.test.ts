import { NoiseChannel } from '../Scripts/APU';

describe("ST-001 Tests de l'APU", () => {

    test('CT-001', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x4000, 0b00000000);
        const ncOrig = new NoiseChannel(undefined);
        expect(nc).toEqual(ncOrig);
    });

    test('CT-002', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x400d, 0b11111111);
        const ncOrig = new NoiseChannel(undefined);
        expect(nc).toEqual(ncOrig);
    });

    test('CT-003', () => {
        const nc = new NoiseChannel(undefined);
        expect(nc.isLengthCounterHalt).toBeTruthy();
        expect(nc.isConstantVolume).toBeTruthy();
        nc.writeRegister(0x400c, 0b00000000);
        expect(nc.isLengthCounterHalt).toBeTruthy();
        expect(nc.isConstantVolume).toBeFalsy();
        nc.writeRegister(0x400c, 0b00110000);
        const ncOrig = new NoiseChannel(undefined);
        expect(nc).not.toEqual(ncOrig);
        expect(nc.isLengthCounterHalt).toBeFalsy();
        expect(nc.isConstantVolume).toBeTruthy();
        expect(nc.volume).toBe(0);
    });

    test('CT-004', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x400c, 0b00001111);
        expect(nc.volume).toBe(15);
        expect(nc.isLengthCounterHalt).toBeTruthy();
        expect(nc.isConstantVolume).toBeFalsy();
    });

    test('CT-005', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x400e, 0b10000000);
        expect(nc.isNoiseLoop).toBeTruthy();
        expect(nc.noisePeriodInCycle).toBe(4);
    });

    test('CT-006', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x400e, 0b00001111);
        expect(nc.isNoiseLoop).toBeFalsy();
        expect(nc.noisePeriodInCycle).toBe(4068);
    });

    test('CT-007', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x400f, 0b11110000);
        expect(nc.lengthCounter).toBe(30);
    });

    test('CT-008', () => {
        const nc = new NoiseChannel(undefined);
        nc.writeRegister(0x400f, 0b00010000);
        expect(nc.lengthCounter).toBe(2);
    });

});
