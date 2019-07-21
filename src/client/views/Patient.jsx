import React, { Component } from "react";
import { Grid, Row, Col, Table, FormGroup,
  ControlLabel,
  FormControl, Alert } from "react-bootstrap";

import Card from "../components/Card/Card.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import { NavLink, BrowserRouter, Route, Link } from 'react-router-dom';
import Icons from "../views/Icons.jsx";


class Patient extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			response: {},
			patientList : []
		}
	}

	componentDidMount() {
		const options = { 
		  method: 'GET',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  }
		}    

		fetch('https://4e05b6be.ngrok.io/api/patients/', options)
	    .then(response =>  response.json())
	    .then(resData => {
	       //do your logic here
	       this.setState({ patientList: resData.data }); //this is an asynchronous function
	    });

	}

	deletepatient(patientId) {
		const { patientList } = this.state;

	    const apiUrl = 'https://4e05b6be.ngrok.io/api/patient/'+patientId;
	    const formData = new FormData();
	    formData.append('patientId', patientId);

	    const options = {
	      method: 'DELETE',
	      headers: new Headers({
	         'Content-Type': 'application/json'
	      })
	    }

	    fetch(apiUrl, options)
	      .then(res => res.json())
	      .then(
	        (result) => {
	        	
	          this.setState({
	            response: result,
	            patientList: patientList.filter(patient => patient.patientId !== patientId)
	          });
	        },
	        (error) => {
	          this.setState({ error });
	        }
	      )
    	var index = this.state.patientList.indexOf(patientId);
	    this.state.patientList.splice(index, 1);
	    this.setState(this.state.patientList);
	}

  	render() {
		return (
			<div className="content">
	        <Grid fluid>
	        {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
	          <Row>
	            <Col md={12}>
	            <NavLink to="addpatient">  Add patient </NavLink>
                <div className="clearfix" />
	              <Card
	                title="patient"
	                ctTableFullWidth
	                ctTableResponsive
	                content={
	                  <Table striped hover>
	                    <thead>
	                      <tr>
	                        <th>Name</th>
	                        <th>Contact Number</th>
	                        <th>Email</th>
	                        <th>Doctor</th>
	                        <th>Nurse</th>
	                        <th>Emergency Person</th>
	                        <th>Emergency Number</th>
	                        <th>SMS</th>
	                        <th>Push Notification</th>
	                        <th>Action</th>
	                      </tr>
	                    </thead>
	                    <tbody>
	                    {this.state.patientList.map((patient, key) => (
	                    	<tr key={key}>
		                    	<td>{patient.name}</td>
		                    	<td>{patient.contactNumber}</td>
		                    	<td>{patient.email}</td>
		                    	<td>{patient.doctorname}</td>
		                    	<td>{patient.nursename}</td>
		                    	<td>{patient.contactname}</td>
		                    	<td>{patient.emergencyContact}</td>
		                    	<td><input type="checkbox" defaultChecked={this.state.checked} id="checkbox1"/>
		                    	<label for="checkbox1"></label></td>
		                    	<td><input type="checkbox" defaultChecked={this.state.checked} id="checkbox2"/>
		                    	<label for="checkbox2"></label></td>
		                    	<td>
		                    	<Link to={{pathname: `editpatient/${patient.patientId}`}} className="btn btn-default" variant="info">Edit</Link>
                    			&nbsp;<Button variant="danger" onClick={() => this.deletepatient(patient.patientId)}>Delete</Button>
		                    	</td>
	                    	</tr>
					    ))}
	                    </tbody>
	                  </Table>
	                }
	              />
	            </Col>
	          </Row>
	        </Grid>
      </div>
    	);
	};
}

export default Patient;