import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./services/db.mjs";
import { Meter } from "./components/Meter/Meter.js";
import { Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Charter } from "./components/Charter/Charter.js";
import "./styles.css";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const showInfo = () => {
  if (document.getElementById('project-info').style.display === 'none') {
    document.getElementById('project-info').style.display = 'block';
  } else {
    document.getElementById('project-info').style.display = 'none';
  }
}


export default function App() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [kwh, setkwh] = useState([0,0]);

  useEffect(() => {
    var kwh1 = 0;
    var kwh2 = 0;
    const snapshotRef = ref(database, '/');
    onValue(snapshotRef, (snapshot) => {
      const value = snapshot.val();
      
      var objKeys = Object.keys(value.sensorReadings);
      var len = objKeys.length;
      
      var values = value.sensorReadings

      var data = Object.values(values)

      for (var i = 0; i < len; i++) {
        kwh1 += data[i].kwh1 * 1
        kwh2 += data[i].kwh2 * 1
      }

      setData1([(data[len-1].voltage*1), (data[len-1].current1 * 1000), (data[len-1].power1*1), (data[len-1].kwh1 *1000)])

      setData2([(data[len-1].voltage*1), (data[len-1].current2 * 1000), (data[len-1].power2*1), (data[len-1].kwh2 *1000)])

      kwh1 = Math.round((kwh1 / len) * 100000)/100;
      kwh2 = Math.round((kwh2 / len) * 100000)/100;
      setkwh([kwh1, kwh2]);
    });
  }, [])

  return (
    <>
      <Container fluid style={{ backgroundColor: "#009E60" }}>
        <Row style={{ padding: "2vh" }}>
          <h1 style={{ color: '#D6F8D6' }}>Smart Energy Meter <FontAwesomeIcon icon={faBolt} /></h1>
          <div className="det-button">
            <br />
            <h5 onClick={showInfo} style={{ color: "white", cursor: "pointer", fontSize: '1.5em' }}>Read More...</h5>
            <p id="project-info" style={{ display: 'none', color: '#fefefe', fontWeight: "200"}}>A project by GROUP ALPHA, 400 level students of the Department of Computer Engineering for 1st Semester of 2022/23 Academic Session. <br /> Members: YUSUF Judith Unoiza (18/30GR060), ABU Abraham Omokhagbo (19/30GR002) & ADEJUMOBI Kehinde Habeeb (19/30GR005)
            <br />
            The function of this app is to compute the energy consumption of a maximum of two appliances, taking measurements of the <b>instantaneous voltage, instantaneous currents, instantaneous powers</b> and <b>average power ratings</b> over  a period of time.</p>
          </div>
        </Row>
      </Container>
      <Container fluid>
        <Row className="justify-content-center" style={{ marginBottom: "1vh" }}>
          <Col sm={8} md={6} className="justify-content-center" style={{ padding: "10%", paddingTop: "5%", paddingBottom: "6%" }}>
            <Row className="justify-content-center">
              <Col className="justify-content-center">
                <div className="view-app" style={{ width: "100%", textAlign: "center", marginBottom: "1vh" }} >
                  <h4>Appliance 1</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={10} className="meter-container justify-content-center">
                {kwh && <Meter kwh={kwh[0]} />}
              </Col>
              <Col lg={12} className="justify-content-center">
                <h4 style={{ color: "#008000" }}>Readings</h4>
                <div className="chart-container justify-content-center">
                  {data1 && <Charter parameters = {data1} />}
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={8} md={6} className="justify-content-center" style={{ padding: "10%", paddingTop: "5%", paddingBottom: "6%" }}>
            <Row className="justify-content-center">
              <Col className="justify-content-center">
                <div className="view-app" style={{ width: "100%", textAlign: "center", marginBottom: "1vh" }}>
                  <h4>Appliance 2</h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={10} className="meter-container justify-content-center">
                {kwh && <Meter kwh={kwh[1]} />}
              </Col>
              <Col lg={12} className="justify-content-center">
                <h4 style={{ color: "#008000" }}>Readings</h4>
                <div className="chart-container ustify-content-center">
                  <Charter parameters={data2} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>


        <Row className="justify-content-center" style={{ textAlign: "center", fontWeight: "bold", position: "relative", bottom: "0" }}>
          <Col className="justify-content-center">
            <p>Built by Group ALPHA, 2024</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}