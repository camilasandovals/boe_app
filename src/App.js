import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import About from "./pages/About"
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Signup from './pages/Signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
