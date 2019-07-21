import React, { Component } from "react";
import { Grid, Row, Col, Table, FormGroup,
  ControlLabel,
  FormControl, Alert } from "react-bootstrap";

import Card from "../components/Card/Card.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import { NavLink, BrowserRouter, Route, Link } from 'react-router-dom';
import Icons from "../views/Icons.jsx";


class Doctors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			response: {},
			doctorsList : []
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

		fetch('https://f878e2d2.ngrok.io/api/doctors/', options)
	    .then(response =>  response.json())
	    .then(resData => {
	       console.log(JSON.stringify(resData))
	       //do your logic here
	       this.setState({ doctorsList: resData.data }); //this is an asynchronous function
	    });

	}

	deleteDoctor(doctorId) {
		const { doctorsList } = this.state;

	    const apiUrl = 'https://f878e2d2.ngrok.io/api/doctors/'+doctorId;
	    const formData = new FormData();
	    formData.append('doctorId', doctorId);

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
	            doctorsList: doctorsList.filter(doctor => doctor.doctorId !== doctorId)
	          });
	        },
	        (error) => {
	          this.setState({ error });
	        }
	      )
    	var index = this.state.doctorsList.indexOf(doctorId);
	    this.state.doctorsList.splice(index, 1);
	    this.setState(this.state.doctorsList);
	}

  	render() {
		return (
			<div className="content">
	        <Grid fluid>
	        {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
	          <Row>
	            <Col md={12}>
	            <NavLink to="addDoctor">  Add Doctor </NavLink>
	            <BrowserRouter>
        
        <Route path="addDoctor" component={Icons}/>
        
      </BrowserRouter>
                <div className="clearfix" />
	              <Card
	                title="Doctors"
	                ctTableFullWidth
	                ctTableResponsive
	                content={
	                  <Table striped hover>
	                    <thead>
	                      <tr>
	                        <th>Name</th>
	                        <th>Contact Number</th>
	                        <th>Email</th>
	                        <th>Speciality</th>
	                        <th>Action</th>
	                      </tr>
	                    </thead>
	                    <tbody>
	                    {this.state.doctorsList.map((doctor, key) => (
	                    	<tr key={key}>
		                    	<td>{doctor.name}</td>
		                    	<td>{doctor.contactNumber}</td>
		                    	<td>{doctor.email}</td>
		                    	<td>{doctor.speciality}</td>
		                    	<td>
		                    	<Link to={{
  pathname: `editDoctor/${doctor.doctorId}`
  
}} className="btn btn-default" variant="info">Edit</Link>
                    			&nbsp;<Button variant="danger" onClick={() => this.deleteDoctor(doctor.doctorId)}>Delete</Button>
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

export default Doctors;