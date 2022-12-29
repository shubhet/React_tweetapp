import React, { useState, useEffect } from "react";

import { Navbar, Container, Col } from "react-bootstrap";

const Footer = () => {
 return (
    <Navbar fixed="bottom" bg="dark" variant="white" text="white">
      <Container>
        <Col lg={12} className="text-center text-muted">
          <div style={{ color: 'white', font:'bold' ,height:"30px",paddingTop:"2px",fontSize:"19px"}}>
            TweetApp @Copyright 2022 Reserved
          </div>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
