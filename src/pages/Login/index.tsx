import { auth} from "../../firebase";
import AuntGoogle from "./AuthGoogle"
import LogOut from "./LogOut";
import { useAuthState } from "react-firebase-hooks/auth";
function Login() {
    const [user, loading, error] = useAuthState(auth);
  
    return (
        <div>
            {
                user
                    ?
                    <div>
                        <p>Current User: {user.email}</p>
                        <button onClick={()=>LogOut()}>Log out</button>
                    </div>
                    :
                    <button onClick={AuntGoogle}>Login Google</button>
            }
            {
                loading
                    ?
                    <div>
                        <p>Initialising User...</p>
                    </div>
                    :
                    ""
            }
            {
                error
                    ?

                    <div>Error: </div>


                    :
                    ""
            }
        </div>
    )
}
export default Login