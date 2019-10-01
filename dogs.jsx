

class SingleBreed{
    constructor(breed,image) {
        this.breed = breed;
        this.image = image; 
     }
 }
  
class BreedCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            image: ""
        }
        this.changeImage = this.changeImage.bind(this)
    }
    insertRandomBreedImage() {
        let url = "https://dog.ceo/api/breed/"+ this.props.allBreeds.breed +"/images/random"  
        axios.get(url).then(res => {
           this.setState({image:res.data.message})
        })  
    }
    componentDidMount (){
        this.insertRandomBreedImage(); // insert random image to state by breed gets from parent
     }
     changeImage(){
        this.insertRandomBreedImage();
     }
     render() {
      var Link = ReactBootstrap.Link 
      var NavLink = ReactRouterDOM.NavLink 
      var CardColumns = ReactBootstrap.CardColumns 
      var Card = ReactBootstrap.Card
      //his.loadImage();
      //console.log(this.state.image)
      
      
      var path = "/breed/" + this.props.allBreeds.breed.replace("/","-")
      
      console.log(path)
      return (    
       
           <Card className="text-center border">
            <Card.Body >
            {/* <Card.Title><a href="#/breed/:id">{this.props.allBreeds.breed}</a></Card.Title> */}
             <Card.Title><NavLink to={path}>{this.props.allBreeds.breed}</NavLink></Card.Title>
              <Card.Text>
            
              <img src={this.state.image} style={{ width: '100%' }}></img>
            </Card.Text>
            <Card.Text>
              <button class="btn btn-light" onClick={this.changeImage}>Change image</button>
            </Card.Text>
          </Card.Body> 
          </Card> 
      
                              
          );}
     }
 
 class SingleBreedGallery extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                images: []
            }
           // this.changeImage = this.changeImage.bind(this)
        }
        componentDidMount (){
            this.insertImagesToArray(); // insert random image to state by breed gets from parent
         }
         insertImagesToArray() {
            let url = "https://dog.ceo/api/breed/"+ this.props.match.params.breed.replace("-","/") +"/images"  
            axios.get(url).then(res => {
                //this.state.images.push(res.data.message)
                this.state.images = res.data.message
                this.setState(this.state)
                    
            })  
           // console.log(this.state.images)  
        }
         render() {
            var Container = ReactBootstrap.Container;
            var Row = ReactBootstrap.Row 
            var Col = ReactBootstrap.Col 
            var NavLink = ReactRouterDOM.NavLink 
            var Navbar = ReactBootstrap.Navbar;
            var Nav = ReactBootstrap.Nav;
            var CardColumns = ReactBootstrap.CardColumns;
            var Card = ReactBootstrap.Card;
         
         // console.log(this.props)
        console.log(this.state.images)  
          var viewAllImages = this.state.images.map( item => {
          return(
           <Card className="text-center border">
           <Card.Body >
          
            {/* <Card.Title>{this.props.match.params.breed}</Card.Title> */}
             <Card.Text>
           
             <img src={item} style={{ width: '100%' }}></img>
           </Card.Text>
           {/* <Card.Text>
             <button class="btn btn-light" onClick={this.changeImage}>Change image</button>
           </Card.Text> */}
         </Card.Body> 
          </Card> )
         })
        
        return (    

            //  <span> test - {this.props.match.params.breed}</span>
           
             <Container className="">
                
             <Navbar bg="light rounded">
             <Navbar.Collapse id="basic-navbar-nav ">
                   <Nav class="nav justify-content-center ">
                     <NavLink class="nav-link nav-orange"  to="/">Home</NavLink>
                     <NavLink class="nav-link nav-orange" to="/gallery">All Breeds</NavLink>
                     {/* <NavLink class="nav-link nav-orange active" to="/movies">Movies</NavLink> */}
                    </Nav>
                     </Navbar.Collapse>
               </Navbar>
              
                 <Row>
                     <Col >
                      <h3 className="movieTitle text-center">Gallery of {this.props.match.params.breed}:</h3>
                     </Col>
                 </Row>
                 <Row >
                 
                   <Col sm="11" md ="10" xl="12" className=" mx-auto">
                     <CardColumns> 
                     {viewAllImages}
                     </CardColumns> 
                  </Col>
               </Row>    
            </Container>
                                  
              );}
      }
    
class DogGallery extends React.Component {
    constructor(){
        super();
        this.state = {
            allBreeds: [],
            input: "",
       }
     this.getFilterText = this.getFilterText.bind(this);
 }
   
   componentDidMount(){
        this.createAllBreedsArray();
    }

   createAllBreedsArray(){
    let url = "https://dog.ceo/api/breeds/list/all"
    axios.get(url).then(res => {
    
    var breedsList = Object.keys(res.data.message);
    var subBreedsList = Object.values(res.data.message);
    var allBreeds = []  // array with all breeds and sub-breeds
   // var index = 0 // index for allBreeds array
   
    for (let i=0; i< breedsList.length;i++){ // 88
        if(subBreedsList[i].length>0){
            for(let j=0;j<subBreedsList[i].length;j++){  //insert subBreeds  
                let x = breedsList[i] + "/" + subBreedsList[i][j];
                let newBreed = new SingleBreed (x)
                this.state.allBreeds.push(newBreed)
                
                }
        } 
        else {
            let x = breedsList[i];  // insert Breeds
            let newBreed = new SingleBreed (x)
            this.state.allBreeds.push(newBreed)
        }
      
    }
    //console.log(allBreeds)
    //this.setState({allBreeds:allBreeds})
    this.setState(this.state)
    // for(let i=0;i<this.state.allBreeds.length;i++){ // insert image of every breed to allBreeds array
    //             let url = "https://dog.ceo/api/breed/"+ this.state.allBreeds[i].breed +"/images/random"  
    //             axios.get(url).then(res => {
    //                this.state.allBreeds[i].image = res.data.message
    //                this.setState(this.state)
    //             }) 
    //      }
    console.log(this.state.allBreeds)
    }) 
   };
    getFilterText (event){
          this.setState({input:event.target.value});
    }

 
    
