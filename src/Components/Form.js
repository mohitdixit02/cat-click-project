import React from 'react';
import './static/css/form.css'

const Form = () => {
    return (
        <div>
            <div className='form_holder'>
                <form>
                    <div className="top_form">
                        <button className='blue_bttn'> Open New Form</button>
                        <input style={{ 'paddingLeft': '15px' }} type="text" placeholder='Cat Name' />
                        <input style={{ 'paddingLeft': '15px' }} type="number" placeholder='Cat Clicks' />
                        <input type='file'/>
                        <div className="bttn_holder">
                            <button className='green_bttn'> Save</button>
                            <button className='red_bttn'> Discard</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
