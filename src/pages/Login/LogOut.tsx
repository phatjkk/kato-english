import {signOut } from "firebase/auth";
import { auth } from "../../firebase";
const LogOut = () => signOut(auth);
export default LogOut
