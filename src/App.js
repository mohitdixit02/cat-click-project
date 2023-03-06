import './App.css';
import Form from './Components/Form';
import Gallery from './Components/Gallery';
import Info from './Components/Info';
import Leftnav from './Components/Leftnav';


function App() {
  return (
    <div className="App">
      <div className="top_header">
        <Leftnav/>
        <Info/>
        <Form/>
      </div>
        <Gallery/>
    </div>
  );
}

export default App;
