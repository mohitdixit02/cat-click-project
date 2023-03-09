import './App.css';
import Form from './Components/Form';
import Gallery from './Components/Gallery';
import Info from './Components/Info';
import Leftnav from './Components/Leftnav';
import { useState } from 'react';


function App() {
  const [actv_cat,setActvCat] = useState('');
  return (
    <div className="App">
      <h1 className='main_heading'>Cat Clicks Project</h1>
      <hr style={{'border':'1px','height':'2px','backgroundColor':'black'}} />
      <br />
      <div className="top_header">
        <Leftnav actv_cat={actv_cat} setActvCat={setActvCat}/>
        <Info actv_cat={actv_cat} setActvCat={setActvCat}/>
        <Form actv_cat={actv_cat} setActvCat={setActvCat}/>
      </div>
        <Gallery setActvCat={setActvCat}/>
    </div>
  );
}

export default App;