     render() {
       var Container = ReactBootstrap.Container;
       var InputGroup = ReactBootstrap.InputGroup;
       var FormControl = ReactBootstrap.FormControl;
       var Row = ReactBootstrap.Row 
       var Col = ReactBootstrap.Col 
       var Form = ReactBootstrap.Form 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;
       var CardColumns = ReactBootstrap.CardColumns;
       var Card = ReactBootstrap.Card;
    
       let filter = this.state.input
       let viewAllBreeds = []
      console.log(this.state.input)
       for (let i=0;i<this.state.allBreeds.length;i++)
     //  for (let i=0;i<5;i++)
       {
         if (this.state.allBreeds[i].breed.includes(filter) ){ // fullname and filter to lowCase to find all names 
              let viewAllBreed = 
                      <BreedCard allBreeds = {this.state.allBreeds[i]} />
                     
                   // console.log(this.state.allBreeds[i])
                    viewAllBreeds.push(viewAllBreed);
              }        
       }
     //  console.log(viewAllBreeds)
       return (    
                 
                 <Container className="">
                
                  <Navbar bg="light rounded">
                  <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav class="nav justify-content-center ">
                          <NavLink class="nav-link nav-orange"  to="/">Home</NavLink>
                          <NavLink class="nav-link nav-orange" to="/gallery">All Breeds</NavLink>
                          {/* <NavLink class="nav-link nav-orange active" to="/movies">Movies</NavLink> */}
                         </Nav>
                          </Navbar.Collapse>
                    </Navbar>
                   
                      <Row>
                          <Col >
                           <h3 className="movieTitle text-center">Gallery of all breeds:</h3>
                          </Col>
                      </Row>
                      <Row>
                        <Col sm="11" md ="10" xl="12" className=" mx-auto">
                                <InputGroup size="sm" className="mb-3">
                                   <InputGroup.Prepend>
                                          <InputGroup.Text id="inputGroup-sizing-sm">Filter by:</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl onChange={this.getFilterText} aria-label="Small" placeholder="breed name"/>
                                </InputGroup>
                       </Col>
                    </Row>   
                    <Row >
                      
                        <Col sm="11" md ="10" xl="12" className=" mx-auto">
                          <CardColumns> 
                          {viewAllBreeds}
                          </CardColumns> 
                       </Col>
                    </Row>    
                 </Container>
                 
                 );
             }
}   
//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//                           --   Home page   ---
//--------------------------------------------------------------------------------------------------------P
class Home extends React.Component {
    constructor(props){
        super(props);
    }
     render() {
       var Container = ReactBootstrap.Container;
       var Button = ReactBootstrap.Button 
       var Switch = ReactRouterDOM.Switch 
       var Route = ReactRouterDOM.Route 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;
       var Jumbotron = ReactBootstrap.Jumbotron;
       return (    
                 
                 <Container >
                  
                  {/* <Navbar bg="dark rounded">
                  <Navbar.Collapse id="basic-navbar-nav ">
                        <Nav class="nav justify-content-center ">
                          <NavLink class="nav-link nav-orange active"  to="/">Home</NavLink>
                          <NavLink class="nav-link nav-orange" to="/actors">Actors</NavLink>
                          <NavLink class="nav-link nav-orange " to="/movies">Movies</NavLink>
                         </Nav>
                          </Navbar.Collapse>
                    </Navbar> */}
                    <Jumbotron>
                      <h1>Dog Book</h1>
                      <p>
                        Man's best friend
                      </p>
                      <p>
                      <NavLink class="nav-link nav-orange d-inline" to="/gallery"><Button variant="secondary ">Enter</Button></NavLink>
                      {/* <NavLink class="nav-link nav-orange d-inline" to="/movies"> <Button variant="secondary ">Movies</Button></NavLink> 
                        */}
                      </p>
                    </Jumbotron>
  
                 </Container>
                 
                 );
             }
     }
     
    


//888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
//                           --   APP   ---
//--------------------------------------------------------------------------------------------------------P

class App extends React.Component {
    constructor(){
        super();
    }
     render() {
       var Container = ReactBootstrap.Container;
       var Col = ReactBootstrap.Col 
       var Switch = ReactRouterDOM.Switch 
       var Route = ReactRouterDOM.Route 
       var NavLink = ReactRouterDOM.NavLink 
       var Navbar = ReactBootstrap.Navbar;
       var Nav = ReactBootstrap.Nav;
      
       return (    
                
                 <Container className="bg-light">
                  
                     
                    <Switch>
                      <Route exact path="/" class="nav-link nav-orange" component={Home}/> 
                      <Route exact path="/gallery/" class="nav-link nav-orange" component={DogGallery}/> 
                      <Route exact path="/breed/:breed" class="nav-link nav-orange" component={SingleBreedGallery}/>
                    </Switch>
  
                 </Container>
                 
                 );
             }
     }
     
    


    ReactDOM.render( 
        <ReactRouterDOM.HashRouter>
            <App />
          </ReactRouterDOM.HashRouter>,
         document.getElementById("root")
        );