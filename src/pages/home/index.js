import React from "react";
import { Jumbotron, Row, Col, Image } from "react-bootstrap";
import Layout from "../../components/layouts/baseLayout";

import HomeStyles from "./style.module.scss";

import MeImg from "../../media/images/grb.jpg";

class Home extends Layout {
  renderContent() {
    return (
      <Jumbotron className="content">
        <Row className={HomeStyles.row}>
          <Col sm className={HomeStyles.imageContent}>
            <Image src={MeImg} fluid className={HomeStyles.avatar} />
          </Col>
          <Col sm className={HomeStyles.textContent}></Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default Home;
