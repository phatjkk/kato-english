import { db } from '../../../firebase'
import { doc, getDoc, collection } from "firebase/firestore";
const getUser = async () => {
    const docRef = doc(db, "kato-data", "unit1-exercise","ex1","A");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  const getWords = async (unit) => {
    const docRef = doc(db, "kato-data", "unit"+unit+"-words");
    const docSnap:any = await getDoc(docRef);
    return docSnap.data()
  }
  const getCourse = async (courseName) => {
    const docRef = doc(db, "kato-data", "cousreData_"+courseName);
    const docSnap:any = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()
    
    } else {
      return null;
    }
  }
export {getWords,getCourse}