import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Verify from './Pages/Verify'
import ForgetPassword from './Pages/ForgetPassword'
import Cart from './Pages/Cart'
import Card from './Pages/Card'
import Display from './Pages/Display'
import History from './Pages/History'
import Main from './Pages/Admin/Main'
import AdminCard from './Pages/Admin/AdminCard'

const App = () => {
  const [currentuser,setCurrentuser] = useState(undefined)
  const [menu,setMenu] = useState([])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home currentuser = {currentuser} setCurrentuser={setCurrentuser} menu={menu} setMenu={setMenu} />}/>
        <Route path='/login' element={<Login currentuser = {currentuser} setCurrentuser={setCurrentuser}/>}/>
        <Route path='/register' element={<Register  currentuser = {currentuser} setCurrentuser={setCurrentuser} />}/>
        <Route path='verify' element={<Verify currentuser = {currentuser} setCurrentuser={setCurrentuser} />}/>
        <Route path='forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/card/:id' element={<Card menu={menu}/>}/>
        <Route path='/display' element={<Display/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='/admincard/:id' element={<AdminCard/>}/>
      </Routes>
    </Router>
  )
}

export default App