import { HemanValue, HemanValueReadOnly, UnwrapHemanValueLoadables } from "./intefaces";



export function selectorFamily<T, P extends SerializableParam>(
    options: ReadWriteSelectorFamilyOptions<T, P>,
): (param: P) => HemanState<T>;

export function selectorFamily<T, P extends SerializableParam>(
    options: ReadOnlySelectorFamilyOptions<T, P>,
): (param: P) => HemanValueReadOnly<T>;

export function constSelector<T extends SerializableParam>(constant: T): HemanValueReadOnly<T>;

export function errorSelector(message: string): HemanValueReadOnly<never>;

export function readOnlySelector<T>(atom: HemanValue<T>): HemanValueReadOnly<T>;

export function noWait<T>(state: HemanValue<T>): HemanValueReadOnly<Loadable<T>>;

export function waitForNone<HemanValues extends Array<HemanValue<any>> | [HemanValue<any>]>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValueLoadables<HemanValues>>;

export function waitForNone<HemanValues extends { [key: string]: HemanValue<any> }>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValueLoadables<HemanValues>>;

export function waitForAny<HemanValues extends Array<HemanValue<any>> | [HemanValue<any>]>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValueLoadables<HemanValues>>;

export function waitForAny<HemanValues extends { [key: string]: HemanValue<any> }>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValueLoadables<HemanValues>>;

export function waitForAll<HemanValues extends Array<HemanValue<any>> | [HemanValue<any>]>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValues<HemanValues>>;

export function waitForAll<HemanValues extends { [key: string]: HemanValue<any> }>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValues<HemanValues>>;

export function waitForAllSettled<HemanValues extends Array<HemanValue<any>> | [HemanValue<any>]>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValueLoadables<HemanValues>>;

export function waitForAllSettled<HemanValues extends { [key: string]: HemanValue<any> }>(
    param: HemanValues,
): HemanValueReadOnly<UnwrapHemanValueLoadables<HemanValues>>;