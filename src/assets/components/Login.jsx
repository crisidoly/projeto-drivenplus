  import axios from 'axios';
  import React, { useEffect, useState, useContext } from 'react';
  import styled from 'styled-components';
  import { Link, useNavigate } from 'react-router-dom';
  import Context from './Context';
  import logo from '../images/logo.png'


  export default function PaginaLogin() {
    const {token, setToken} = useContext(Context)
    const {userName, setUserName} = useContext(Context)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
      }
    }, []);

    function login(e) { 
      if (e) {
      e.preventDefault();
    }
      const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login';
      const body = { email, password };

      const promise = axios.post(URL, body);
      promise
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          setToken(res.data.token)
          setUserName(res.data.name)
          if (res.data.membership === null) {
            navigate('/subscriptions');
          } else { 
            navigate('/home')
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }

  

    return (
      <Container>
        <Logo src={logo}/>
        <Form onSubmit={login}>
          <Input 
            data-test="email-input"
            type="email" 
            placeholder="EMAIL" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <div>
            <Input  
            data-test="password-input"
              type="password"
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button 
          type="submit" 
          onClick={login}
          data-test="login-btn">
            LOGIN
          </Button>
        </Form>
        <Login>
          <Link 
          to={"/sign-up"} 
          data-test="signup-link">
            <p>Não tem uma conta? Cadastre-se!</p>
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
      color:black;
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
      color:blue;
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
    border-style: none;
    border-radius: 24px;
    border: none;
  `;


  const Logo = styled.img`
    width: 400px;
    height: auto;
    margin-bottom: 80px;
  `;

  const Container = styled.div`
    background-color: #0E0E13;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
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
  `
