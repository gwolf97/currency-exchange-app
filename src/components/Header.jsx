import React from 'react'
import {Navbar, Container } from "react-bootstrap"

const Header = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
    <Container className="d-flex">
      <Navbar.Brand href="#home">
        <h1
          width="30"
          height="30"
          className="d-inline-block align-top mx-3"
        >X-<span>CHANGE</span></h1>
      </Navbar.Brand>
    </Container>
  </Navbar>
  </>
  )
}

export default Header