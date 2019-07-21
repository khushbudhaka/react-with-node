import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.jsx";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bottleStatus1: 80,
      bottleStatus2: 20,
      bottleStatus3: 40,
    }
  }

  componentDidMount() {
    // console.log('did');
    //  setInterval(() => {
    //   // animation is visible the first time
    //   var bottleStatus1 = parseInt(this.state.bottleStatus1 + 5);
    //   var bottleStatus2 = parseInt(this.state.bottleStatus2 + 5);
    //   var bottleStatus3 = parseInt(this.state.bottleStatus3 + 5);
    //   this.setState({ bottleStatus1: bottleStatus1, bottleStatus2: bottleStatus2, bottleStatus3: bottleStatus3});
    //   console.log(this.state.bottleStatus1);
    //   console.log(this.state.bottleStatus2);
    //   console.log(this.state.bottleStatus3);
    // }, 1000);
  }
  componentWillMount() {
    console.log('did');
     setInterval(() => {
      // animation is visible the first time
      if(this.state.bottleStatus1 > 0) {
        var bottleStatus1 = parseInt(this.state.bottleStatus1 - 5);
        this.setState({ bottleStatus1: bottleStatus1});
        console.log(this.state.bottleStatus1)
        if(this.state.bottleStatus1 == 50) {
          fetch('http://4e05b6be.ngrok.io/api/patients/sendNotification/1/25', {
              method: 'POST',
              headers: new Headers({
               'Content-Type': 'application/json'
              })
            }).then(function (res) {
              console.log(res)
            });
        }
      }
      if(this.state.bottleStatus2 > 0) {
        var bottleStatus2 = parseInt(this.state.bottleStatus2 - 5);
        this.setState({ bottleStatus2: bottleStatus2});
      }
      if(this.state.bottleStatus3 > 0) {
        var bottleStatus3 = parseInt(this.state.bottleStatus3 - 5);
        this.setState({ bottleStatus3: bottleStatus3});
      }
    }, 5000);
   
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    
    return (
      <div className="content">
        <Grid fluid>
          <h3>Live Drip Level</h3>
          <Row>
            <Col lg={4} sm={6} md={4}>
              <h3>Bed no 1</h3>{this.state.bottleStatus1}%
              <div className="meter animate">
                <span style={{ width: `${this.state.bottleStatus1}%`, backgroundColor: 'black' }}></span>
              </div>
            </Col>
            <Col lg={4} sm={6} md={4}>
              <h3>Bed no 2</h3>{this.state.bottleStatus2}%
              <div className="meter animate">
                <span style={{ width: `${this.state.bottleStatus2}%`, backgroundColor: 'black' }}></span>
              </div>
            </Col>
            <Col lg={4} sm={6} md={4}>
              <h3>Bed no 3</h3>{this.state.bottleStatus3}%
              <div className="meter animate">
                <span style={{ width: `${this.state.bottleStatus3}%`, backgroundColor: 'black' }}></span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
