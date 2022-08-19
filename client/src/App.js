import './App.css';
import Box from '@mui/material/Box'
import NavBar from './components/NavBar';
import AdminMenu from './components/AdminMenu';
import Login from "./views/Login.js"
import AdminCategory from './views/AdminCategory';
import AdminItem from './views/AdminItem';
import Shop from './views/Shop';
import CartPage from './views/CartPage';
import {Route, Router, Routes} from 'react-router-dom';
import CheckOutSuccess from './views/CheckOutSuccess';
import  SnackBar  from './components/SnackBar';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import RequireAdmin from './components/RequireAdmin';
import LogOut from './views/LogOut';
import SingleItem from './views/SingleItem';

const HomePage = ()=>(<h1>Welcome To CAndEs</h1>)



function App() {
  const {user} = useContext(AppContext)

  return (
    <>
    <SnackBar/>
      <NavBar>
        <Box sx={{minHeight:'90vh'}}>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/cart/:canceled" element={<CartPage/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/shop/:itemId" element={<SingleItem/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/checkoutsuccess" element={<CheckOutSuccess/>}/>
            <Route path="/logout" element={<LogOut/>}/>
            <Route path="/admincat" element={<RequireAdmin redirectTo={'/login'}><AdminCategory/></RequireAdmin>}/>
            <Route path="/adminitem" element={<RequireAdmin redirectTo={'/login'}><AdminItem/></RequireAdmin>}/>
          </Routes>
        </Box>
        {user?.is_admin?<AdminMenu/>:<></>}

      </NavBar>
    </>
  );
}

export default App;
