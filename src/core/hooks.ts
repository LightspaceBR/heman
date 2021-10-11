
import { HemanState, HemanValue, Resetter } from "./intefaces";

/**
* Returns the value of an atom or selector (readonly or writeable) and
* subscribes the components to future updates of that state.
*/
export function useHemanValue<T>(hemanValue: HemanValue<T>): T;

/**
* Returns a Loadable representing the status of the given Heman state
* and subscribes the component to future updates of that state. Useful
* for working with async selectors.
*/
export function useHemanValueLoadable<T>(hemanValue: HemanValue<T>): Loadable<T>;

/**
* Returns a tuple where the first element is the value of the heman state
* and the second is a setter to update that state. Subscribes component
* to updates of the given state.
*/
export function useHemanState<T>(hemanState: HemanState<T>): [T, SetterOrUpdater<T>];

/**
* Returns a tuple where the first element is a Loadable and the second
* element is a setter function to update the given state. Subscribes
* component to updates of the given state.
*/
export function useHemanStateLoadable<T>(hemanState: HemanState<T>): [Loadable<T>, SetterOrUpdater<T>];

/**
* Returns a setter function for updating Heman state. Does not subscribe
* the component to the given state.
*/

export function useSetHemanState<T>(hemanState: HemanState<T>): SetterOrUpdater<T>;

/**
* Returns a function that will reset the given state to its default value.
*/
export function useResetHemanState(hemanState: HemanState<any>): Resetter; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
* Returns current info about an atom
*/
export function useGetHemanValueInfo_UNSTABLE<T>(hemanValue: HemanValue<T>): AtomInfo<T>;

/**
* Returns a function that will run the callback that was passed when
* calling this hook. Useful for accessing Heman state in response to
* events.
*/
export function useHemanCallback<Args extends ReadonlyArray<unknown>, Return>(
    fn: (interface: CallbackInterface) => (...args: Args) => Return,
    deps?: ReadonlyArray<unknown>,
): (...args: Args) => Return;

export function useHemanTransactionObserver_UNSTABLE(
    callback: (opts: {
        snapshot: Snapshot,
        previousSnapshot: Snapshot,
    }) => void,
): void;

export function useGotoHemanSnapshot(): (snapshot: Snapshot) => void;

export function useHemanSnapshot(): Snapshot;

// useHemanBridgeAcrossReactRoots.d.ts
export const HemanBridge: React.FC;
export function useHemanBridgeAcrossReactRoots_UNSTABLE(): typeof HemanBridge;
