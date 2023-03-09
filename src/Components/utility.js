import db from '../firebase/firebase';
import { ref, get,child, set, onValue } from 'firebase/database'

function clickupdate(name,click){
    let value=parseInt(click);
    value++;
    set(ref(db, 'cats_data/'+name+'/click/'),value);
}

// (0 to 5: Infant, 6 to 12: Child, 13 to 25: Young, 26 to 40: Middle-Age, 41 to 60: Old >61: Very Old)
function ageValue(clicks){
    if(clicks<6 && clicks>-1){
        return('Infant');
    }
    else if(clicks<13 && clicks>5){
        return('Child');
    }
    else if(clicks<26 && clicks>12){
        return('Young');
    }
    else if(clicks<41 && clicks>25){
        return('Middle Age');
    }
    else if(clicks<61 && clicks>40){
        return('Old');
    }
    else if(clicks>60){
        return('Very Old');
    }
}

export {clickupdate, ageValue}