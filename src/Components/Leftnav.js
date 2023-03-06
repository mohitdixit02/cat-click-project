import React from 'react';
import "./static/css/leftnav.css"

const Leftnav = () => {
    return (
        <div>
            <ul className="list-group">
            <li className="list-group-item" style={{'textAlign':'center','fontWeight':'bold','backgroundColor':'rgb(146, 146, 146)'}}>Cats List</li>
                <li className="list-group-item">
                    <div className="cat_data">
                        <span className='cat_name'>lilly</span>
                        <span className='clicks_no'>14</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="cat_data">
                        <span className='cat_name'>Tom</span>
                        <span className='clicks_no'>1</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="cat_data">
                        <span className='cat_name'>Kevin</span>
                        <span className='clicks_no'>6</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="cat_data">
                        <span className='cat_name'>Nunki</span>
                        <span className='clicks_no'>7</span>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="cat_data">
                        <span className='cat_name'>Peter</span>
                        <span className='clicks_no'>11</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Leftnav;

