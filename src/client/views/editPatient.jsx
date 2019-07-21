import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import avatar from "../assets/img/faces/face-3.jpg";
class editPatient extends Component {
	constructor(props) {
    	super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        name: '',
        contactNumber: '',
        email:'',
        nurseId : ''
      }
	  }
   componentDidMount() {
      const nurseId = this.props.match.params.nurseId;
      const apiUrl = 'https://4e05b6be.ngrok.io/api/nurse/'+ nurseId;
      const formData = new FormData();
      formData.append('nurseId', nurseId);
      const options = {
        method: 'GET',
        headers: new Headers({
           'Content-Type': 'application/json'
        })
      }

      fetch(apiUrl, options)
        .then(res => res.json())
        .then(
          (result) => {
               this.setState({ 
                name: result.data[0].name, 
                email: result.data[0].email, 
                contactNumber: result.data[0].contactNumber,
                speciality: result.data[0].speciality,
                nurseId: result.data[0].nurseId,
                 });
          },
          (error) => {
            this.setState({ error });
          }
        )
   }
	handleChange = (event) => {
		const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
    	this.setState({
	      [name]: value
	    });
  	}

	handleSubmit = (event) => {
		
    event.preventDefault();
    const data = new FormData(event.target);
    const formdata = this.state;
    fetch('https://4e05b6be.ngrok.io/api/nurse/'+this.state.nurseId, {
        method: 'PATCH',
        headers: new Headers({
         'Content-Type': 'application/json'
        }), 
  	    body: JSON.stringify(formdata),
	    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if(responseData.status == true){
          alert('Data updated sucessfully');
        }
        return responseData;
      })
	  }

	render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Nurse Profile"
                content={
                  <form onSubmit={this.handleSubmit}>
                  <label className="control-label">Nurse name</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="name" value={this.state.name}/>
                   <label className="control-label">Email</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="email" value={this.state.email}/>
                    <label className="control-label">Contat Number</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="contactNumber" value={this.state.contactNumber}/>
                    <div className="mt-2">
                      <Button bsStyle="info" pullRight fill type="submit">
                      Save
                      </Button>
                    </div>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default editPatient;