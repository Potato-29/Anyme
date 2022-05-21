import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
// import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, NavbarBrand} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimePage from './components/AnimePage';

function App() {


  
  return (
    <Router>
      <div className="App"> 
        <Header/>
        <div className='content'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/animepage/:id' element={<AnimePage/>} />

        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
