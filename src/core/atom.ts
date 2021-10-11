import { DefaultValue } from "./defaultValue";
import { IEffectContext, NodeKey, SerializableParam } from "./intefaces";
import { HemanState } from "./state";
import { HemanValue } from "./value";
// Effect is called the first time a node is used with a <HemanRoot>
export type AtomEffect<T> = (param: {
    node: HemanState<T>,
    trigger: 'set' | 'get',

    // Call synchronously to initialize value or async to change it later
    setSelf: (param:
        | T
        | DefaultValue
        | Promise<T | DefaultValue>
        | ((param: T | DefaultValue) => T | DefaultValue),
    ) => void,
    resetSelf: () => void,

    // Subscribe callbacks to events.
    // Atom effect observers are called before global transaction observers
    onSet: (
        param: (newValue: T | DefaultValue, oldValue: T | DefaultValue) => void,
    ) => void,
}) => void | (() => void);

// atom.d.ts
export interface AtomOptions<T> {
    key: NodeKey;
    default: HemanValue<T> | (() => Generator<any, T, IEffectContext>) | T;
    effects_UNSTABLE?: ReadonlyArray<AtomEffect<T>>;
    dangerouslyAllowMutability?: boolean;
}

/**
* Creates an atom, which represents a piece of writeable state
*/
export function atom<T>(options: AtomOptions<T>): HemanState<T> {
    return new HemanState(options.key);
}


export interface AtomFamilyOptions<T, P extends SerializableParam> {
    key: NodeKey;
    dangerouslyAllowMutability?: boolean;
    default: HemanValue<T> | Promise<T> | T | ((param: P) => T | HemanValue<T> | Promise<T>);
    effects_UNSTABLE?: | ReadonlyArray<AtomEffect<T>> | ((param: P) => ReadonlyArray<AtomEffect<T>>);
}

export function atomFamily<T, P extends SerializableParam>(
    options: AtomFamilyOptions<T, P>,
): (param: P) => HemanState<T> {
    return (param) => {
        return new HemanState(options.key);
    }
}

