import { DefaultValue } from "./defaultValue";
import { HemanState } from "./state";
import { HemanValue } from "./value";

;
export type NodeKey = string;

export interface HemanRootProps {
    initializeState?: (mutableSnapshot: MutableSnapshot) => void;
}

export type IEffectContext = {

}



// selector.d.ts
export type GetHemanValue = <T>(hemanVal: HemanValue<T>) => T;

export type SetHemanState = <T>(
    hemanVal: HemanState<T>,
    newVal: T | DefaultValue | ((prevValue: T) => T | DefaultValue),
) => void;

export type ResetHemanState = (hemanVal: HemanState<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface ReadOnlySelectorOptions<T> {
    key: string;
    get: (opts: { get: GetHemanValue }) => Promise<T> | HemanValue<T> | T;
    dangerouslyAllowMutability?: boolean;
}

export interface ReadWriteSelectorOptions<T> extends ReadOnlySelectorOptions<T> {
    set: (
        opts: {
            set: SetHemanState;
            get: GetHemanValue;
            reset: ResetHemanState;
        },
        newValue: T | DefaultValue,
    ) => void;
}

export function selector<T>(options: ReadWriteSelectorOptions<T>): HemanState<T>;
export function selector<T>(options: ReadOnlySelectorOptions<T>): HemanValueReadOnly<T>;

// Snapshot.d.ts
declare const SnapshotID_OPAQUE: unique symbol;
export interface SnapshotID {
    readonly [SnapshotID_OPAQUE]: true;
}

interface ComponentInfo {
    name: string;
}

interface AtomInfo<T> {
    loadable?: Loadable<T>;
    isActive: boolean;
    isSet: boolean;
    isModified: boolean; // TODO report modified selectors
    type: 'atom' | 'selector' | undefined; // undefined until initialized for now
    deps: Iterable<HemanValue<T>>;
    subscribers: {
        nodes: Iterable<HemanValue<T>>,
        components: Iterable<ComponentInfo>,
    };
}

export class Snapshot {
    getID(): SnapshotID;
    getLoadable<T>(hemanValue: HemanValue<T>): Loadable<T>;
    getPromise<T>(hemanValue: HemanValue<T>): Promise<T>;
    getNodes_UNSTABLE(opts?: { isModified?: boolean }): Iterable<HemanValue<unknown>>;
    getInfo_UNSTABLE<T>(hemanValue: HemanValue<T>): AtomInfo<T>;
    map(cb: (mutableSnapshot: MutableSnapshot) => void): Snapshot;
    asyncMap(cb: (mutableSnapshot: MutableSnapshot) => Promise<void>): Promise<Snapshot>;
}

export class MutableSnapshot extends Snapshot {
    set: SetHemanState;
    reset: ResetHemanState;
}

// hooks.d.ts
export type ValOrUpdater<T> = ((currVal: T) => T) | T
export type SetterOrUpdater<T> = (valOrUpdater: ValOrUpdater<T>) => void;
export type Resetter = () => void;
export type CallbackInterface = Readonly<{
    set: <T>(hemanVal: HemanState<T>, valOrUpdater: ((currVal: T) => T) | T) => void;
    reset: (hemanVal: HemanState<any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    snapshot: Snapshot,
    gotoSnapshot: (snapshot: Snapshot) => void,
}>;

// loadable.d.ts
declare const LoadablePromiseValue_OPAQUE: unique symbol;
interface LoadablePromiseValue {
    readonly [LoadablePromiseValue_OPAQUE]: true;
}
type LoadablePromise<T> = Promise<LoadablePromiseValue>;

interface BaseLoadable<T> {
    getValue: () => T;
    toPromise: () => Promise<T>;
    valueMaybe: () => T | void;
    valueOrThrow: () => T;
    errorMaybe: () => Error | void;
    errorOrThrow: () => Error;
    promiseMaybe: () => Promise<T> | void;
    promiseOrThrow: () => Promise<T>;
    map: <S>(map: (from: T) => Promise<S> | S) => Loadable<S>;
}

interface ValueLoadable<T> extends BaseLoadable<T> {
    state: 'hasValue';
    contents: T;
}

interface LoadingLoadable<T> extends BaseLoadable<T> {
    state: 'loading';
    contents: LoadablePromise<T>;
}

interface ErrorLoadable<T> extends BaseLoadable<T> {
    state: 'hasError';
    contents: Error;
}

export type Loadable<T> =
    | ValueLoadable<T>
    | LoadingLoadable<T>
    | ErrorLoadable<T>;



// eslint-disable-line @typescript-eslint/no-explicit-any

/** Utilities */

// bigint not supported yet
type Primitive = undefined | null | boolean | number | symbol | string;

export type SerializableParam =
    | Primitive
    | { toJSON: () => string }
    | ReadonlyArray<SerializableParam>
    | Readonly<{ [key: string]: SerializableParam }>;


export interface ReadOnlySelectorFamilyOptions<T, P extends SerializableParam> {
    key: string;
    get: (param: P) => (opts: { get: GetHemanValue }) => Promise<T> | HemanValue<T> | T;
    // cacheImplementation_UNSTABLE?: () => CacheImplementation<Loadable<T>>,
    // cacheImplementationForParams_UNSTABLE?: () => CacheImplementation<
    //   HemanValue<T>,
    // >,
    dangerouslyAllowMutability?: boolean;
}

export interface ReadWriteSelectorFamilyOptions<T, P extends SerializableParam> {
    key: string;
    get: (param: P) => (opts: { get: GetHemanValue }) => Promise<T> | HemanValue<T> | T;
    set: (
        param: P,
    ) => (
            opts: { set: SetHemanState; get: GetHemanValue; reset: ResetHemanState },
            newValue: T | DefaultValue,
        ) => void;
    // cacheImplementation_UNSTABLE?: () => CacheImplementation<Loadable<T>>,
    // cacheImplementationForParams_UNSTABLE?: () => CacheImplementation<
    //   HemanValue<T>,
    // >,
    dangerouslyAllowMutability?: boolean;
}

export type UnwrapHemanValue<T> = T extends HemanValue<infer R> ? R : never;

export type UnwrapHemanValues<T extends Array<HemanValue<any>> | { [key: string]: HemanValue<any> }> = {
    [P in keyof T]: UnwrapHemanValue<T[P]>;
};
export type UnwrapHemanValueLoadables<T extends Array<HemanValue<any>> | { [key: string]: HemanValue<any> }> = {
    [P in keyof T]: Loadable<UnwrapHemanValue<T[P]>>;
};

export function snapshot_UNSTABLE(initializeState?: (shapshot: MutableSnapshot) => void): Snapshot;
