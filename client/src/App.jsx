 


import { useState } from 'react'; 
import Signup from './Login-Signup/Signup.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login-Signup/Login.jsx';
import AppRoutes from './AppRoutes.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>  
        <Route path="/login" element={<Login />}></Route>  
         <Route path="/dashboard" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}


 

export default App;
