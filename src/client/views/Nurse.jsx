import React, { Component } from "react";
import { Grid, Row, Col, Table, FormGroup,
  ControlLabel,
  FormControl, Alert } from "react-bootstrap";

import Card from "../components/Card/Card.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import { NavLink, BrowserRouter, Route, Link } from 'react-router-dom';
import Icons from "../views/Icons.jsx";


class Nurse extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			response: {},
			nurseList : []
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

		fetch('https://4e05b6be.ngrok.io/api/nurse/', options)
	    .then(response =>  response.json())
	    .then(resData => {
	       console.log(JSON.stringify(resData))
	       //do your logic here
	       this.setState({ nurseList: resData.data }); //this is an asynchronous function
	    });

	}

	deleteNurse(nurseId) {
		const { nurseList } = this.state;

	    const apiUrl = 'https://4e05b6be.ngrok.io/api/nurse/'+nurseId;
	    const formData = new FormData();
	    formData.append('nurseId', nurseId);

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
	            nurseList: nurseList.filter(nurse => nurse.nurseId !== nurseId)
	          });
	        },
	        (error) => {
	          this.setState({ error });
	        }
	      )
    	var index = this.state.nurseList.indexOf(nurseId);
	    this.state.nurseList.splice(index, 1);
	    this.setState(this.state.nurseList);
	}

  	render() {
		return (
			<div className="content">
	        <Grid fluid>
	        {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
	          <Row>
	            <Col md={12}>
	            <NavLink to="addNurse">  Add Nurse </NavLink>
                <div className="clearfix" />
	              <Card
	                title="Nurse"
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
	                    {this.state.nurseList.map((nurse, key) => (
	                    	<tr key={key}>
		                    	<td>{nurse.name}</td>
		                    	<td>{nurse.contactNumber}</td>
		                    	<td>{nurse.email}</td>
		                    	<td>{nurse.speciality}</td>
		                    	<td>
		                    	<Link to={{pathname: `editnurse/${nurse.nurseId}`}} className="btn btn-default" variant="info">Edit</Link>
                    			&nbsp;<Button variant="danger" onClick={() => this.deleteNurse(nurse.nurseId)}>Delete</Button>
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

export default Nurse;