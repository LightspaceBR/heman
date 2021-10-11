import { NodeKey } from "./intefaces";
import { HemanState } from "./state";


// hemanValue.d.ts
export class AbstractHemanValue<T> {
    // __tag: [T];
    // __cTag: (t: T) => void; // for contravariance

    // key: NodeKey;
    constructor(newKey: NodeKey) {

    }
}

export class AbstractHemanValueReadonly<T> {
    // __tag: [T];
    // key: NodeKey;
    constructor(newKey: NodeKey) {

    }
}


export class HemanValueReadOnly<T> extends AbstractHemanValueReadonly<T> { }

export type HemanValue<T> = HemanValueReadOnly<T> | HemanState<T>;

export function isHemanValue(val: unknown): val is HemanValue<any> {
    return true;
}