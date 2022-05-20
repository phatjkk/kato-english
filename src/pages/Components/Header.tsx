import logo from "../icon/card.png";
import KNlogo from "../icon/star.png";
import streakLogo from "../icon/fire.png";
import { auth, provider, db } from "../../firebase";
import { collection, setDoc, getDocs,getDoc, query, where, doc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut,onAuthStateChanged } from "firebase/auth";
import LogOut from "../Login/LogOut";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BeatLoader from "react-spinners/BeatLoader";
import SignInBox from "./SignInBox";
import ThemeSwitch from './ThemeSwitch'
import { useGlobalStore } from '../../GlobalState/';
import IMG_avatar from "../icon/avatar_default.gif"

function Header() {
    const [state, dispatch] = useGlobalStore();
    const [user, loading, error] = useAuthState(auth);
    const [IsLogin, ChangeIsLogin] = useState(false);
    const [userKNStreak,setUserKNStreak] = useState({streak:0,kn:0})
    useEffect(()=>{
        auth.onAuthStateChanged(function(user1) {
            dispatch({type:"SET_USER",value:user1})
        });
    },[])
    useEffect(()=>{
        LoadUI()
    },[state.currentUser])
    function LoadUI(){
        if(state.currentUser!=null){
            const docRef = doc(db, "users",state.currentUser.uid);
            getDoc(docRef).then((docSnap:any)=>{
                console.log(docSnap.data())
                setUserKNStreak({
                    streak:docSnap.data().streak,
                    kn:docSnap.data().KN,
                })
            })
        }
    }
    const handleLogOut = () => {
        dispatch({
            type: "SET_USER",
            value: null
        })
        LogOut()
    }
    const AuthGoogle = async () => {
        return signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential: any = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                dispatch({
                    type: "SET_USER",
                    value: user
                })
                // check exits user ?
                const q = query(collection(db, "users"), where("id", "==", result.user.uid));
                const querySnapshot = await getDocs(q);
                let foundItem: any = null;
                querySnapshot.forEach((doc) => {
                    foundItem = doc.data()
                });
                if(foundItem===null){
                    const docRef = await setDoc(doc(collection(db, "users"), result.user.uid), {
                        id: result.user.uid,
                        username: result.user.displayName,
                        profilePic: result.user.photoURL,
                        KN: 0,
                        streak: 0,
                        process: {
                            words: 0,
                            course: {}
                        }
                    });
                }
                
                dispatch({ type: "SHOW_HIDE_LOGIN_BOX" })
                return true;
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                if (!error.message.includes('popup-closed-by-user')) {

                    alert("Lỗi không xác định, vui lòng thử lại!\nMã lỗi:" + errorMessage);
                }

                return false;
            });
    }
    const handleGoogleLogin = () => {
        ChangeIsLogin(true)
        AuthGoogle().then(() => {
            ChangeIsLogin(false)
        }).catch(() => {
            ChangeIsLogin(false)
        });


    }
    const handleClickLoginBox = () => {
        dispatch({ type: "SHOW_HIDE_LOGIN_BOX" });
    }
    const hacl = async () => {
        LoadUI()
    }
    return (
        <div id="Header" className={`flex font-['Nunito'] h-[4em] border-b-2 w-full ` + (state.ThemeMode ? '' : 'darkmode')} >
            {/* <button onClick={hacl}>Test</button> */}
            <img className="mt-[0.6em] ml-[2em] h-10 w-10" src={logo || ""} />
            <h1 className={"invisible md:visible mt-[0.8em] ml-[0.5em] font-bold  text-xl " + (state.ThemeMode ? 'text-slate-900' : 'text-white')}>
                Kato English
            </h1>
            <div className="absolute flex right-0">
                <ThemeSwitch />
                {
                    user
                        ?
                        <>
                            <img className="hidden md:block mt-[1.2em] mr-[0.5em] h-6 w-6" src={streakLogo || ""} />
                            <h1 className={"hidden md:block mt-[1em] mr-[2em] font-bold  text-lg " + (state.ThemeMode ? 'text-slate-700' : 'text-white')}>
                                {userKNStreak.streak} Ngày
                            </h1>
                            <img className="hidden md:block mt-[1.2em] mr-[0.5em] h-6 w-6" src={KNlogo || ""} />
                            <h1 className={"hidden md:block mt-[1em] mr-[2em] font-bold text-lg " + (state.ThemeMode ? 'text-slate-700' : 'text-white')}>
                                {userKNStreak.kn} KN
                            </h1>
                            <div className="dropdown dropdown-end mt-[0.6em] mr-[2em] ">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL === null ? String(IMG_avatar) : String(user.photoURL)} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Cá nhân
                                            <span className="badge">Mới</span>
                                        </a>
                                    </li>
                                    <li><a>Cài đặt</a></li>
                                    <li><a onClick={handleLogOut}>Đăng xuất</a></li>
                                </ul>
                            </div>
                        </>
                        :
                        <>

                            <label htmlFor={"login-box"} className="btn btn-info mt-2 mr-2">{IsLogin ? <BeatLoader color={"#ffffff"} loading={true} size={10} /> : "Bắt đầu học"}</label>
                        </>
                    // <button className="btn btn-info mt-2 mr-2" onClick={AuntGoogle}>Đăng nhập</button>
                }


                <input type="checkbox" id="login-box" onChange={() => { handleClickLoginBox() }} checked={state.isCloseLoginBox} className="modal-toggle" />
                <SignInBox handleGoogleLogin={handleGoogleLogin} IsLogin={IsLogin} />

            </div>
        </div >
    )
}
export default Header;