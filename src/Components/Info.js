import React,{useEffect,useState} from 'react';
import './static/css/info.css'
import {clickupdate, ageValue} from './utility'

const Info = (props) => {
    const [img_url,setImgUrl]=useState();
    useEffect(()=>{
        let data_array=props.actv_cat['img_cat'];
        if(data_array){
            let data_string=data_array.join('/');
            setImgUrl(data_string);
        }
    },[props.actv_cat]);

    function updateClicks(){
        clickupdate(props.actv_cat['name'],props.actv_cat['click']);
        props.setActvCat({
            'name': props.actv_cat['name'],
            'click': parseInt(props.actv_cat['click'])+1,
        })
    }
    return (
        <>
            <div className="info_holder">
                <div className="info_name_cat">{props.actv_cat['name']}</div>
                <div className="cat_img_holder">
                    <img src={img_url} onClick={updateClicks} alt="" />
                </div>
                <div className="cat_age"><strong>Current Age : </strong>{ageValue(parseInt(props.actv_cat['click']))}</div>
                <div className="cat_click_no"><strong>No of Clicks : </strong>{props.actv_cat['click']}</div>
            </div>
        </>
    );
}

export default Info;
