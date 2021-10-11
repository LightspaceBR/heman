import { atom } from "../../core/atom"
import { getValue, setState } from "../../core/effects"

const usuarioAtom = atom({
    default: {
        name: "ericfillipe"
    },
    key: "usuario"
})





function* counter() {
    yield* setState(usuarioAtom, {
        name: ""
    })
    const v = yield* getValue(usuarioAtom)

}
