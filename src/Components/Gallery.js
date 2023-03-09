import React, { useState, useEffect } from 'react';
import db from '../firebase/firebase';
import { ref, onValue } from 'firebase/database'
import './static/css/gallery.css'
import { clickupdate, ageValue } from './utility'

const Gallery = (props) => {
    const [gallery_array, setGallery] = useState([]);

    useEffect(() => {
        onValue(ref(db, 'cats_data'), (snapshot) => {
            var data = snapshot.val();
            let temp_len = Object.keys(data).length;
            let temp_arr = [];
            for (let i of Object.keys(data)) {
                temp_arr.push(data[i]);
            }

            // breaking into 4 rows
            let i = 0;
            let final_arr = [];
            for (let elem in temp_arr) {
                if (i < temp_len) {
                    let init_array = temp_arr.slice(i, i + 4);
                    final_arr.push(init_array);
                    i = i + 4;
                }
            }
            setGallery(final_arr);
        })
    }, []);

    // Update Clicks and Cat
    function updateClicks(e) {
        let targ_name = e.target.id;
        gallery_array.forEach(elem => {
            elem.map(value => {
                if (value['name'] == targ_name) {
                    clickupdate(targ_name, value['click']);
                    props.setActvCat({
                        'name': targ_name,
                        'click': parseInt(value['click']) + 1,
                        'img_cat': value['img_cat']
                    })
                }
            })
        })
        document.documentElement.scrollTop = 0;
    }

    return (
        <div>
            <div className='heading_gallery'>~ Cats Image Gallery ~</div>
            <hr style={{ 'border': '1px', 'height': '2px', 'backgroundColor': 'black' }} />
            <div className="gallery_holder">
                {
                    gallery_array.map(elem => {
                        return (
                            <div className="respn_holder_gallery">
                                <div className="gallery_holder_flex" key={elem}>
                                    {
                                        elem.map((value, index) => {
                                            let img_url;
                                            let data_array = value['img_cat'];
                                            if (data_array) {
                                                let data_string = data_array.join('/');
                                                img_url = data_string;
                                            }
                                            return (
                                                <div className="cat_gallry" key={value['name']}>
                                                    <div className="info_name_cat_gallery">{value['name']}</div>
                                                    <div className="gallery_img_holder">
                                                        <img src={img_url} alt="" id={value['name']} onClick={updateClicks} />
                                                    </div>
                                                    <div className="cat_age_gallery"><strong>Current Age : </strong>{ageValue(parseInt(value['click']))}</div>
                                                    <div className="cat_click_no_gallery"><strong>No of Clicks : </strong>{value['click']}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Gallery;
