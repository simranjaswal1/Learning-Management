import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './CustomNavbar.css';

function CustomNavbar() {
  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/games', label: 'Games' },
    { path: '/story/stories', label: 'Stories' },
    { path: '/riddle', label: 'Riddles' },
    { path: '/result', label: 'Marks' },
  ];

  return (
    <Navbar expand="lg" className="navbar-custom" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand className="navbar-brand" as={NavLink} to="/home">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/office/40/books.png"
            alt="books"
            className="me-2"
          />
          Kids Learning
        </Navbar.Brand>

        {/* ✅ Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' active-link' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
