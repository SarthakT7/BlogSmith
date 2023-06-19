import React from "react";
import { Navigate, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';
const App = () => {

  const user = localStorage.getItem('token');
  return (
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        {/* <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path = "/" exact element={<Navigate replace to = '/login'/>}/> */}
      </Routes>
  )
}
export default App;