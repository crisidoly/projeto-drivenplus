import styled from "styled-components";
import { useContext } from "react";
import Context from "./Context";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { token, setInfoUser, infoUser } = useContext(Context); 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const planoSingular = location.state ? location.state.planoSingular : null;

  const handleMudarPlanoClick = () => {
    navigate("/subscriptions");
  };
  console.log(planoSingular)

  const handleCancelarPlanoClick = () => {
    axios
      .delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions", config)
      .then(() => {
        navigate("/subscriptions");
      })
      .catch((error) => {
        console.log("Erro ao cancelar o plano:", error);
      });
  };

  
  return (
    <Container>
      <Header>
        <img src={planoSingular?.image} /> 
        <p>Olá Drivener</p>
      </Header>
      <ul>
        {planoSingular?.perks.map((plano) => (
          <PlanoItem key={plano.id}>{plano.title}</PlanoItem>
        ))}
      </ul>
      <Botoes>
        <MudarPlano onClick={handleMudarPlanoClick}>Mudar plano</MudarPlano>
        <CancelarPlano onClick={handleCancelarPlanoClick}>Cancelar plano</CancelarPlano>
      </Botoes>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PlanoItem = styled.div`
  width: 310px;
  height: 52px;
  margin-bottom: 4px;
  margin-right: 40px;
  background-color: #ff4791;
  border-radius: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  height: 180px;
  display: flex;
  margin-bottom: 100px;
  img {
    margin-top: 32px;
    display: flex;
    position: fixed;
    left: 0;
    margin-left: 30px;
  }
  p {
    color: white;
  }
`;

const MudarPlano = styled.button`
  width: 310px;
  height: 52px;
  margin-bottom: 4px;
  background-color: #ff4791;
  border-radius: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CancelarPlano = styled.button`
  width: 310px;
  height: 52px;
  margin-bottom: 4px;
  background-color: red;
  border-radius: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
`;

const Botoes = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 0;
`;
