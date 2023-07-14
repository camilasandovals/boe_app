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
import { createContext, useState, useEffect } from 'react';
import Account from './pages/Account';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const oldUser = localStorage.getItem("user");
    console.log({ oldUser });
    const parsedUser = JSON.parse(oldUser);
    if (parsedUser) {
      setUser(parsedUser);
      console.log(user);
    }
  
  }, [setUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
          {/* <Route path='/edit' element={<Account />} /> */}
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
