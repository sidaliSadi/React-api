import './App.css';
import { useState } from "react"
import NavbarApp from "./components/NavbarApp"
import { Container, Row, Col, InputGroup, FormControl, Button, Image } from "react-bootstrap"

export default function App() {

  const [idMedecine, setIdMedecine] = useState(1)
  const [medecine, setMedecine] = useState({})

  function getDatas() {
    let url = `http://localhost:3010/medicine/${idMedecine}`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si le medo existe
      if (datas.length > 0){
        setMedecine(datas[0])
      }else{
        setMedecine(datas)
      }
      
    })

  }

  return (
    <div className="App">
      <NavbarApp />

      <Container >
        <Row className="mt-5">
          <Col md="6">
            <h1>Exemple d'appel API </h1>
            <hr />

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Saisir un ID de medicament "
                value={idMedecine}
                onChange={(e) => { setIdMedecine(e.target.value) }}
              />
              <InputGroup.Text>Je ne sais pas quoi mettre pour le moment </InputGroup.Text>
            </InputGroup>

            <Button variant="info" onClick={getDatas}>Cliquez moi</Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {
        
              <div>
                { 'error' in medecine && 
                
                  <h4>
                    {medecine.error }
                  </h4>
          
                }
                <div>
                  {
                    'id_med' in medecine &&

                    <h4>
                      {medecine.id_med}
                      <br/>
                      {medecine.cat}
                    </h4>
                  }
                </div>
                </div>
                
                
          }
        </Row>
      </Container>
    </div>
  );
}


