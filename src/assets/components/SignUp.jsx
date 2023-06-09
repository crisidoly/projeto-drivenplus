import axios from "axios";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";

export default function PaginaLogin() {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
   
  const handleRegister = async (e) => {
    e.preventDefault();

    const body = { email, name, cpf, password };

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', body);
    promise.then(() => navigate("/"));
    promise.catch(e => { alert(e.response.data.message) });
  };

  return (
    <Container>
      <Form>
          <Logo />

        <Input 
          data-test="name-input" 
          value={email} 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="EMAIL" 
          name="email" 
          required
        />

        <Input 
          value={name} 
          data-test="user-name-input"
          type="text" 
          placeholder="NOME" 
          onChange={(e) => setName(e.target.value)} 
          name="nome" 
          required
        />

        <Input 
          value={cpf} 
          data-test="user-cpf-input" 
          type="text" 
          placeholder="CPF" 
          onChange={(e) => setCpf(e.target.value)} 
          name="cpf" 
          required
        />

        <Input 
          value={password} 
          data-test="password-input" 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="SENHA" 
          name="senha" 
          required
        />

        <Button 
          type="submit" 
          data-test="signup-btn" 
          onClick={handleRegister}
        >
          CADASTRAR
        </Button>
      </Form>

      <Login>
        <Link data-test="login-link" to={"/"}>
          <p>Já tem uma conta? Faça login!</p>
        </Link>
      </Login>
    </Container>
  );
}

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0;
  border: 0;
  input::placeholder {
    color: gray;
  }
`;

const Input = styled.input`
  height: 45px;
  width: 303px;
  background-color: white;
  text-align: center;
  color: black;
  font-family: "Oswald";
  font-size: 22px;
  margin-top: 8px;
  font-weight: 900;
  border-radius: 24px;
  border: none;
  input::placeholder {
    color: gray;
  }
`;

const Button = styled.button`
  background-color: #FF4791;
  height: 51px;
  width: 311px;
  font-weight: 900;
  font-family: "Oswald";
  font-size: 22px;
  margin-top: 16px;
  border: none;
  border-radius: 24px;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
`;

const Container = styled.div`
  background-color: #0E0E13;
  width: 100vw;
  height: 100vh;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
  margin-top: 8px;
  font-family: "Oswald";
  font-weight: 300;
  
  p {
    text-decoration: none;
    color: white;
  }
`;
