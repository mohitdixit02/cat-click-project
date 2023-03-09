import React, { useState, useEffect } from 'react';
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

        // Comparing submit data with active cat
        // changing clicks
        if (props.actv_cat['click'] != click) {
            set(ref(db, 'cats_data/' + name + '/click/'), click);
            props.setActvCat({
                'name': name,
                'click': click,
                'img_cat': props.actv_cat['img_cat'],
            })
        }

        // changing Image
        // converting img to bas64 String
        const reader = new FileReader();
        reader.onloadend = () => {
            let string_temp = reader.result.toString();
            let string_array = string_temp.split('/')

            if (props.actv_cat['img_cat'] != string_array) {
                //Setting data in firebase
                set(ref(db, 'cats_data/' + name + '/img_cat/'), string_array);
            }
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

    // changing clicks on update
    useEffect(() => {
        let elem = document.getElementById('cat_click_input');
        elem.value = elem.defaultValue;
        let elem_file= document.getElementById('cat_img_input');
        elem_file.value = '';
        let modal_name= document.getElementById('cat_name_input_modal')
        modal_name.value = modal_name.defaultValue;
        let modal_click= document.getElementById('cat_click_input_modal')
        modal_click.value = modal_click.defaultValue;
        let modal_file= document.getElementById('cat_img_input_modal')
        modal_file.value = '';
    }, [props.actv_cat]);

    // Modal form editing
    function modaleditFunction(e) {
        e.preventDefault();
        // getting data
        let name = document.getElementById('cat_name_input_modal').value;
        if (props.actv_cat['name'] == name) {
            let click = document.getElementById('cat_click_input_modal').value;
            let img_cat = document.getElementById('cat_img_input_modal').files[0];

            // Comparing submit data with active cat
            // changing clicks
            if (props.actv_cat['click'] != click) {
                set(ref(db, 'cats_data/' + name + '/click/'), click);
                props.setActvCat({
                    'name': name,
                    'click': click,
                    'img_cat': props.actv_cat['img_cat'],
                })
            }

            // changing Image
            // converting img to bas64 String
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    let string_temp = reader.result.toString();
                    let string_array = string_temp.split('/')

                    if (props.actv_cat['img_cat'] != string_array) {
                        //Setting data in firebase
                        set(ref(db, 'cats_data/' + name + '/img_cat/'), string_array);
                    }
                    props.setActvCat({
                        'name': name,
                        'click': click,
                        'img_cat': string_array,
                    })
                }
                reader.readAsDataURL(img_cat);
            } catch { }
        }
        else {
            let click = document.getElementById('cat_click_input_modal').value;
            let img_cat = document.getElementById('cat_img_input_modal').files[0];
            try{
            const reader = new FileReader();
            reader.onloadend = () => {
                let string_temp = reader.result.toString(); 
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
            };
            reader.readAsDataURL(img_cat);
        }catch{}
    }
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
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'rowGap': '15px' }}>
                                <input style={{ 'paddingLeft': '15px' }} type="text" placeholder='Cat Name'
                                    id='cat_name_input_modal' defaultValue={props.actv_cat['name']} />
                                <input style={{ 'paddingLeft': '15px' }} defaultValue={props.actv_cat['click']} type="number" placeholder='Cat Clicks' id='cat_click_input_modal' />
                                <input type='file' id='cat_img_input_modal' />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => modaleditFunction(e)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
