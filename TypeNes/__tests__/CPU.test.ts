import { CPU } from '../Scripts/CPU';

const machine: Machine = {
    mmap: {
        load: addr => {
            if (addr === 0x8000) {
                return 0x6D;
            } else {
                return 0;
            }
        },
    },
    debugger: {
        isDebuggerEnabled: () => {
            return false;
        }
    }
};

describe('CPU', () => {

    test('step', () => {
        const cpu = new CPU(machine);
        cpu.mem[0] = 0;
        cpu.step();
    });

});
