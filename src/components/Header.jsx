import React from 'react'
import {Navbar, Container } from "react-bootstrap"

const Header = () => {
  return (
    <>
    <Navbar bsPrefix="navbar" expand="lg">
    <Container className="d-flex">
      <Navbar.Brand className="d-flex" href="#home">
        <img style={{height:"35px", width:"35px", border:"1px solid white"}} src="./images/logo.png" alt="" />
        <h1 style={{margin:"0px 0 0 10px", fontFamily:"Lato, sans-serif"}}>X-CHANGE</h1>
      </Navbar.Brand>
    </Container>
  </Navbar>
  </>
  )
}

export default Header