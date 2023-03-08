import db from '../firebase/firebase';
import { ref, get,child, set, onValue } from 'firebase/database'

function clickupdate(name){
    get(child(db, 'cats_data/'+name+'/click/').then((snapshot)=>{
        let click_no=snapshot.val();
        console.log(click_no);
        // if(click_no){
        //     console.log(click_no);
        // }
    }))
}
async function setClicks(name,value){
    set(ref(db, 'cats_data/'+name+'/click/'),value);
}

export default clickupdate