import logo from "../icon/card.png";
import KNlogo from "../icon/star.png";
import streakLogo from "../icon/fire.png";
import { auth } from "../../firebase";
import AuntGoogle from "../Login/AuthGoogle"
import LogOut from "../Login/LogOut";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BeatLoader from "react-spinners/BeatLoader";
function Header() {
    const [user, loading, error] = useAuthState(auth);
    const [IsLogin, ChangeIsLogin] = useState(false);
    const [CloseLoginBox, ChangeLoginBoxDisplay] = useState(false);
    const handleGoogleLogin = () => {
        ChangeIsLogin(true)
        console.log("loading")
        AuntGoogle().then(()=>{
            ChangeLoginBoxDisplay(false)
            ChangeIsLogin(false)
        }).catch(()=>{
            ChangeLoginBoxDisplay(false)
            ChangeIsLogin(false)
        });

        
    }
    const handleClickLoginBox = (chkValue: any) => {
        ChangeLoginBoxDisplay(chkValue.target.checked);
    }
    return (
        <div id="Header" className="flex font-['Nunito'] h-[4em] border-b-2 w-full">
            <img className="mt-[0.6em] ml-[2em] h-10 w-10" src={logo||""} />
            <h1 className="invisible md:visible mt-[0.8em] ml-[0.5em] font-bold text-slate-900 text-xl">
                Kato English
            </h1>
            <div className="absolute flex right-0">

                {
                    user
                        ?
                        <>
                            <img className="invisible md:visible mt-[1.2em] mr-[0.5em] h-6 w-6" src={streakLogo||""} />
                            <h1 className="invisible md:visible mt-[1em] mr-[2em] font-bold text-slate-700 text-lg">
                                0 KN
                            </h1>
                            <img className="invisible md:visible mt-[1.2em] mr-[0.5em] h-6 w-6" src={KNlogo||""} />
                            <h1 className="invisible md:visible mt-[1em] mr-[2em] font-bold text-slate-700 text-lg">
                                0 KN
                            </h1>
                            <div className="dropdown dropdown-end mt-[0.6em] mr-[2em] ">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={String(user.photoURL)||""} />
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
                                    <li><a onClick={LogOut}>Đăng xuất</a></li>
                                </ul>
                            </div>
                        </>
                        :
                        <label htmlFor={"login-box"} className="btn btn-info mt-2 mr-2">{IsLogin ? <BeatLoader color={"#ffffff"} loading={true} size={10} /> : "Bắt đầu học"}</label>
                    // <button className="btn btn-info mt-2 mr-2" onClick={AuntGoogle}>Đăng nhập</button>
                }



                <input type="checkbox" id="login-box" onChange={(event) => { handleClickLoginBox(event) }} checked={CloseLoginBox} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="login-box" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>


                        <h3 className="text-lg font-bold">Hãy đăng nhập để bắt đầu học nhé!</h3>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tên tài khoản hoặc Email:</span>
                            </label>
                            <input type="text" placeholder="" className="input input-bordered input-info w-full max-w-xs" />
                            <label className="label">
                                <span className="label-text">Mật khẩu:</span>
                            </label>
                            <input type="password" placeholder="" className="input input-bordered input-info w-full max-w-xs" />

                        </div>
                        <div className="">


                            <label className="btn right-0 btn-info mt-2 mr-2">Đăng nhập</label>
                            <button className="btn btn-error mt-2 mr-2" onClick={handleGoogleLogin}>{IsLogin ? <BeatLoader color={"#ffffff"} loading={true} size={10} /> : "Tiếp tục với Google"}</button>
                            {/* <button className="btn btn-active btn-primary  mt-2 mr-2">Tiếp tục với Facebook</button> */}
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
export default Header;