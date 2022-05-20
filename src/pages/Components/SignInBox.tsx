import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react"
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore"; 

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { useGlobalStore } from "../../GlobalState"

function SignInBox({ handleGoogleLogin, IsLogin }: { handleGoogleLogin: any, IsLogin: any }) {
    const [state, dispatch] = useGlobalStore()
    const [registerActive, setRegActive] = useState(true)
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const [user, setUser] = useState({});


    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const Register = () => {
        // Check Email
        let isEmail = validateEmail(registerEmail)
        if (!isEmail) {
            alert(`Email "${registerEmail}" không hợp lệ`)
            return
        }
        //Check Password
        if (registerPassword.length < 8) {
            alert("Mật khẩu quá ngắn, phải trên 8 ký tự.")
            return
        }
        RegisterEmail(registerEmail, registerPassword, registerUsername)
        dispatch({type:"SHOW_HIDE_LOGIN_BOX"})
    }

    const Login = () => {
        let isEmail = validateEmail(loginEmail)
        if (!isEmail) {
            alert(`Email "${loginEmail}" không hợp lệ`)
            return
        }
        //Check Password
        if (loginPassword.length < 8) {
            alert("Mật khẩu quá ngắn, phải trên 8 ký tự.")
            return
        }
        LoginEmail(loginEmail, loginPassword)
        dispatch({type:"SHOW_HIDE_LOGIN_BOX"})
    }


    const RegisterEmail = async (registerEmail, registerPassword, registerUsername) => {

        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            dispatch({
                type:"SET_USER",
                value:user
            })
            const docRef = await addDoc(collection(db, "users"), {
                id:user.user.uid,
                username:registerUsername,
                KN: 0,
                streak:0,
                process:{
                    words:0,
                    course:{}
                }
              });
            // user.user.uid)
            console.log(docRef.id);
        } catch (error) {
                alert("Lỗi không xác định, vui lòng thử lại!\nMã lỗi:"+String(error));
        }
    };

    const LoginEmail = async (loginEmail, loginPassword) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            dispatch({
                type:"SET_USER",
                value:user
            })
            console.log(user);
        } catch (error) {
            if(String(error).includes("user-not-found")){
                alert("Tài khoản không tồn tại!");
            }
        }
    };
    return (
        <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="login-box" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                <div className="tabs mb-2 text-teal-500 ">
                    <a className={"tab tab-bordered " + (registerActive ? "tab-active" : "")} onClick={() => setRegActive(true)}>ĐĂNG KÝ</a>
                    <a className={"tab tab-bordered " + (!registerActive ? "tab-active" : "")} onClick={() => setRegActive(false)}>ĐĂNG NHẬP</a>
                </div>
                {
                    !registerActive ?
                        <div>
                            <h3 className="text-lg font-bold text-black">Hãy đăng nhập để bắt đầu học nhé!</h3>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-black">Địa chỉ Email</span>
                                </label>
                                <input type="text" placeholder="" onChange={e => setLoginEmail((e.target as HTMLInputElement).value)} className="input input-bordered input-info w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Mật khẩu</span>
                                </label>
                                <input type="password" placeholder="" onChange={e => setLoginPassword((e.target as HTMLInputElement).value)} className="input input-bordered input-info w-full max-w-xs" />

                            </div>
                            <div>


                                <label className="btn right-0 btn-info mt-2 mr-2" onClick={Login}>Đăng nhập</label>
                                <button className="btn btn-error mt-2 mr-2" onClick={handleGoogleLogin}>{IsLogin ? <BeatLoader color={"#ffffff"} loading={true} size={10} /> : "Tiếp tục với Google"}</button>
                                {/* <button className="btn btn-active btn-primary  mt-2 mr-2">Tiếp tục với Facebook</button> */}
                            </div>
                        </div>
                        :
                        <div>
                            <h3 className="text-lg font-bold text-black">Đăng ký tài khoản</h3>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-black">Tên hiển thị</span>
                                </label>
                                <input type="text" placeholder="" onChange={e => setRegisterUsername((e.target as HTMLInputElement).value)} className="input input-bordered input-info w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text text-black">Địa chỉ Email</span>
                                </label>
                                <input type="email" placeholder="" onChange={e => setRegisterEmail((e.target as HTMLInputElement).value)} className="input input-bordered input-info w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text">Mật khẩu</span>
                                </label>
                                <input type="password" placeholder="" onChange={e => setRegisterPassword((e.target as HTMLInputElement).value)} className="input input-bordered input-info w-full max-w-xs" />

                            </div>
                            <div>


                                <label className="btn btn-success right-0 btn-info mt-2 mr-2" onClick={Register}>Đăng ký</label>
                                <button className="btn btn-error mt-2 mr-2" onClick={handleGoogleLogin}>{IsLogin ? <BeatLoader color={"#ffffff"} loading={true} size={10} /> : "Tiếp tục với Google"}</button>
                                {/* <button className="btn btn-active btn-primary  mt-2 mr-2">Tiếp tục với Facebook</button> */}
                            </div>
                        </div>
                }

            </div>
        </div >
    )
}
export default SignInBox