import { IEffectContext, ValOrUpdater } from "./intefaces"
import { HemanState } from "./state"
import { HemanValue } from "./value"


export function* getValue<T>(recoilValue: HemanValue<T>): Generator<string, T, IEffectContext> {
    const snapshot = yield "GetValue"
    return null as any
}

export function* setState<T>(recoilState: HemanState<T>, valOrUpdater: ValOrUpdater<T>): Generator<string, T, IEffectContext> {
    const snapshot = yield "GetValue"
    return null as any
}
