import React, { useState, useEffect } from 'react';
import "./static/css/leftnav.css"
import db from '../firebase/firebase';
import { ref, onValue } from 'firebase/database'

const Leftnav = (props) => {
    const [cats_data, setData] = useState([]);

    // Initial Load
    useEffect(() => {
        onValue(ref(db, 'cats_data'), (snapshot) => {
            var data = snapshot.val();
            let temp = [];
            for (let i of Object.keys(data)) {
                temp.push(data[i]);
            }
            setData(temp);

            // Initialize active cat
            let init_key = Object.keys(data)[0];
            props.setActvCat(data[init_key]);

            // activatving row of actv cat
            let k = document.getElementById(init_key);
            try{
            let targ = k.parentElement.parentElement;
            targ.className = 'list-group-item active';
            }catch{}
        })
    }, []);

    // Change on actv cat
    useEffect(() => {
        onValue(ref(db, 'cats_data'), (snapshot) => {
            var data = snapshot.val();
            let temp = [];
            for (let i of Object.keys(data)) {
                temp.push(data[i]);
            }
            setData(temp);

        })

        // clearing all actv cats state
        let old_states = document.getElementsByClassName('list-group-item');
        for (let i of old_states) {
            i.className = 'list-group-item';
        }

        // setting new cats state
        let k = document.getElementById(props.actv_cat['name']);
        try {
            let targ = k.parentElement.parentElement;
            targ.className = 'list-group-item active';
        } catch { }
    }, [props.actv_cat]);

    function activeCat(e) {
        let targ = e.target.id;
        if (targ != '') {
            onValue(ref(db, 'cats_data/' + targ + '/'), (snapshot) => {
                var data = snapshot.val();
                props.setActvCat(data);
            })
        }
    }

    // data = data['Tommy'];
    // let data_array=data['img_cat'];
    // let data_string=data_array.join('/');
    // setImgUrl(data_string);

    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item" style={{ 'textAlign': 'center', 
                'fontWeight': 'bold', 'backgroundColor': 'rgb(146, 146, 146)', 'padding':'8px 0px'
                 }}>Cats List</li>
                {
                    cats_data.map((value, index) => {
                        return (
                            <li className="list-group-item" key={index} onClick={activeCat}>
                                <div className="cat_data">
                                    <span className='cat_name' id={value['name']}>{value['name']}</span>
                                    <span className='clicks_no'>{value['click']}</span>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default Leftnav;

