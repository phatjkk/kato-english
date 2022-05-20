import { createContext } from "react";
const InitStateGlobal:any = {
    ThemeMode:true ,   // true:light; false:dark
    LoginMode:[],
    isCloseLoginBox: false,
    currentUser:null,
    currentLearn:null
}
const Context = createContext<any>(InitStateGlobal) ;

export {InitStateGlobal};
export default Context;
