import { useState, useEffect } from 'react';;
import { useGlobalStore } from '../../../GlobalState/';
import Card from '../components/Card'
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
function Ex1rmb() {
    const [state, dispatch] = useGlobalStore()
    const [currentWord, SetWord] = useState('')
    const [currentProcess, SetProcess] = useState(0)
    const [currentProcessCount, SetProcessCount] = useState(0)
    const [maxCount, SetMaxCount] = useState(0)
    const [learnType,setLearnType] = useState('read')
    const wordsArr = Object.keys(state.currentLearn.data).sort();
    const wordArrLength = wordsArr.length;
    useEffect(() => {
        // Object.keys(state.currentLearn);
        console.log(state.currentLearn.data)
        
        SetWord(wordsArr[0])
        SetMaxCount(wordArrLength)
    }, [])
    function handleSetProc(nowCount){
        SetProcessCount(nowCount+1)
        SetProcess((nowCount+1)*100/maxCount)
    }
    function handleNext(){
        if(currentProcessCount>=maxCount-1){
            SetProcess(100)
        }
        else{
            handleSetProc(currentProcessCount)
            SetWord(wordsArr[currentProcessCount+1])
        }
    }
    return (<>
        <div className="w-screen h-[4em] flex justify-center items-center">
        <Link to="/">
            <button className="btn btn-square btn-outline btn-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            </Link>
            <progress className="ml-5 progress progress-info h-2 w-[70%]" value={currentProcess} max="100"></progress>
        </div>
        <div className="w-screen h-[100%] flex justify-center items-center">
            {
                currentWord == '' ?
                    <BeatLoader color={"#3ABFF8"} loading={true} size={30} />
                    :
                    <Card word={currentWord} wordData={state.currentLearn.data[currentWord]} />
            }
        </div>
        <div className="absolute w-screen h-[7em] outline-gray-500 bottom-0 flex justify-center items-center">
            <button className="btn btn-lg btn-ghost">Bỏ qua</button>
            <button className="ml-[15%] btn-lg btn btn-info" onClick={handleNext}>TIẾP TỤC</button>
        </div>
    </>
    )
}
export default Ex1rmb;