
import './App.css';
import { useState } from 'react';
import { Button, Col, Container, Carousel, Row, InputGroup, Form, FormControl, Image } from 'react-bootstrap';
import axios from 'axios';
function App() {

  const [idMedecine, setIdMedecine] = useState(1)
  const [medecine, setMedecine] = useState({})
  const [medecines, setMedecines] = useState([])
  const [formMedicament, setFormMedicament] = useState({});

  const [formCategorie, setFormCategorie] = useState({});
  const [idCategorie, setIdCategorie] = useState(1)
  const [categorie, setCategorie] = useState({})
  const [categories, setCategories] = useState([])

  function getDatas() {
    let url = `http://localhost:3010/medicine/${idMedecine}`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si le medo existe
      if (datas.length > 0) {
        setMedecine(datas[0])
      } else {
        setMedecine(datas)
      }

    })

  }

  function getAllMed() {
    let url = `http://localhost:3010/medicine`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si le medo existe
      if (datas.length > 0) {
        setMedecines(datas)
      }

    })

  }

  function getAllCategories() {
    let url = `http://localhost:3010/category`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Renvoyer toutes les categories
      setCategories(datas)

    })

  }

  function getCategorie() {
    let url = `http://localhost:3010/category/${idCategorie}`

    fetch(url).then(function (res) {
      return res.json()
    }).then(function (datas) {
      //Si la categorie existe
      if (datas.length > 0) {
        setCategorie(datas[0])
      } else {
        setCategorie(datas)
      }

    })

  }



  function displayMedecines() {
    return medecines.map(m => {

      return (
        <Carousel.Item>
          <h4>{m.id_med}</h4>
          <h4>{m.cat}</h4>
        </Carousel.Item>
      );
    });
  }

  function displayCategories() {
    return categories.map(c => {

      return (
        <Carousel.Item>
          <h4>{c.id_cat}</h4>
          <h4>{c.nom}</h4>
        </Carousel.Item>
      );
    });
  }

  


  function addCategorie(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/category/';
    const { id_cat, nom } = { ...formCategorie }
    console.log(formCategorie);
    axios.post(url, {

      id_cat,
      nom,
    });
  }

  function addMedicament(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/medicine';
    const { id_med, cat } = { ...formMedicament }
    console.log(formMedicament);
    axios.post(url, {
      id_med,
      cat,
    });
  }



  return (
    <div className="App">

      <Container>
        <Row className='m-auto'>
          <Col className='mt-auto'>
            <h1>
              Afficher un/plusierus medicaments
            </h1>
            <hr />
            <InputGroup className="md-3">
              <FormControl
                placeholder="ID medicament..."
                onChange={(e) => { setIdMedecine(e.target.value) }}
              />
            </InputGroup>
            <Button className='m-5' variant='info' onClick={getDatas}>Afficher un medicament</Button>
            <Button variant="secondary" onClick={getAllMed} >Afficher tout les medicaments </Button>


          </Col>
          <Col className='mt-auto'>
            <h1>
              Afficher une/plusierus categories
            </h1>
            <hr />
            <InputGroup className="md-3">
              <FormControl
                placeholder="ID categorie..."
                onChange={(e) => { setIdCategorie(e.target.value) }}
              />
            </InputGroup>
            <Button className='m-5' variant='info' onClick={getCategorie}>Afficher une categorie </Button>
            <Button variant="secondary" onClick={getAllCategories} >Afficher toutes les categories </Button>
          </Col>
        </Row>


      </Container>
      <Container>
        <Row className='m-auto'>
          <Col className='mt-auto'>
            {

              <div>
                {'error' in medecine &&

                  <h4>
                    {medecine.error}
                  </h4>

                }
                <div>
                  {
                    'id_med' in medecine &&

                    <h4>
                      {medecine.id_med}
                      <br />
                      {medecine.cat}
                    </h4>
                  }
                </div>
              </div>


            }
          </Col>
          <Col className='mt-auto'>
            {

              <div>
                {'error' in categorie &&

                  <h4>
                    {categorie.error}
                  </h4>

                }
                <div>
                  {
                    'id_cat' in categorie &&

                    <h4>
                      {categorie.id_cat}
                      <br />
                      {categorie.nom}
                    </h4>
                  }
                </div>
              </div>


            }
          </Col>
        </Row>
      </Container>

      <Container className='mt-md-3 border border-primary rounded-3'>
        <Row>

          <Col>
            <Carousel className='mt-auto'>
              {displayMedecines()}
            </Carousel>
          </Col>

          <Col>
            <Carousel className='mt-auto'>
              {displayCategories()}
            </Carousel>
          </Col>
        </Row>
      </Container>

      <Container className='mt-md-3 border border-primary rounded-3'>
        <Row>
          <Col>
            <Form onSubmit={(e) => addMedicament(e)}>

              <Form.Group className="mb-3" >
                <Form.Label>ID Medicament</Form.Label>
                <Form.Control
                  value={formCategorie.id_med}
                  type="id" placeholder="Id Medicament..."
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.id_med = e.target.value;
                      setFormMedicament(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> Categorie du medicament</Form.Label>
                <Form.Control
                  value={formMedicament.cat}
                  type="cat"
                  placeholder="Categorie medicament..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formMedicament }
                      tmp.cat = e.target.value;
                      setFormMedicament(tmp)
                    }}
                />
              </Form.Group>

              <Button variant='info' type='submit'>Enregistrer</Button>
            </Form>
          </Col>
          <Col>
            <Form onSubmit={(e) => addCategorie(e)}>

              <Form.Group className="mb-3" >
                <Form.Label>ID categorie</Form.Label>
                <Form.Control
                  //value={...formAjout}
                  value={formCategorie.id_cat}
                  type="id" placeholder="Id categorie..."
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie }
                      tmp.id_cat = e.target.value;
                      setFormCategorie(tmp)

                    }}
                  required />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label> Nom categorie</Form.Label>
                <Form.Control
                  value={formCategorie.nom}
                  type="nom"
                  placeholder="Nom Categorie..."
                  required
                  onChange={
                    (e) => {
                      let tmp = { ...formCategorie }
                      tmp.nom = e.target.value;
                      setFormCategorie(tmp)
                    }}
                />
              </Form.Group>

              <Button variant='info' type='submit'>Enregistrer</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default App;