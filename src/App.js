import logo from './logo.svg';
import './App.css';
// import Navbarapp from '../src/components/Navbar';
// import NavbarApp from "./components/NavbarApp";
import { useState } from 'react';
import { Button, Col, Container, NavbarApp, Row, InputGroup, Form, FormControl, Image } from 'react-bootstrap';
import axios from 'axios';
function App() {
  const [url, setUrl] = useState("bienvue dans le use State");
  const [nbpics, setNbPics] = useState(1);
  const [pics, setPics] = useState([]);
  const [nbProducts, setNbProducts] = useState(1);
  const [products, setProducts] = useState();
  const [nbUsers, setNbUsers] = useState(1);
  const [users, setUsers] = useState();
  const [formCategorie, setFormCategorie] = useState({});

  const [idMedecine, setIdMedecine] = useState(1)
  const [medecine, setMedecine] = useState({})

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



  function displayPics() {
    return pics.map(pic => {
      //console.log(pic);
      return (
        <Col xs={6} md={4} className="m-3">
          <Image src={pic.download_url} width="200 " rounded />
        </Col>
      );
    });
  }
  function displayProducts() {
    return (
      [products && (<Col className="m-6">
        <h2>{products.product.product_name}</h2>
        <h2>{products.code}</h2>
        <Image src={products.product.image_url} width="200 " rounded />
      </Col>)]
    );
  }
  function displayUsers() {
    let id_user;
    if (!isNaN(parseInt(nbUsers))) {
      id_user = parseInt(nbUsers) - 1;
      return ([users && (id_user < users.length) && (
        <Col className="m-4">
          <h2>{users[id_user].id}</h2>
          <h2>{users[id_user].username}</h2>
          <h2>{users[id_user].email}</h2>
          <h2>{users[id_user].website}</h2>
          <br></br>
          <h2>{users[id_user].address.suite}</h2>
          <h2>{users[id_user].address.street}</h2>
          <h2>{users[id_user].address.city}</h2>
          <br></br>
          <h2>{users[id_user].company.name}</h2>
        </Col>
      )]);
    }
    return (<Col className="m-4"></Col>);
  }
  function getData() {
    //let url = `https://picsum.photos/v2/list?limit=${nbpics}`
    //let food_url = `https://world.openfoodfacts.org/api/v0/product/3229820791074.json`;
    let url_api_node = 'http://localhost:3011';
    fetch(url_api_node).then(function (res) {
      return res.json();
    }).then(function (datas) {
      // setPics(datas);
      console.log(datas);
      // setProducts(datas);
      setUsers(datas);
      console.log(datas);
    });
  }
  // function addUser(event) {
  //   event.preventDefault();
  //   let url = 'http://localhost:3011/users/create';
  //   const { nom, prenom, age } = { ...formAjout }
  //   const headers = {
  //     "Content-type": "application/json",
  //     "x-apikey": "qksodpfiqs!!@qlsdjf",
  //   }
  //   console.log(formAjout);
  //   axios.post(url, {
  //     nom,
  //     prenom,
  //     age,
  //   }, { headers });
  // }


  function addCategorie(event) {
    event.preventDefault();
    let url = 'http://localhost:3010/category/';
    const { id, nom } = { ...formCategorie }
    console.log(formCategorie);
    axios.post(url, {

      id,
      nom,
    });
  }



  return (
    <div className="App">

      <Container>
        <Row className='m-auto'>
          <Col className='mt-auto'>
            <h1>
              API
            </h1>
            <hr />
            <InputGroup className="md-3">
              <FormControl
                placeholder="saisir du texte"
                // onChange={(e) => { setNbProducts(e.target.value) }}
                // onChange={(e) => { setNbUsers(e.target.value) }}
                onChange={(e) => { setIdMedecine(e.target.value) }}
              />
              <InputGroup.Text>{nbUsers}</InputGroup.Text>
            </InputGroup>
            <Button className='m-5' variant='info' onClick={getDatas}>clique ici</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
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
        </Row>
      </Container>
      <Container className='border border-primary rounded-3'>
        <Row>
          <Col className='m-4'>
            <h2>id : </h2>
            <h2>username: </h2>
            <h2>email :</h2>
            <h2>website :</h2>
            <h2>Adress :</h2>
            <h2>suite :</h2>
            <h2>street :</h2>
            <h2>city : </h2>
            <h2>company name :</h2>
          </Col>
          {displayUsers()}
        </Row>
      </Container>
      <Container className='mt-md-3 border border-primary rounded-3'>
        <Form onSubmit={(e) => addCategorie(e)}>

          <Form.Group className="mb-3" >
            <Form.Label>ID categorie</Form.Label>
            <Form.Control
              //value={...formAjout}
              value={formCategorie.id}
              type="id" placeholder="Id categorie..."
              onChange={
                (e) => {
                  let tmp = { ...formCategorie }
                  tmp.id = e.target.value;
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
      </Container>
    </div>
  );
}
export default App;