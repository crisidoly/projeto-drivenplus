import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './assets/components/Login';
import SignUp from './assets/components/SignUp';
import Planos from './assets/components/Planos';
import Context from './assets/components/Context';
import Plano from './assets/components/Plano';
import Home from './assets/components/Home';

function App() {
  const [token, setToken] = useState([]);
  const usarContexto = useContext(Context);
  const [infoUser, setInfoUser] = useState({ 
    membershipId: "",
    cardName: "",
    cardNumber: "",
    securityNumber: "",
    expirationDate: "",
  })
  const [userName, setUserName] = useState("")

  return (
    <Context.Provider value={{token, setToken, infoUser, setInfoUser, userName, setUserName}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/subscriptions" element={<Planos />} />
          <Route path="/subscriptions/:id" element={<Plano />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
