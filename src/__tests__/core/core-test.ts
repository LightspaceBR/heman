import { atom } from "../../core/atom"
import { getValue, setState } from "../../core/effects"
const usuario1Atom = atom({
    default: {
        ee: "ericfillipe"
    },
    key: "usuario"
})



const usuarioAtom = atom({
    default: function* () {
        return yield* getValue(usuario1Atom);
    },
    key: "usuario"
})





function* counter() {
    yield* setState(usuarioAtom, {
        ee: ""
    })
    const v = yield* getValue(usuarioAtom)
    if (v.ee) {

    }
}
