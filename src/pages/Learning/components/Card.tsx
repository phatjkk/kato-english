import { useEffect } from "react";
import AUDIO_ICON from "../icon/audio.png"
import AUDIO_ICON_Playing from "../icon/audio-playing.gif"
import { useSpeechSynthesis } from "react-speech-kit";
import { useState } from "react";
function Card({ word, wordData }) {
    const [isSpeakingWord,setISW] = useState(false)
    const { speak, voices } = useSpeechSynthesis({
        onEnd,
    });
    function onEnd() {
        setISW(false)
    }
    function handleSpeakWord() {
        setISW(true)
        const voice = voices.find((i) => i.lang === "en-US");
        speak({ text: word, voice })
    }
    function handleSpeak(text) {
        const voice = voices.find((i) => i.lang === "en-US");
        speak({ text: text, voice })
    }
    useEffect(() => {
        // console.log(word, wordData)
        // handleSpeakWord()
    }, [])
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <button onClick={handleSpeakWord} className="btn btn-square btn-info btn-lg">
                    <img className="w-10 h-10" src={isSpeakingWord?AUDIO_ICON_Playing:AUDIO_ICON} alt="fireSpot" />
                    {/* <AUDIO_ICON/> */}
                </button>
                <h1 className="card-title text-3xl">
                    {word} {{
                        'n': <div className="badge badge-info gap-2">Danh từ</div>,
                        'adj': <div className="badge badge-success gap-2">Tính từ</div>,
                        'v': <div className="badge badge-warning gap-2">Động từ</div>,
                        'adv': <div className="badge badge-error gap-2">Trạng từ</div>
                    }[wordData.type]
                    }

                    {/* <div className="badge badge-secondary">{wordData.type}</div> */}
                </h1>
                <i className="cursor-pointer" onClick={()=>handleSpeak(wordData.meaning_en)}>{String(wordData.meaning_en)}</i>
                {/* <p>{String(wordData.meaning_vi)}</p> */}
                <div className="badge badge-lg badge-warning gap-2 font-medium">
                    Ví dụ
                </div>
                <i className="font-medium cursor-pointer" onClick={()=>handleSpeak(wordData.ex)}>{String(wordData.ex)}</i>
                <div className="badge badge-accent badge-lg font-medium">Ý nghĩa</div>
                <p className="font-medium cursor-pointer" >{String(wordData.meaning_vi)}</p>
        
            </div>
        </div>
    )
}
export default Card;