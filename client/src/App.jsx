import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/edit';
import { Route, Routes } from 'react-router-dom';
import Details from './components/Details';

function App() {

  return (
   <>
   <Navbar />
   <Routes>
     <Route exact path='/' Component={Home}/>
     <Route exact path='/register' Component={Register}/>
     <Route exact path='/edit/:id' Component={Edit} />
     <Route exact path='/view/:id' Component={Details} />
     
   </Routes>
   </>
  )
}

export default App
