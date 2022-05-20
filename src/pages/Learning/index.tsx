import { db } from '../../firebase'
import { doc, getDoc, collection } from "firebase/firestore";
import { useState, useEffect } from 'react';
import {useGlobalStore} from '../../GlobalState/';
import Ex1rmb from "./exercises/Ex1rmb"
import {getWords} from './lib'
function Learning() {
  const [state,dispatch] = useGlobalStore()
  const [isRememberWord,SetIsRMBW] = useState(false)
  useEffect(() => {
      getWords('1').then((worddb)=>{
        dispatch({type:"SET_LEARN",value:{typeEx:"Remember_Word",unit:"1",data:worddb}})
        
        SetIsRMBW(true);
        
      })
      
  },[])

  return (<div>
    {
    isRememberWord?
    <Ex1rmb />
    :
    ""
    }
  </div>)

}
export default Learning