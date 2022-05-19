import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
// import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, NavbarBrand} from 'react-bootstrap';

function App() {


  
  return (
    <div className="App">

      <Header></Header>
      
      <Home></Home>
    </div>
  );
}

export default App;
