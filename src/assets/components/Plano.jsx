import styled from "styled-components"
import axios from "axios";
import { useContext, useState, useEffect } from "react"
import Context from "./Context"
import { useParams, useNavigate } from "react-router-dom";



export default function Plano() {
  const [planoSingular, setPlanoSingular] = useState({});
  const [assinatura, setAssinatura] = useState({})
  const [aparecerPopUp, setAparecerPopUp] = useState(false)
  const navigate = useNavigate();
  const params = useParams();
  const {token, infoUser, setInfoUser} = useContext(Context);
  const {id} = params;  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
      }
    }
    
  function handlePost() {
    axios.post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, infoUser, config)
    .then((response) => {
      setAssinatura(response.data);
      navigate('/home', { state: { planoSingular } })
      
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
    setAparecerPopUp(false)

  }

  function handleSubmit(p){
    p.preventDefault()
    setAparecerPopUp(true)

  }
    
    useEffect(() => {
      axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, config)
        .then((response) => {
          setPlanoSingular(response.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }, [token]);

if (planoSingular && planoSingular.perks) {
  return (
    <>
    {aparecerPopUp && 
    <PopUp>
      <ContainerPopUp>
        <p>Tem certeza que deseja assinar o plano {planoSingular.name}R${planoSingular.price}</p>
        <Botoes>
          <button onClick={handlePost}>Sim</button>
          <button onClick={() => setAparecerPopUp(false)}>Não</button>
        </Botoes> 
      </ContainerPopUp>
    </PopUp>}
      <Container>
        <img src={planoSingular.image}/>
        <h1>Benefícios</h1>

        <ol>
          {planoSingular.perks.map((plano) => { 
            return (
              <PlanoItem key={plano.id}>
              {plano.title}
              </PlanoItem>
            )}
          )
          }
      </ol>

        <Preco>
          <h1>Preço:</h1>
          <p>R${planoSingular.price}</p>
        </Preco>

      <Form onSubmit={handleSubmit}>
        
        <input
          data-test="name-input"
          value={infoUser.cardName}
          type="text"
          placeholder="Nome impresso no cartão"
          name="cardName"
          required
          onChange={(e) =>
            setInfoUser((prevState) => ({
              ...prevState,
              cardName: e.target.value
            }))
          }
        />

        <input
          value={infoUser.cardNumber}
          type="text"
          placeholder="Dígitos do cartão"
          name="cardNumber"
          required
          onChange={(e) =>
            setInfoUser((prevState) => ({
              ...prevState,
              cardNumber: e.target.value
            }))
          }
        />

        <Horizontal>
          <input
            value={infoUser.securityNumber}
            data-test="user-cpf-input"
            type="text"
            placeholder="Código de segurança"
            name="securityNumber"
            required
            onChange={(e) =>
              setInfoUser((prevState) => ({
                ...prevState,
                securityNumber: e.target.value
              }))
            }
          />

          <input
            value={infoUser.expirationDate}
            data-test="password-input"
            type="text"
            placeholder="Validade"
            name="expirationDate"
            required
            onChange={(e) =>
              setInfoUser((prevState) => ({
                ...prevState,
                expirationDate: e.target.value
              }))
            }
          />
        </Horizontal>
        <StyledButton
          type="submit"
          data-test="signup-btn"
        >
         ASSINAR
        </StyledButton>
      </Form>
      </Container>
    </>

  )

} 
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #0E0E13;
    p, h1{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: white;
    }
`

const PlanoItem = styled.li`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: white;
`
const Form = styled.form`
display: flex;
justify-content: space-between;
flex-direction: column;
    input {
      width: 299px;
      height: 52px;
      background: #FFFFFF;
      border-radius: 8px;
      margin-bottom: 4px;
    }
`

const Input = styled.input`

`

const StyledButton = styled.button`
  width: 310px;
  height: 52px;
  left: 40px;
  top: 581px;
  background: #FF4791;
  border-radius: 8px;
  color: white;
  ::placeholder {
    color: white;
  }
`;

const Horizontal = styled.div`
  display: flex;
  input {
      width: 145px;
      height: 52px;
      background: #FFFFFF;
      border-radius: 8px;
      margin-right: 4px;
    }
`
const Preco = styled.div`

`

const PopUp = styled.div`
background: rgba(0, 0, 0, 0.7);
position: absolute;
z-index: 2;
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const ContainerPopUp = styled.div`
width: 248px;
height: 210px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
padding: 24px;

background: #FFFFFF;
border-radius: 12px;
    p {
      font-family: 'Roboto';
      font-weight: 700;
      font-size: 18px;  
      text-align: center;
      color: #000000;
    }
`
const Botoes = styled.div`
  display: flex;

  button:nth-child(2) {
    background-color: #FF4791;
    width: 95px;
    height: 52px;
    border-radius: 8px;
    border: none;
  }
  button:nth-child(1) {
    background-color: #CECECE;
    width: 95px;
    height: 52px;
    border-radius: 8px;
    border: none;
  }
`;
