import { CPU } from '../Scripts/CPU';
import { Machine } from '../Scripts/Machine';


function createMachine(instruction: number): Machine {
    const machine: Machine = {
        mmap: {
            load: addr => {
                if (addr === 0x8000) {
                    return 0x6D;
                } else {
                    return instruction;
                }
            },
        },
        debugger: {
            isDebuggerEnabled: () => {
                return false;
            }
        }
    };
    return machine;
}

describe('ST-002 Tests du CPU', () => {

    test('CT-010', () => {
        const machine = createMachine(0b00000010);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
        expect(cpu.FLAG_N).toBeTruthy();
    });

    test('CT-011', () => {
        const machine = createMachine(0b00000000);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
        expect(cpu.FLAG_N).toBeFalsy();
    });

    test('CT-012', () => {
        const machine = createMachine(255);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        expect(cpu.REG_A).toBe(0);
        expect(cpu.FLAG_C).toBe(0);
        cpu.bypassChangeREG_A(1);
        cpu.step();
        expect(cpu.FLAG_C).toBe(1);
    });

    test('CT-013', () => {
        const machine = createMachine(0b00000000);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
        expect(cpu.FLAG_C).toBeFalsy();
    });

    test('CT-014', () => {
        const machine = createMachine(0b00000010);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.bypassChangeREG_A(0b10000011);
        expect(cpu.FLAG_C).toBe(0);
        cpu.step();
        // expect(cpu.FLAG_V).toBeTruthy();
        expect(cpu.FLAG_V).toBeFalsy();
    });

    test('CT-015', () => {
        const machine = createMachine(0b00000000);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
        expect(cpu.FLAG_V).toBeFalsy();
    });

    test('CT-016', () => {
        const machine = createMachine(0b00000000);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
        expect(cpu.FLAG_Z).toBeTruthy();
    });

    test('CT-017', () => {
        const machine = createMachine(0b00000001);
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
        expect(cpu.FLAG_Z).toBeFalsy();
    });

});
