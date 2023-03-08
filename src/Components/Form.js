import React, { useState } from 'react';
import './static/css/form.css'
import db from '../firebase/firebase';
import { ref, set } from 'firebase/database';

const Form = (props) => {

    // New Form function
    function newForm(e) {
        e.preventDefault();

    }

    // Submit Function
    function submitFunction(e) {
        e.preventDefault();

        // getting data
        let name = document.getElementById('cat_name_input').value;
        let click = document.getElementById('cat_click_input').value;
        let img_cat = document.getElementById('cat_img_input').files[0];

        // converting img to bas64 String
        const reader = new FileReader();
        reader.onloadend = () => {
            let string_temp = reader.result;
            let string_array = string_temp.split('/')

            //Setting data in firebase
            set(ref(db, 'cats_data/' + name + '/'), {
                'name': name,
                'click': click,
                'img_cat': string_array,
            });
            props.setActvCat({
                'name': name,
                'click': click,
                'img_cat': string_array,
            })
        }
        reader.readAsDataURL(img_cat);
        let form = document.getElementById('cat_form');
        form.reset();

    }

    // Reset form function
    function resetForm(e) {
        e.preventDefault();
        let form = document.getElementById('cat_form');
        form.reset();
    }


    return (
        <div>
            <div className='form_holder'>
                <form onSubmit={submitFunction} id='cat_form'>
                    <div className="top_form">
                        <button className='blue_bttn' onClick={newForm} data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Open New Form</button>
                        <input style={{ 'paddingLeft': '15px', 'backgroundColor': 'darkgray' }} type="text" placeholder='Cat Name'
                            id='cat_name_input' disabled value={props.actv_cat['name']} />
                        <input style={{ 'paddingLeft': '15px' }} defaultValue={props.actv_cat['click']} type="number" placeholder='Cat Clicks' id='cat_click_input' />
                        <input type='file' id='cat_img_input' />
                        <div className="bttn_holder">
                            <button className='green_bttn'> Save</button>
                            <button className='red_bttn' onClick={resetForm}> Discard</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Cat Form</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div style={{'display':'flex','flexDirection':'column','rowGap':'15px'}}>
                            <input style={{ 'paddingLeft': '15px' }} type="text" placeholder='Cat Name'
                                id='cat_name_input' defaultValue={props.actv_cat['name']} />
                            <input style={{ 'paddingLeft': '15px' }} defaultValue={props.actv_cat['click']} type="number" placeholder='Cat Clicks' id='cat_click_input' />
                            <input type='file' id='cat_img_input' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="button" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
