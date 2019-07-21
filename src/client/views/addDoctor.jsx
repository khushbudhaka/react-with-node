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
class addDoctor extends Component {
	constructor() {
    	super();
	    this.handleSubmit = this.handleSubmit.bind(this);
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
    fetch('https://f878e2d2.ngrok.io/api/doctors/', {
        method: 'POST',
        headers: new Headers({
         'Content-Type': 'application/json'
        }), 
  	    body: JSON.stringify(formdata),
	    }).then(function (res) {
	    	console.log(res)
    	});
	  }

	render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Doctor Profile"
                content={
                  <form onSubmit={this.handleSubmit}>
                  <label className="control-label">Doctor name</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="name"/>
                   <label className="control-label">Email</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="email"/>
                    <label className="control-label">Speciality</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="speciality"/>
                    <label className="control-label">Contat Number</label>
                   <input type="text" className="form-control" onChange={this.handleChange} name="contactNumber"/>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Save
                    </Button>
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

export default addDoctor;