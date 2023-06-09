import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Context from './Context';
import { useNavigate, useParams } from 'react-router-dom';

export default function Planos() {;
  const {token, setInfoUser} = useContext(Context);
  const navigate = useNavigate();
  const [planos, setPlanos] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
      }
    }
    useEffect(() => {
      axios.get('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships', config)
        .then((response) => {
          setPlanos(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }, [token]);

  return (
    <Container>
      <EscolhaPlano>Escolha seu Plano</EscolhaPlano>
      {planos.map((plano) => { 
        return (
          <PlanoItem onClick={() => {navigate(`/subscriptions/${plano.id}`)
          setInfoUser((prevState) => ({
            ...prevState,
            membershipId: plano.id}))
        }
          
          } key={plano.id}>
            <img src={plano.image} alt="" />
            <p>R${plano.price}</p>
          </PlanoItem>
        )}
      )
      }
    </Container>
  );
}

const PlanoItem = styled.div`
  display: flex;
  width: 290px;
  height: 180px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 16px;
  cursor: pointer;
  background: #0E0E13;
  border: 3px solid #7E7E7E;
  border-radius: 12px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;

  img {
    width: 150px;
    height: auto;
  }

  p {
    margin-top: 8px;
    color: white;
    font-size: 24px;
  }
`;

const EscolhaPlano = styled.h1`
  font-size: 32px;
  color: white;
`;

const Container = styled.div`
  background-color: #0E0E13;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;

