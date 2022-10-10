function HeadNavBar() {

  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">ProtoPolio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#wanted">Wanted</Nav.Link>
          <Nav.Link href="#comunity">Comunity</Nav.Link>
        </Nav>

        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
          <NavDropdown title="" src="public\logo192.png" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default HeadNavBar;
