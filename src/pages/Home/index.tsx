import {useGlobalStore} from '../../GlobalState/';
import {useEffect,useState} from 'react'
import {getCourse} from '../Learning/lib'
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
function Home() {

  const [currentCourse,SetCC] = useState<any>(null);
  const [state,dispatch] = useGlobalStore();
  useEffect(()=>{
    getCourse('core1').then((couserData)=>{
      // Object.keys(couserData).map(function(key, index) {
      //   console.log(couserData[key].name)
      // });
      SetCC(couserData)
    })
    
  },[])
  return (<div className={"bg-white  pb-5 "+(state.ThemeMode?'':'darkmode')}>
    
    <div className="flex font-['Nunito']">
      <div>
        <div>
          <h3 className={"mt-[1.5em] ml-[2em]  text-xl font-bold "+(state.ThemeMode?'text-black':'text-white')}>
            Từ vựng cấp độ 1 (A1-A2)
          </h3>
          <div className=" md:grid md:grid-cols-3 md:gap-3 text-white">
            {
              currentCourse!=null?
              Object.keys(currentCourse).sort().map((key:any, index:any) =>
              <Link key={index}  to="/learning">
                <button key={index} className={"w-[15em] h-[9em] transition hover:-translate-y-1 hover:scale-110 duration-300 ml-[2.5em] mt-[1.5em] bg-gradient-to-br "
                 + currentCourse[key].bg_color_from + " "
                  + currentCourse[key].bg_color_to + " rounded-3xl"}>
                  <p className="font-medium">Bài {index+1}</p>
                  <h2 className="mb-2 font-bold text-lg">
                    {currentCourse[key].name}
                  </h2>
                  <p className="font-normal">{currentCourse[key].detail}</p>
                </button>
                </Link>

              )
              :
              <div className="h-screen w-screen flex justify-center items-center">
                <div className="">

                <BeatLoader color={"#3ABFF8"} loading={true} size={30} /> 
                </div>
              </div>
              
            }
          </div>
        </div>
        {/* <div>
          <h3 className="mt-[1.5em] ml-[2em] text-black text-lg font-bold">
            Lộ trình học trung cấp
          </h3>
          <div className="flex">
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-violet-800 to-pink-600 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Pimsleur English Course
              </h2>
              <p className="font-light">Người mới học hoàn toàn</p>
              <p className="font-light">Căn bản (~IELTS 0).</p>
            </div>
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-pink-600 to-red-600 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Original English Course
              </h2>
              <p className="font-light">Người đã có nền tảng căn bản.</p>
              <p className="font-light">Căn bản (~IELTS 0-3.0).</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mt-[1.5em] ml-[2em] text-black text-lg font-bold">
            Lộ trình học nâng cao
          </h3>
          <div className="flex">
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Pimsleur English Course
              </h2>
              <p className="font-light">Người mới học hoàn toàn</p>
              <p className="font-light">Căn bản (~IELTS 0).</p>
            </div>
            <div className="ml-[2.5em] mt-[1.5em] p-10 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl">
              <h2 className="mb-2 font-bold text-lg">
                Original English Course
              </h2>
              <p className="font-light">Người đã có nền tảng căn bản.</p>
              <p className="font-light">Căn bản (~IELTS 0-3.0).</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>

  </div>)
}
export default Home;