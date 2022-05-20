
import {useGlobalStore} from '../../GlobalState/';
function Footer() {
    const [state,dispatch] = useGlobalStore();
    return (
        <div id="Footer" className={"flex justify-center items-center font-bold font-['Nunito'] h-[4em] border-b-2 w-full  "+(state.ThemeMode?'':'darkmode text-white')}>
            Directed by phatjk with ❤️
        </div>
    )
}
export default Footer