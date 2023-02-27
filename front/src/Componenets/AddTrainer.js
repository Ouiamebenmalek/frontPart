import { Component } from "react";
import Alert from 'react-bootstrap/Alert';

export default class AddTrainer extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

     }
  
    state = {
        trainers: [],
        loading: true,
        error: false,
        name:"",
        gender:"M"
      }
        handleSubmit = async (e) => {
        e.preventDefault();
        console.log("okokok")


           
          fetch("https://backendpokemon-production.up.railway.app/trainers", 
          {  
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'*',
                mode: 'no-cors', 
 
            },
            body: JSON.stringify({
             name: this.state.name, 
             gender: this.state.gender})
          }    

          )
            .then(response => {
                if (response.ok) {
                this.setState({gender:"",name:""}, () => {
                    console.log(this.state);
                    return response.json();
                  });
                  
                 } else {
                    throw new Error('Something went wrong ...');
                 }
            })
             .catch(error => this.setState({ error } ,() => {
                console.log(error)
                 
              }));
    
      
      };




      async componentDidMount() {
        
    }
    
     handleChange(event) {
      
        var nm=event.target.name;
        var v=event.target.value;
        if(nm=="name"){
            this.setState({name:v}, () => {
                console.log(this.state);
              });
        }
       else if(nm=="gender"){
            this.setState({gender:v}, () => {
                console.log(this.state);
              });
        }
       

      }
      
      render () {
        const { trainers, loading, error } = this.state;
        return ( <>
        <Alert key="info" variant="info"> <h2>    Add Trainer      </h2></Alert>
        
        
        
        <div className="container my-5 d-flex justify-content-center">
            <div className="card px-1 py-4">
              <form className="card-body" onSubmit={this.handleSubmit}>
                <h6 className="card-title mb-3">{" "}</h6>
                <div className="d-flex flex-row">
                 
                  <label className="radio mr-1">
                    <input onChange={this.handleChange} type="radio" name="gender" value="F" checked={this.state.gender == "F"} /> <span> <i className="fa fa-user"></i> F </span> </label>
                  <label className="radio">
                    <input onChange={this.handleChange} type="radio" name="gender" value="M" checked={this.state.gender == "M"} /> <span> <i className="fa fa-plus-circle"></i> M </span> </label> </div>
            
            
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input name="name" onChange={this.handleChange} className="form-control" type="text" placeholder="Name" defaultValue={this.state.name} /> </div>
                  </div>
                </div>


                <div className=" d-flex flex-column text-center px-5 mt-3 mb-3">
                  <small className="agree-text">{" "}</small>
                  <a href="#" className="terms">{" "}</a> </div> <button className="btn btn-info btn-block confirm-button">Add</button>
              </form>
            </div>
          </div></>

        );
      }
}
 