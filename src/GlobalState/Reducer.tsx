import { ReactNode, useReducer, FC } from "react"
import Context, { InitStateGlobal } from "./Context"

const GlobalReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SWITCH_THEME':
            return {
                ...state, ThemeMode: !state.ThemeMode
            }
        case 'SHOW_HIDE_LOGIN_BOX':
            return {
                ...state, isCloseLoginBox: !state.isCloseLoginBox
            }
        case 'SET_USER':
            return {
                ...state, currentUser: action.value
            }
        case 'SET_LEARN':
            return {
                ...state, currentLearn: action.value
            }
    }
}
// const [user, loading, error] = useAuthState(auth);
function Reducer({ children }: { children: ReactNode }) {

    //default lightTheme
    const [Action, Dispatch] = useReducer(GlobalReducer, InitStateGlobal)

    return (
        <Context.Provider value={[Action, Dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Reducer;
